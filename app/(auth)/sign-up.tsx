import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [Form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleSubmit = () => {
    if (!Form.email || !Form.password || !Form.confirmPassword || !Form.name) {
      alert("Please fill in all fields");
      return;
    }
    if (Form.password !== Form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setisSubmitting(true);
    // Simulate an API call
    try {
      //CALL apwright sign in API
      alert("Sign in successful!");
      router.replace("/");
    } catch (error) {
      console.error("Error signing in:", error);
      alert("An error occurred while signing in. Please try again.");
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <View className="w-full p-2">
      <CustomInput
        placeholder="Enter your name"
        value={Form.name}
        onChangeText={(text) => {
          setForm({ ...Form, name: text });
        }}
        label="Name"
        secureTextEntry={false}
        keyboardType="default"
      />
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
      <CustomInput
        placeholder="confirmPassword"
        value={Form.confirmPassword}
        onChangeText={(text) => {
          setForm({ ...Form, confirmPassword: text });
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
        onPress={() => handleSubmit()}
      />
      <View className="flex justify-center flex-row gap-2">
        <Text className="base-regular text-gray-100 pr-1">
          Already have an account?{" "}
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign in
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
