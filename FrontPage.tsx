import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 20, discount: 10, image: '~/project/OMS/orderMS/assets/icon.png' },
  { id: 2, name: 'Product 2', price: 30, discount: 5, image: '~/project/OMS/orderMS/assets/icon.png' },
  // Add more products here
];

const FrontPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/icon.png')} style={styles.logo} />
        <Ionicons name="cart-outline" size={24} color="black" />
      </View>
      <TextInput style={styles.searchBar} placeholder="Search products..." />
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.product}>
            {/* <Image source={ {uri: item.image }} style={styles.productImage} /> */}
            <Text>{item.name}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Discount: {item.discount}% off</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productGrid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  productGrid: {
    flexGrow: 1,
  },
  product: {
    flex: 0.5,
    margin: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
});

export default FrontPage;
