import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import { AntDesign } from "@expo/vector-icons";

const CartListItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    dispatch(
      cartSlice.actions.changeQuantity({
        productId: cartItem.product.id,
        amount: 1,
      })
    );
  };

  const decreaseQuantity = () => {
    dispatch(
      cartSlice.actions.changeQuantity({
        productId: cartItem.product.id,
        amount: -1,
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: cartItem.product.image }} style={styles.image} />

        <View style={styles.contentContainer}>
          <Text style={styles.name}>{cartItem.product.name}</Text>
          {/* <Text style={styles.size}>Size {cartItem.size}</Text> */}
          <Text style={styles.size}> ₹ {cartItem.product.price}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={decreaseQuantity}
          style={{ padding: 10, backgroundColor: "#FEF2EE", borderRadius: 4 }}
        >
          <AntDesign name="minus" size={24} color="#F15927" />
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 4 }}>
          <View
            style={{ padding: 12, borderWidth: 1, borderColor: "gainsboro", borderRadius:5 }}
          >
            <Text style={styles.quantity}>{cartItem.quantity}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={increaseQuantity}
          style={{ padding: 10, backgroundColor: "#FEF2EE", borderRadius: 4 }}
        >
          <AntDesign name="plus" size={24} color="#F15927" />
        </TouchableOpacity>
        <Text style={styles.itemTotal}>
          ₹ {cartItem.product.price * cartItem.quantity}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "white",
    // flexDirection: "c",
    marginBottom: 24,
  },
  contentContainer: {
    marginLeft: 10,
  },
  image: {
    width: 60,
    padding: 8,
    aspectRatio: 1,
    backgroundColor:"#F6F6F6",
    borderRadius:2,
  },
  name: {
    fontWeight: "500",
    fontSize: 18,
  },
  size: {
    fontSize: 16,
    color: "gray",
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "gray",
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
  },
  itemTotal: {
    fontSize: 16,
    marginLeft: "auto",
    fontWeight: "500",
  },
});

export default CartListItem;
