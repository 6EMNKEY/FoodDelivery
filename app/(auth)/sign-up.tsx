import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [Form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
  });

  const handleSubmit = async () => {
    const { email, password, confirmPassword, fullname } = Form;
    console.log(Form);
    if (!email || !password || !confirmPassword || !fullname) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setisSubmitting(true);
    // Simulate an API call
    try {
      //CALL apwright sign in API
      await createUser({
        email,
        password,
        fullname,
      });

      router.replace("/");
    } catch (error: any) {
      console.log("Error during sign up:", error);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <View className="w-full p-2">
      <CustomInput
        placeholder="Enter your name"
        value={Form.fullname}
        onChangeText={(text: string) => {
          setForm({ ...Form, fullname: text });
        }}
        label="Name"
        secureTextEntry={false}
        keyboardType="default"
      />
      <CustomInput
        placeholder="Enter your email"
        value={Form.email}
        onChangeText={(text: string) => {
          setForm({ ...Form, email: text });
        }}
        label="Email"
        secureTextEntry={false}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Password"
        value={Form.password}
        onChangeText={(text: string) => {
          setForm({ ...Form, password: text });
        }}
        label="Password"
        secureTextEntry={true}
        keyboardType="default"
      />
      <CustomInput
        placeholder="confirmPassword"
        value={Form.confirmPassword}
        onChangeText={(text: string) => {
          setForm({ ...Form, confirmPassword: text });
        }}
        label="Password"
        secureTextEntry={true}
        keyboardType="default"
      />
      <CustomButton
        title="Sign Up"
        style={{}}
        textStyle={{}}
        leftIcon={false}
        isLoading={isSubmitting}
        onPress={handleSubmit}
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
