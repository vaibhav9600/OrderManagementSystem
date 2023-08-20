import React from "react";
import { View, Text, Image } from "react-native";

const CartHeader = ({ itemCount }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 15,
      }}
    >
      <Image
        source={require("../../assets/shopping-cart.png")}
        style={{ width: 20, height: 20 }}
      />
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
