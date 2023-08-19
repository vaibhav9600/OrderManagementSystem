import {
  StyleSheet,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import products from "../data/products";
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign icon
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";

const ProductDetailsScreen = () => {
  const product = useSelector((state) => state.products.selectedProduct);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const addToCart = () => {
    // console.log("add to cart pressed");`
    dispatch(cartSlice.actions.addCartItem({ product: product }));
  };
  const [isWishlistPressed, setIsWishlistPressed] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const toggleWishlist = () => {
    setIsWishlistPressed(!isWishlistPressed);
    setShowStatus(true);

    setTimeout(() => {
      setShowStatus(false);
    }, 2000); // Display status for 2 seconds
  };

  return (
    <SafeAreaView>
      <View>
        <ScrollView>
          {/* Image Carousel */}
          <FlatList
            data={product.images}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          />

          {/* <TouchableOpacity style={styles.button} onPress={addToCart}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity> */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={addToCart} style={styles.button}>
              <Text style={styles.buttonText}>Add To Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.wishlistButton,
                isWishlistPressed && styles.wishlistButtonPressed,
              ]}
              onPress={toggleWishlist}
            >
              {/* <FontAwesome5 name="heart" size={30} color="black" /> */}
              <AntDesign
                name={isWishlistPressed ? "heart" : "hearto"}
                size={24}
                color={isWishlistPressed ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>
          {/* Title */}
          <View style={{ padding: 20 }}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Price */}

          {/* Description */}
        </ScrollView>
        {/* Add to cart button */}

        {/* Navigation icon */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center", // Align vertically in the center
    marginTop: 20, // Add margin at the top
  },
  button: {
    backgroundColor: "#F15927",
    width: "80%", // Adjust the width as needed
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  wishlistButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "transparent",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  wishlistButtonPressed: {
    backgroundColor: "transparent",
  },
  wishlistStatus: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ProductDetailsScreen;
