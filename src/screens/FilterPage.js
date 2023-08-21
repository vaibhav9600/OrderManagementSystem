import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import icons from a suitable icon library
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const FilterPage = () => {
  const [brandFilters, setBrandFilters] = useState([]);
  const navigation = useNavigation();

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
    <>
      <View style={styles.topContainer}>
        <View style={{ flex: 0.5 }}>
          <Text>Filters</Text>
        </View>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity onPress={clearAllFilters} style={styles.clearButton}>
            <Text>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerOne}>
        <View style={styles.categories}>
          <TouchableOpacity
            style={[
              styles.categoriesButton,
              isBrandSelected("Brand") && styles.categoriesSelected,
            ]}
            onPress={() => toggleBrandFilter("Brand")}
          >
            <Text style={styles.categoriesTextOne}>Brand</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoriesButton}>
            <Text style={styles.categoriesText}>Grade</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoriesButton}>
            <Text style={styles.categoriesText}>Weight</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoriesButton}>
            <Text style={styles.categoriesText}>Price</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoriesButton}>
            <Text style={styles.categoriesText}>Rating</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.6, backgroundColor: "white" }}>
          <View style={styles.container}>
            <View style={styles.brandContainer}>
              <TouchableOpacity
                onPress={() => toggleBrandFilter('Infra Market')}
                style={[styles.brandCheckbox, styles.categoriesButton]}>
                {isBrandSelected('Infra Market') ? (
                  <AntDesign name="checksquare" size={18} color="#DF542E" />
                ) : (
                  <View style={styles.checkbox} />
                )}
                <Text style={styles.categoriesText}>Infra Market</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleBrandFilter('Ultratech')}
                style={[styles.brandCheckbox, styles.categoriesButton]}>
                {isBrandSelected('Ultratech') ? (
                  <AntDesign name="checksquare" size={18} color="#DF542E" />
                ) : (
                  <View style={styles.checkbox} />
                )}
                <Text>Ultratech</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleBrandFilter('Bharathi')}
                style={[styles.brandCheckbox, styles.categoriesButton]}>
                {isBrandSelected('Bharathi') ? (
                  <AntDesign name="checksquare" size={18} color="#DF542E" />
                ) : (
                  <View style={styles.checkbox} />
                )}
                <Text>Bharathi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleBrandFilter('ACC')}
                style={[styles.brandCheckbox, styles.categoriesButton]}>
                {isBrandSelected('ACC') ? (
                  <AntDesign name="checksquare" size={18} color="#DF542E" />
                ) : (
                  <View style={styles.checkbox} />
                )}
                <Text>ACC</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleBrandFilter('Sagar')}
                style={[styles.brandCheckbox, styles.categoriesButton]}>
                {isBrandSelected('Sagar') ? (
                  <AntDesign name="checksquare" size={18} color="#DF542E" />
                ) : (
                  <View style={styles.checkbox} />
                )}
                <Text>Sagar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleBrandFilter('Birla')}
                style={[styles.brandCheckbox, styles.categoriesButton]}>
                {isBrandSelected('Birla') ? (
                  <AntDesign name="checksquare" size={18} color="#DF542E" />
                ) : (
                  <View style={styles.checkbox} />
                )}
                <Text>Birla</Text>
              </TouchableOpacity>
              {/* Add more brand checkboxes as needed */}
            </View>
          </View>
        </View>
      </View >
      <View style={styles.bottomButtons}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.sortButton]}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonTextClose}>CLOSE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.filterButton]}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: 'white',
    flex: 0.05,
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3"
  },
  containerOne: {
    flexDirection: "row",
    flex: 0.95,
  },
  categories: {
    flex: 0.4,
    backgroundColor: "#F6F6F6",
  },
  categoriesTwo: {
    flex: 0.6,
    backgroundColor: "#F6F6F6",
  },
  categoriesButton: {
    paddingVertical: 11,
    paddingLeft: 16,
    paddingRight: 12,
    borderBottomWidth: 1,  // Add this line
    borderColor: '#d3d3d3',
  },
  categoriesFirst: {
    color: "orange",
  },
  categoriesTextOne: {
    fontSize: 15,
    fontWeight: "600",
    fontVariant: "inter"
  },
  categoriesSelected: {
    backgroundColor: "#FEF2EE",
    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
  },
  categoriesText: {
    fontSize: 15,
    fontWeight: "400",
  },
  container: {
    flex: 1,
    // padding: 20,
  },
  clearButton: {
    // position: 'absolute',
    // top: 10,
    // left: 10,
    justifyContent: "flex-end",
    paddingLeft: 100,
  },
  brandContainer: {
    flex: 1,
    // paddingVertical:0,
    // marginTop: 50,
  },
  brandCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 5,
  },
  applyButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
    marginTop: 'auto', // This pushes the buttons to the bottom
    backgroundColor: "white",
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
  buttonTextClose: {
    color: "#686868",
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontWeight: "600",
  },
  buttonText: {
    color: '#F15927', // Button text color
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 6
  },
});

export default FilterPage;
