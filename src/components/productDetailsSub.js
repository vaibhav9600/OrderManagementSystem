import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import StarRatingComponent from './RatingBar';
import CementComponent from './GradeComponent';

const ProductInfoComponent = ({ productData }) => {

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.infoText}>SKU ID</Text>
        <Text style={styles.infoOut}>{productData.SKU}</Text>
        <Text style={styles.infoText}>Brand</Text>
        <Text style={styles.infoOut}>{productData.brand}</Text>
      </View>
      <Text style={styles.productName}>{productData.name}</Text>
      <StarRatingComponent />
      <View style={styles.containerPrice}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{productData.price}</Text>
          <Text style={styles.originalPrice}>
            {productData.isOnSale ? `₹${productData.originalPrice}` : ""}
          </Text>
          {productData.isOnSale && (
            <View style={styles.saleTag}>
              <Text style={styles.saleText}>SALE</Text>
            </View>
          )}
        </View>
        {/* Other components of the product productData */}
      </View>
      <CementComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  info: {
    flexDirection: "row",
  },
  infoText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#8D8D8D",
    paddingRight: 8,
  },
  infoOut: {
    fontSize: 14,
    fontWeight: "500",
    paddingRight: 24,
    color: "#686868",
  },
  productName: {
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "500",
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignproductDatas: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignproductDatas: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  containerPrice: {
    paddingVertical: 16,
    borderBottomColor: "#ccc",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 26,
    fontWeight: "500",
    marginRight: 8,
    color: "#1D1D1D",
  },
  originalPrice: {
    fontSize: 17,
    textDecorationLine: "line-through",
    color: "#8D8D8D",
    marginRight: 8,
    fontWeight: "500",
  },
  saleTag: {
    backgroundColor: "#F15927",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  saleText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
});

export default ProductInfoComponent;
