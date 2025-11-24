import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { RegisterUser } from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
export default function SignIn() {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [Form, setForm] = useState({ email: "", password: "" });
  const { email, password } = Form;

  const handleSubmit = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please fill in all fields");
    }

    setisSubmitting(true);
    // Simulate an API call
    try {
      //CALL apwright sign in API
      await RegisterUser({ email, password });
      router.replace("/");
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while signing in. Please try again."
      );
      Sentry.captureException(error);
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <View className="g-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={Form.email}
        onChangeText={(text) => {
          setForm({ ...Form, email: text });
        }}
        label="Email"
        secureTextEntry={false}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Password"
        value={Form.password}
        onChangeText={(text) => {
          setForm({ ...Form, password: text });
        }}
        label="Password"
        secureTextEntry={true}
        keyboardType="default"
      />
      <CustomButton
        title="Sign In"
        style={{}}
        textStyle={{}}
        leftIcon={false}
        isLoading={isSubmitting}
        onPress={handleSubmit}
      />
      <View className="flex justify-center flex-row gap-2">
        <Text className="base-regular text-gray-100 pr-1">
          Don&apos;t have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign up
        </Link>
      </View>
    </View>
  );
}
