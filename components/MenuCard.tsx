import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import React from "react";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

const MenuCard = ({
  item: { $id, image_url, name, price },
}: {
  item: CartItemType;
}) => {
  const imageUrl = `${image_url}`;
  const { addItem } = useCartStore();

  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={{ uri: imageUrl }}
        className="size-32 absolute -top-10 "
        resizeMode="contain"
      />
      <Text
        className="mb-2 text-center text-base-bold text-dark-100"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text className="mb-4 text-center text-sm-semibold text-gray-500">
        ${price.toFixed(2)}
      </Text>
      <TouchableOpacity
        onPress={() =>
          addItem({
            id: $id,
            name,
            price,
            image_url: imageUrl,
            customizations: [],
          })
        }
        className="menu-card-button"
      >
        <Text className=" paragraph-bold text-primary text-center ">
          Add to cart +
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
