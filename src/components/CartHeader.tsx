import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";

const CartHeader = ({ itemCount }) => {
   const navigation=useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 15,
      }}
    >
      {/* <TouchableOpacity onPress={() => `navigation`.navigate("Shopping Cart")}> */}
        <Image
          source={require("../../assets/shopping-cart.png")}
          style={{ width: 20, height: 20 }}
        />
      {/* </TouchableOpacity> */}
      <View
        style={{
          position: "absolute",
          right: 0,
        }}
      >
        <Text style={{ color: "black", fontSize: 10 }}>({itemCount})</Text>
      </View>
    </View>
  );
};

export default CartHeader;
