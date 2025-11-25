import { Category } from "@/type";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity, View } from "react-native";

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category || "");

  const handlePress = (id: string) => {
    setActive(id);
    if (id === "all") router.setParams({ category: "" });
    else router.setParams({ category: id });
    // Update the search params or perform filtering logic here
  };

  const filterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];
  return (
    <View>
      <FlatList
        data={filterData}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.$id}
            className={cn(
              "filter",
              active === item.$id ? "bg-amber-500" : "bg-white"
            )}
            style={
              Platform.OS === "android"
                ? { elevation: 5, shadowColor: "#878787" }
                : {}
            }
            onPress={() => handlePress(item.$id)}
          >
            <Text
              className={cn(
                "body-medium",
                active === item.$id ? "text-white" : "text-gray-200"
              )}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-x-2 pb-3"
      ></FlatList>
    </View>
  );
};

export default Filter;
