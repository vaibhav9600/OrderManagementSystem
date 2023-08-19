import { NavigationContainer } from "@react-navigation/native";
import React from "react"; // Don't forget to import React
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductScreen from "./screens/ProductScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Pressable, TouchableOpacity, View, Image, Text } from "react-native"; // You don't need to import FontAwesome5 here
import CartHeader from "./components/CartHeader";
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const numberOfItems = useSelector(selectNumberOfItems);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "white",
            borderWidth: 0, // Remove the border line under the header
            elevation: 0,
          },
        }}>
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Shopping Cart")}
                style={{ flexDirection: "row" }}
              >
                <CartHeader itemCount={numberOfItems} />
              </TouchableOpacity>
            ),
            headerTitle: "", // Remove the title "Products"
            headerLeft: () => (
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: -10
              }}>
                <Text style={{ color: "#3D3E3C", fontSize: 20, fontWeight: "bold" }}>
                  INFRA.
                </Text>
                <Text style={{ color: "#DF542E", fontSize: 20, fontWeight: "bold", marginLeft: 0 }}>
                  MARKET
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="Shopping Cart" component={ShoppingCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
