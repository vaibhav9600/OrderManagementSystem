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
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import ProductInfoComponent from "../components/productDetailsSub";
import BelowAddToCart from "../components/productDetailsBelowAddToCart";
import HorizontalProductList from "../components/HorizontalProductList";
import products from "../data/products";
import { MaterialIcons } from '@expo/vector-icons';

const ProductDetailsScreen = () => {
  const product = useSelector((state) => state.products.selectedProduct);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mainImageCarouselRef = useRef(null);

  const handlePrevImage = () => {
    const newIndex = currentImageIndex === 0 ? product.images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    mainImageCarouselRef.current.scrollToIndex({ index: newIndex });
  };

  const handleNextImage = () => {
    const newIndex = currentImageIndex === product.images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    mainImageCarouselRef.current.scrollToIndex({ index: newIndex });
  };


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
            ref={mainImageCarouselRef}
            data={product.images}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={(event) => {
              const offsetX = event.nativeEvent.contentOffset.x;
              const newIndex = Math.round(offsetX / width);
              setCurrentImageIndex(newIndex);
            }}
          />
          {/* Secondary Image Carousel */}
          <View style={styles.secondaryCarouselContainer}>
            <TouchableOpacity onPress={handlePrevImage} style={styles.arrowButton}>
              <MaterialIcons name="arrow-back-ios" size={30} color="#F15927" />
            </TouchableOpacity>
            <View>
              <FlatList
                data={[
                  product.images[currentImageIndex],
                  product.images[(currentImageIndex + 1) % product.images.length],
                ]}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() =>
                      setCurrentImageIndex((currentImageIndex + index) % product.images.length)
                    }
                    style={styles.secondaryImageContainer}
                  >
                    <Image source={{ uri: item }} style={styles.secondaryImage} />
                  </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.secondaryCarousel}
              />
            </View>
            <TouchableOpacity onPress={handleNextImage} style={styles.arrowButton}>
              <MaterialIcons name="arrow-forward-ios" size={30} color="#F15927" />
            </TouchableOpacity>
          </View>

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
          <BelowAddToCart productData={product} />
          <View style={{ paddingHorizontal: 16 }}>
            <View style={styles.row}>
              <Text style={styles.parameter}>Package Dimensions:</Text>
              <Text style={styles.value}>55x15 cms</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.parameter}>Weight:</Text>
              <Text style={styles.value}>50 kgs</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.parameter}>Date First Available:</Text>
              <Text style={styles.value}>18 June 2001</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.parameter}>Country of Origin:</Text>
              <Text style={styles.value}>India</Text>
            </View>
          </View>

          {/* Price */}
          <View style={{ paddingTop: 60 }}>
            <HorizontalProductList data={products} title={"Related Products"} />
          </View>

          <View style={{ paddingTop: 60 }}>
            <HorizontalProductList data={products} title={"Customers also viewed"} />
          </View>

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
    borderColor: "#F15927",
    borderWidth: 1,
    textAlign: "center",
    lineHeight: 36,
    fontSize: 18,
    height: 36,
    width: 40,
    borderRadius: 4,
    // marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  parameter: {
    fontWeight: 'bold',
    width: 180,
    fontSize: 12,
    fontWeight: "400",
    color: "#686868",
  },
  value: {
    fontSize: 12,
    fontWeight: "600",
  },
  secondaryCarouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  secondaryCarousel: {
    alignItems: "center",
  },
  secondaryImageContainer: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  secondaryImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#F6F6F6",
    padding: 12,
  },
  arrowButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    padding: 23,
    borderRadius: 8,
  },
});

export default ProductDetailsScreen;
