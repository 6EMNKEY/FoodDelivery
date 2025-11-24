declare interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  secureTextEntry: boolean;
  keyboardType: "default" | "email-address" | "numeric" | "phone-pad";
}

declare interface CustomButtonProps {
  onPress: () => void;
  title: string;
  style: object;
  textStyle: object;
  leftIcon: React.ReactNode;
  isLoading: boolean;
}

declare interface CreateUserParams {
  email: string;
  password: string;
  fullname: string;
}

declare interface SignInParams {
  email: string;
  password: string;
}
export interface User extends Models.Document {
  name: string;
  email: string;
  avatar: string;
}

declare interface TabBarIconProps {
  focused: boolean;
  icon?: ImageSourcePropType;
  title?: string;
}
