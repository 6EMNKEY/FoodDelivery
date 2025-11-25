import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";
const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query || "");

  const debounceSearch = useDebouncedCallback(
    (text: string) => (router.setParams({ query: text }), 500)
  );

  const handleChangeText = (text: string) => {
    setQuery(text);
    debounceSearch(text); // You can also update the search params here if needed
  };
  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5"
        placeholder="search"
        value={query}
        onChangeText={handleChangeText}
        placeholderTextColor="#A0A0A0"
      />
      <TouchableOpacity
        className="pr-5"
        onPress={() => console.log("Search for:", query)}
      >
        <Image
          source={images.search}
          className="size-6"
          resizeMode="contain"
          tintColor="#5D5F6D"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
