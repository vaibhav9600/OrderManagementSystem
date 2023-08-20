import { NavigationContainer } from "@react-navigation/native";
import React from "react"; // Don't forget to import React
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductScreen from "./screens/ProductScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TextInput, TouchableOpacity, View, Image, Text } from "react-native"; // You don't need to import FontAwesome5 here
import CartHeader from "./components/CartHeader";
import { useSelector } from "react-redux";
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
import { useRef, useEffect } from "react";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [oldData, setOldData] = useState([]);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const products = useSelector((state) => state.products.products);


  useEffect(() => {
    // Initialize data with locally available products
    setData(products);
    setOldData(products);
  }, []);

  const searchFilterFunction = text => {
    setSearch(text);

    if (text !== '') {
      const filteredData = oldData.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(oldData);
    }
  };

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
            // headerShown:false,
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
        // options={{ presentation: "modal" }}
        />
        <Stack.Screen name="Shopping Cart" component={ShoppingCart} />
        <Stack.Screen name="Filter Page" component={FilterPage} />
        <Stack.Screen name="Cement Page" component={CementPage}
          options={({ navigation }) => ({
            // headerRight: () => (
            //   <TouchableOpacity
            //     onPress={() => navigation.navigate("Shopping Cart")}
            //     style={{ flexDirection: "row" }}
            //   >
            //     <CartHeader itemCount={numberOfItems} />
            //   </TouchableOpacity>
            // ),
            // headerTitle: "Hek", // Remove the title "Products"
            // headerShown: true,
            // headerLeft: () => (

            // ),
            header: () => {
              return (
                <View style={{ padding: 20, borderBottomColor: "#D3D3D3", borderBottomWidth: 1 }}>
                  {/* First row */}
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

                  {/* Second row */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, borderWidth: 1, borderColor: 'gray', borderRadius: 6, padding: 5 }}>
                    <Ionicons name="search" size={18} color="gray" style={{ marginLeft: 10 }} />
                    <TextInput
                      style={{ flex: 1, marginLeft: 5, fontSize: 16 }}
                      placeholder="Search..."
                    />
                    <TouchableOpacity onPress={() => console.log("Close button pressed")} style={{ marginRight: 10 }}>
                      <FontAwesome name="close" size={18} color="gray" />
                    </TouchableOpacity>
                  </View>
                </View>
                // </View>
              );
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default Navigation;
