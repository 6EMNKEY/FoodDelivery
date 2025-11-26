declare interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  secureTextEntry: boolean;
  keyboardType: "default" | "email-address" | "numeric" | "phone-pad";
}

declare interface CustomButtonProps {
  onPress?: () => void;
  title: string;
  style?: object;
  textStyle?: object;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
}

interface PaymentInfoStripeProps {
  label: string;
  value: string;
  labelStyle?: string;
  valueStyle?: string;
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

interface GetMenuParams {
  category: string;
  query: string;
}

export interface MenuItem extends Models.Document {
  name: string;
  price: number;
  image_url: string;
  description: string;
  calories: number;
  protein: number;
  rating: number;
  type: string;
}

export interface Category extends Models.Document {
  name: string;
  description: string;
}

export interface CartCustomization {
  id: string;
  name: string;
  price: number;
  type: string;
}

export interface CartItemType {
  id: string; // menu item id
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  customizations?: CartCustomization[];
}

export interface CartStore {
  items: CartItemType[];
  addItem: (item: Omit<CartItemType, "quantity">) => void;
  removeItem: (id: string, customizations: CartCustomization[]) => void;
  increaseQty: (id: string, customizations: CartCustomization[]) => void;
  decreaseQty: (id: string, customizations: CartCustomization[]) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}
