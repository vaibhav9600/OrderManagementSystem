import { Text, FlatList, View, StyleSheet, Pressable } from "react-native";
// import cart from "../data/cart";
import CartListItem from "../components/CartListItem";
import { useSelector } from "react-redux";
import { selectDeliveryPrice, selectSubtotals, selectTotalPrice } from "../store/cartSlice";

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubtotals);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const totalPrice = useSelector(selectTotalPrice);
  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal </Text>
        <Text style={styles.text}>Rs.{subtotal}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery </Text>
        <Text style={styles.text}>Rs. {deliveryFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>total </Text>
        <Text style={styles.textBold}>Rs. {totalPrice}</Text>
      </View>
    </View>
  );
}

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Checkout</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#F15927",
    width: "80%", // Adjust the width as needed
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 15,
    borderRadius: 5,
    bottom: 30,
    position: "absolute",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
export default ShoppingCart;
