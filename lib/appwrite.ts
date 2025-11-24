import { CreateUserParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: "com.6emnkey.fastfood",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseid: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform!);

export const account = new Account(client);
export const database = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({
  email,
  password,
  fullname,
}: CreateUserParams) => {
  console.log("Creating user with:", { email, password, fullname });
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      fullname
    );
    console.log("Account created:", newAccount);

    if (!newAccount) {
      throw new Error("Failed to create account");
    }

    const avatarUrl = avatars.getInitialsURL(fullname);
    await RegisterUser({ email, password });

    return await database.createDocument(
      appwriteConfig.databaseid!,
      appwriteConfig.userCollectionId!,
      ID.unique(),
      {
        fullname,
        email,
        accountId: newAccount.$id,
        avatar: avatarUrl,
      }
    );
  } catch (error) {
    throw new Error(error as string);
  }
};

export const RegisterUser = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAcount = await account.get();
    if (!currentAcount) {
      throw new Error("No user logged in");
    }
    const currentUser = await database.listDocuments(
      appwriteConfig.databaseid!,
      appwriteConfig.userCollectionId!,
      [Query.equal("accountId", currentAcount.$id)]
    );

    if (currentUser.total === 0) {
      throw new Error("User profile not found");
    }
    console.log("Current user profile:", currentUser.documents[0]);
    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error as string);
  }
};
