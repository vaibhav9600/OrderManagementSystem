import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import FilterPage from "./src/screens/FilterPage";
import AddressSelection from "./src/screens/CheckoutSection";
import ProductInfoComponent from "./src/components/productDetailsSub";
import ProductInfo from "./src/data/ProductInfo.json";
import products from "./src/data/products";

export default function App() {
  const productWithId1 = products.find(product => product.id === "1");

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.wrapper}>
      {/* <View style={styles.container}> */}
      <Navigation />
      {/* <AddressSelection/> */}
      {/* <ProductInfoComponent productData={productWithId1} /> */}
      <StatusBar style="auto" />
      {/* </View> */}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
