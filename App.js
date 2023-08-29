import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import products from "./src/data/products";

export default function App() {
  const productWithId1 = products.find(product => product.id === "1");

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.wrapper}>
        <Navigation />
        <StatusBar style="auto" />
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
