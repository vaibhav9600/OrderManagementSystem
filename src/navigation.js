import { NavigationContainer } from "@react-navigation/native";
import React from "react"; // Don't forget to import React
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductScreen from "./screens/ProductScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TextInput, TouchableOpacity, View, Image, Text } from "react-native"; // You don't need to import FontAwesome5 here
import CartHeader from "./components/CartHeader";
import { useDispatch, useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";
import FilterPage from "./screens/FilterPage";
import CementPage from "./screens/CementPage";
import ListProductTypes from "./components/ListProductTypes";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; // Make sure you have FontAwesome icons installed
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import { productSlice } from "./store/productSlice";
import { useRef, useEffect } from "react-redux";
import { useNavigationState } from "@react-navigation/native";
import ShippingAddress from "./screens/CheckoutSection";
import BillingAddress from "./screens/BillingAddress";
import PaymentPage from "./screens/PaymentPage";
import FinalPage from "./screens/FinalPage";
import { resetAddress } from "./store/addressSlice";
import { resetCart } from "./store/cartSlice";
import { resetInvoice } from "./store/invoiceSlice";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

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
          contentStyle: { backgroundColor: "white" },//all screens white
        }}>
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={({ navigation }) => ({
            headerTitle: "", // Remove the title "Products"
            header: () => {
              return (
                <View style={{ padding: 10, borderBottomColor: "white", borderBottomWidth: 0, }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        // marginLeft: -10
                      }}>
                        <Text style={{ color: "#3D3E3C", fontSize: 20, fontWeight: "bold" }}>
                          INFRA.
                        </Text>
                        <Text style={{ color: "#DF542E", fontSize: 20, fontWeight: "bold", marginLeft: 0 }}>
                          MARKET
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Shopping Cart")}
                      style={{ flexDirection: "row" }}
                    >
                      <CartHeader itemCount={numberOfItems} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => {
              return (
                <View style={{ paddingVertical: 8, paddingRight: 16, borderBottomColor: "#e6e6e6", borderBottomWidth: 1, }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        // marginLeft: -10
                      }}>
                        <TouchableOpacity
                          onPress={() => navigation.goBack()} // Add this line for custom back button behavior
                          style={{ padding: 12 }}
                        >
                          <Ionicons name="arrow-back" size={20} color="black" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Shopping Cart")}
                      style={{ flexDirection: "row" }}
                    >
                      <CartHeader itemCount={numberOfItems} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          })}
        // options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="Shopping Cart"
          component={ShoppingCart}
          options={({ navigation }) => ({
            headerTitle: "",
            header: () => {
              return (
                <View style={{ paddingVertical: 8, paddingRight: 16, borderBottomColor: "#e6e6e6", borderBottomWidth: 1, }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}>
                        <TouchableOpacity
                          onPress={() => navigation.goBack()} // Add this line for custom back button behavior
                          style={{ padding: 12 }}
                        >
                          <Ionicons name="arrow-back" size={20} color="black" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 17, fontWeight: "500", lineHeight: 20 }}>Your Cart</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }
          })}

        />
        <Stack.Screen name="Filter Page"
          component={FilterPage}
          options={({ navigation }) => ({
            headerTitle: "", // Remove the title "Products"
            headerShown: "false",
            header: () => {
              return (
                <></>
              );
            }
          })}
        />
        <Stack.Screen
          name="Cement Page"
          component={CementPage}
          options={({ navigation }) => ({
            header: () => {
              return (
                <View style={{ padding: 10, borderBottomColor: "white", borderBottomWidth: 0, }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() => navigation.goBack()} // Add this line for custom back button behavior
                        style={{ paddingHorizontal: - 10 }}
                      >
                        <Ionicons name="arrow-back" size={24} color="black" />
                      </TouchableOpacity>
                      <View style={{ flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontSize: 17, fontWeight: 500 }}>Cement</Text>
                        <Text style={{ fontSize: 12, fontWeight: 400, marginLeft: 0 }}>
                          45 Items
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Shopping Cart")}
                      style={{ flexDirection: "row" }}
                    >
                      <CartHeader itemCount={numberOfItems} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            },
          })}
        />
        <Stack.Screen
          name="Checkout Screen"
          component={ShippingAddress}
          options={({ navigation }) => ({
            header: () => {
              return (
                <View style={{ paddingVertical: 8, paddingRight: 16, paddingLeft: 4, borderBottomColor: "#e6e6e6", borderBottomWidth: 1, }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() => navigation.goBack()} // Add this line for custom back button behavior
                        style={{ paddingHorizontal: 10 }}
                      >
                        <Ionicons name="arrow-back" size={24} color="black" />
                      </TouchableOpacity>
                      <Text style={{ fontSize: 17, fontWeight: "500", lineHeight: 20 }}>Checkout</Text>
                    </View>
                  </View>
                </View>
              );
            },
          })}
        />
        <Stack.Screen
          name="Billing Screen"
          component={BillingAddress}
          options={({ navigation }) => ({
            header: () => {
              return (
                <View style={{ paddingVertical: 8, paddingRight: 16, paddingLeft: 4, borderBottomColor: "#e6e6e6", borderBottomWidth: 1, }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() => navigation.goBack()} // Add this line for custom back button behavior
                        style={{ paddingHorizontal: 10 }}
                      >
                        <Ionicons name="arrow-back" size={24} color="black" />
                      </TouchableOpacity>
                      <Text style={{ fontSize: 17, fontWeight: "500", lineHeight: 20 }}>Checkout</Text>
                    </View>
                  </View>
                </View>
              );
            },
          })}
        />
        <Stack.Screen
          name="Payment Screen"
          component={PaymentPage}
          options={({ navigation }) => ({
            header: () => {
              return (
                <View style={{ paddingVertical: 8, paddingRight: 16, paddingLeft: 4, borderBottomColor: "#e6e6e6", borderBottomWidth: 1, }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() => navigation.goBack()} // Add this line for custom back button behavior
                        style={{ paddingHorizontal: 10 }}
                      >
                        <Ionicons name="arrow-back" size={24} color="black" />
                      </TouchableOpacity>
                      <Text style={{ fontSize: 17, fontWeight: "500", lineHeight: 20 }}>Checkout</Text>
                    </View>
                  </View>
                </View>
              );
            },
          })}
        />
        <Stack.Screen
          name="Final Screen"
          component={FinalPage}
          options={({ navigation }) => ({
            header: () => {
              return (
                <View style={{ paddingVertical: 8, paddingRight: 16, paddingLeft: 4, borderBottomColor: "#e6e6e6", borderBottomWidth: 1, }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(resetCart());
                          dispatch(resetAddress());
                          dispatch(resetInvoice());
                          navigation.navigate("Products");
                        }}// Add this line for custom back button behavior
                        style={{ paddingHorizontal: 10 }}
                      >
                        <Ionicons name="arrow-back" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default Navigation;
