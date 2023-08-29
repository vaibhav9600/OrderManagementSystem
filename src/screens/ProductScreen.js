import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Modal,
  ScrollView
} from 'react-native';

import { useSelector, useDispatch } from "react-redux";
import { productSlice } from "../store/productSlice";
import { MaterialIcons } from '@expo/vector-icons'; // Import icons from Expo library
import ListProductTypes from '../components/ListProductTypes';
import { useState, useRef, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateProducts, setSelectedProducts } from "../store/productSlice";
import ShoppingCart from './ShoppingCart';


const serverURL = 'http://127.0.0.1:8080/api';
// const serverURL = 'http://192.168.1.8:8080/api';

// Fetching all products
const getProducts = async () => {
  try {
    const response = await fetch(`${serverURL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const ProductScreen = ({ navigation }) => {

  const {
    itemContainer,
    image,
    containerPrice,
    priceContainer,
    originalPrice,
    saleTag,
    saleText,
    price,
  } = styles;

  const HeaderMove = () => {
    return (
      <>
        <ListProductTypes navigation={navigation} />
        <Text style={{
          fontSize: 15,
          paddingLeft: 16,
          paddingTop: 20,
          fontWeight: 600,
          fontVariant: "inter",
        }}>Top Deals for You
        </Text>
      </>
    );
  };

  // const products = useSelector((state) => state.products.products);

  const [selectedFilter, setSelectedFilter] = useState(0);
  const [visible, setVisible] = useState(false);
  const [oldData, setOldData] = useState([]);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [showBackground, setShowBackground] = useState(false);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const searchRef = useRef();
  const textInputRef = useRef();
  const flatListRef = useRef(null);
  const scrollViewRef = useRef();



  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData.data);
      setData(productsData.data);
      setOldData(productsData.data);
      dispatch(updateProducts(productsData.data));
    };
    fetchProducts();
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
    flatListRef.current.scrollToOffset({ offset: 0 });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.borderPadding}>
        <View style={styles.searchBar}>
          {/* Magnifying glass icon */}
          <View style={styles.searchIcon}>
            <MaterialIcons name="search" size={24} color="#686868" />
          </View>
          <TextInput
            ref={textInputRef}
            style={styles.searchInput}
            placeholder="Search Products"
            value={search}
            onChangeText={txt => {
              setSearch(txt);
              searchFilterFunction(txt);
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                const newText = search.slice(0, -1);
                setSearch(newText);
                searchFilterFunction(newText);
              }
            }}
          />
          {search == '' ? null : (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                textInputRef.current.clear();
                setSearch('');
                searchFilterFunction('');
              }}>
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        initialScrollIndex={0}
        data={data}
        ListHeaderComponent={HeaderMove}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false} // Add this line
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              //update selected product
              dispatch(productSlice.actions.setSelectedProducts(item.id));
              navigation.navigate("Product Details");
            }}
            style={itemContainer}
          >
            {/* <Pressable > */}
            <Image source={{ uri: item.image }} style={image} />
            {/* </Pressable> */}
            <Text style={styles.textName}>{item.name}</Text>
            <View style={containerPrice}>
              <View style={priceContainer}>
                <Text style={price}>₹{item.price}</Text>
                <Text style={originalPrice}>
                  {item.isOnSale ? `₹${item.originalPrice}` : ""}
                </Text>
                {item.isOnSale && (
                  <View style={saleTag}>
                    <Text style={saleText}>SALE</Text>
                  </View>
                )}
              </View>
              {/* Other components of the product item */}
            </View>
          </Pressable>
        )}
        numColumns={2}
      />
      <View style={styles.bottomButtons}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.sortButton]}
            onPress={() => {
              setVisible(true);
            }}
          >
            <MaterialIcons name="sort" size={24} color="#F15927" />
            <Text style={styles.buttonText}>SORT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.filterButton]}
            onPress={() => {
              navigation.navigate("Filter Page");
            }}
          >
            <MaterialIcons name="filter-list" size={24} color="#F15927" />
            <Text style={styles.buttonText}>FILTER</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        data={data}
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <View
            style={{
              width: '80%',
              height: 200,
              borderRadius: 10,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(1);
                const strAscending = [...oldData].sort((a, b) =>
                  a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
                );
                setData(strAscending);
                setVisible(false);
                flatListRef.current.scrollToOffset({ offset: 0 });
              }}>
              <Text style={{ fontSize: 18, color: '#000' }}> Sort By Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(2);
                setData([...data].sort((a, b) => a.price - b.price));
                setVisible(false);
                flatListRef.current.scrollToOffset({ offset: 0 });
              }}>
              <Text style={{ fontSize: 18, color: '#000' }}>
                Low to High Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(3);
                setData([...data].sort((a, b) => b.price - a.price));
                setVisible(false);
                flatListRef.current.scrollToOffset({ offset: 0 });
              }}>
              <Text style={{ fontSize: 18, color: '#000' }}>
                High to Low Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(4);
                setData([...data].sort((a, b) => a.rating.rate - b.rating.rate));
                setVisible(false);
                flatListRef.current.scrollToOffset({ offset: 0 });
              }}>
              <Text style={{ fontSize: 18, color: '#000' }}> Sort By Rating</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {visible && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={() => {
            setVisible(false); // Close the modal
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  borderPadding: {
    paddingTop: 0,
    paddingLeft: 12,
    paddingRight: 16,
    paddingBottom: 8
  },
  searchBar: {
    borderColor: "#ccc",
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
  },
  scrollArea: {
    flex: 1,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
  },
  buttonContainer: {
    flex: 0.5,
  },
  button: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D3D3D3",
    paddingHorizontal: 8,
  },
  sortButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D3D3D3",
    paddingHorizontal: 8,
    borderRightWidth: 1,
  },
  buttonText: {
    color: '#F15927', // Button text color
    fontWeight: "600",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F6F6F6",
    padding: 16
  },
  itemContainer: {
    width: "50%",
    padding: 14,
  },
  containerPrice: {
    padding: 2,
    borderBottomColor: "#ccc",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "grey",
    marginRight: 8,
  },
  saleTag: {
    backgroundColor: "#F15927",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  saleText: {
    color: "white",
    fontWeight: "bold",
  },
  textName: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: "#686868",
  },
  scrollArea: {
    flex: 1,
    marginBottom: 60, // Adjust this value to ensure space for the bottom buttons
  },
  scrollContent: {
    paddingBottom: 60, // Adjust this value to match the marginBottom above
  },
});

export default ProductScreen;
