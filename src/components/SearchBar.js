import React, { useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText, onClear }) => {
  const textInputRef = useRef();

  return (
    <View style={styles.searchBar}>
      <View style={styles.searchIcon}>
        <MaterialIcons name="search" size={24} color="#686868" />
      </View>
      <TextInput
        ref={textInputRef}
        style={styles.searchInput}
        placeholder="Search Products"
        value={value}
        onChangeText={onChangeText}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Backspace') {
            const newText = value.slice(0, -1);
            onChangeText(newText);
          }
        }}
      />
      {value === '' ? null : (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => {
            textInputRef.current.clear();
            onClear();
          }}>
          <MaterialCommunityIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default SearchBar;
