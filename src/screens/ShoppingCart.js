import React from "react";
import { Text, FlatList, View, StyleSheet, Pressable, TouchableOpacity, SafeAreaView } from "react-native"; // Added SafeAreaView
import CartListItem from "../components/CartListItem";
import { useSelector } from "react-redux";
import { selectDeliveryPrice, selectSubtotals, selectTotalPrice } from "../store/cartSlice";

const DottedBox = ({ children }) => {
  return <View style={styles.dottedBox}>{children}</View>;
};

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubtotals);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const totalPrice = useSelector(selectTotalPrice);

  const shouldRenderCoupon = totalPrice !== 0; // Check if totalPrice is not zero
  const shouldRenderDiscount = subtotal > 1000; // Check if subtotal is greater than 1000

  return (
    <View style={styles.totalsContainer}>
      {shouldRenderCoupon && ( // Render the coupon component only when shouldRenderCoupon is true
        <DottedBox>
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.welcomeText}>WELCOME20</Text>
              <Text style={styles.couponText}>Coupon applied on the cart</Text>
            </View>
            <View style={styles.couponInfo}>
              <TouchableOpacity style={styles.removeButton}>
                <Text style={styles.buttonText}>REMOVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </DottedBox>
      )}
      <View style={{ paddingVertical: 15 }}>
        <View style={styles.row}>
          <Text style={styles.textBold}>Subtotal </Text>
          <Text style={styles.textBold}>₹ {subtotal}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Shipping </Text>
          <Text style={styles.text}>₹ {deliveryFee}</Text>
        </View>
        {shouldRenderDiscount && ( // Render discount only when shouldRenderDiscount is true
          <View style={[styles.row, { marginBottom: 10 }]}>
            <Text style={styles.text}>Coupon Discount </Text>
            <Text style={styles.text}>₹ 500</Text>
          </View>
        )}
        <View style={[styles.row, { borderTopWidth: 1, paddingTop: 8, borderColor: "gainsboro" },]}>
          <Text style={styles.textBold}>Total </Text>
          <Text style={styles.textBold}>₹ {totalPrice}</Text>
        </View>

      </View>
    </View>
  );
}

const ShoppingCart = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector(selectTotalPrice);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
        contentContainerStyle={{ paddingBottom: 60 }} // Adjust the value as needed
      />
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>₹ {totalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Checkout Screen")}>
          <Text style={styles.buttonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    borderColor: "gainsboro",
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
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "gainsboro",
  },
  button: {
    backgroundColor: "#F15927",
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 4,
    // paddingHorizontal:20,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 24
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalText: {
    fontSize: 17,
    fontWeight: "600",
    marginRight: 10,
    lineHeight: 33,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: "600",
    // marginRight: 10,
    lineHeight: 18,
  },
  couponInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  couponText: {
    fontSize: 12,
    color: "gray",
    // marginRight: 10,
    paddingVertical: 4,
    fontWeight: "400",
  },
  removeButton: {
    backgroundColor: "#F15927",
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  dottedBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "gray",
    paddingHorizontal: 16,
    borderRadius: 5,
  },
});

export default ShoppingCart;
