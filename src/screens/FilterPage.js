import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import icons from a suitable icon library

const FilterPage = () => {
  const [brandFilters, setBrandFilters] = useState([]);

  const toggleBrandFilter = (brandName) => {
    if (brandFilters.includes(brandName)) {
      setBrandFilters(brandFilters.filter((brand) => brand !== brandName));
    } else {
      setBrandFilters([...brandFilters, brandName]);
    }
  };

  const clearAllFilters = () => {
    setBrandFilters([]);
  };

  const applyFilters = () => {
    // Logic to apply filters and update order list
    // This is where you would typically call an API to fetch filtered orders
  };

  const isBrandSelected = (brandName) => brandFilters.includes(brandName);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={clearAllFilters} style={styles.clearButton}>
        <Text>Clear All</Text>
      </TouchableOpacity>
      <View style={styles.brandContainer}>
        <TouchableOpacity
          onPress={() => toggleBrandFilter('Brand A')}
          style={styles.brandCheckbox}>
          {isBrandSelected('Brand A') ? (
            <AntDesign name="checksquare" size={20} color="green" />
          ) : (
            <View style={styles.checkbox} />
          )}
          <Text>Brand A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleBrandFilter('Brand B')}
          style={styles.brandCheckbox}>
          {isBrandSelected('Brand B') ? (
            <AntDesign name="checksquare" size={20} color="green" />
          ) : (
            <View style={styles.checkbox} />
          )}
          <Text>Brand B</Text>
        </TouchableOpacity>
        {/* Add more brand checkboxes as needed */}
      </View>
      <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
        <Text>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  clearButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  brandContainer: {
    marginTop: 50,
  },
  brandCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
  },
  applyButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default FilterPage;
