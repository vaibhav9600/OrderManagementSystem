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
import ProductInfoComponent from "../components/productDetailsSub";
import BelowAddToCart from "../components/productDetailsBelowAddToCart";

const ProductDetailsScreen = () => {
  const product = useSelector((state) => state.products.selectedProduct);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    // console.log("add to cart pressed");`
    dispatch(cartSlice.actions.addCartItem({ product: product, quantity: quantity }));
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
      <View style={{ backgroundColor: "white", }}>
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
          <ProductInfoComponent productData={product} />

          <View style={styles.quantityContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ textAlign: "left", paddingLeft: 16 }}>Quantity</Text>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityDisplay}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "flex-end", paddingRight: 16 }}>
                <Text>Total Value</Text>
                <Text>₹10000</Text>
              </View>
            </View>
          </View>

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
              <AntDesign
                name={isWishlistPressed ? "heart" : "hearto"}
                size={24}
                color={isWishlistPressed ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>
          <BelowAddToCart productData={product}/>
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 16,
  },
  quantityButton: {
    backgroundColor: "#FEF2EE",
    width: 36,
    height: 36,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#F15927",
    fontSize: 20,
    fontWeight: "500",
  },
  quantityDisplay: {
    borderColor:"#F15927",
    borderWidth:1,
    textAlign: "center",
    lineHeight: 36,
    fontSize: 18,
    height:36,
    width:40,
    borderRadius:4,
    // marginHorizontal: 20,
  },
});

export default ProductDetailsScreen;
