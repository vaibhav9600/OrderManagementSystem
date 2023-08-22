import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const ProductInfoComponent = ({ productData }) => {
  const [activeTab, setActiveTab] = useState('warranty');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'warranty':
        return (
          <ScrollView style={styles.tabContent}>
            <Text>{productData.warranty}</Text>
          </ScrollView>
        );
      case 'specifications':
        return (
          <ScrollView style={styles.tabContent}>
            <Text>{productData.specifications}</Text>
          </ScrollView>
        );
      case 'returns':
        return (
          <ScrollView style={styles.tabContent}>
            <Text>{productData.returnPolicy}</Text>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'warranty' && styles.activeTab]}
          onPress={() => handleTabChange('warranty')}
        >
          <Text style={styles.tabText}>Warranty</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'specifications' && styles.activeTab]}
          onPress={() => handleTabChange('specifications')}
        >
          <Text style={styles.tabText}>Specifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'returns' && styles.activeTab]}
          onPress={() => handleTabChange('returns')}
        >
          <Text style={styles.tabText}>Returns</Text>
        </TouchableOpacity>
      </View>
      {renderTabContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
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
});

export default ProductInfoComponent;
