import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import FilterPage from "./src/screens/FilterPage";

export default function App() {
  return (
    <Provider store={store}>
      {/* <SafeAreaView style={styles.wrapper}> */}
      {/* <View style={styles.container}> */}
      <Navigation />
      <StatusBar style="auto" />
      {/* </View> */}
      {/* </SafeAreaView> */}
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });
