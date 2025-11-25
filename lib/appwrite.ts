import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: "com.6emnkey.fastfood",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  categoriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID,
  menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID,
  customizationsCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID,
  menuCustomizationsCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform!);

export const account = new Account(client);
export const databases = new Databases(client);

export const storage = new Storage(client);
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

    return await databases.createDocument(
      appwriteConfig.databaseId!,
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
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId!,
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

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];
    if (category) {
      queries.push(Query.equal("categories", category));
    }
    if (query) {
      queries.push(Query.search("name", query));
    }

    const menu = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.menuCollectionId!,
      queries
    );
    console.log("Fetched menu items:", menu.documents);
    return menu.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.categoriesCollectionId!
    );
    console.log("Fetched categories:", categories.documents);
    return categories.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};
