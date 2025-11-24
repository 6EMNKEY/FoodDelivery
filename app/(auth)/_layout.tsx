import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

const _Layout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated } = useAuthStore();
  console.log("isAuthenticated in auth layout:", isAuthenticated);

  if (isAuthenticated) {
    console.log("User is authenticated, redirecting to home.");
    return <Redirect href="/" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="bg-white h-full"
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="w-full relative"
          style={{ height: Dimensions.get("screen").height / 2.25 }}
        >
          <ImageBackground
            source={images.loginGraphic}
            className="size-full rounded-b-lg "
            resizeMode="stretch"
          />
          <Image
            source={images.logo}
            className="self-center size-48 absolute -bottom-16 z-10"
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default _Layout;
