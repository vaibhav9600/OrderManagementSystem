import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const BelowAddToCart = ({ productData }) => {
    const [activeTab, setActiveTab] = useState('Details');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Details':
                return (
                    <ScrollView style={styles.tabContent}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: "400",
                            color: "#686868"
                        }}>{productData.details}</Text>
                    </ScrollView>
                );
            case 'warranty':
                return (
                    <ScrollView style={styles.tabContent}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: "400",
                            color: "#686868"
                        }}>{productData.warranty}</Text>
                    </ScrollView>
                );
            case 'returns':
                return (
                    <ScrollView style={styles.tabContent}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: "400",
                            color: "#686868"
                        }}>{productData.returnPolicy}</Text>
                    </ScrollView >
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Details' && styles.activeTab]}
                    onPress={() => handleTabChange('Details')}
                >
                    <Text style={styles.tabText}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'warranty' && styles.activeTab]}
                    onPress={() => handleTabChange('warranty')}
                >
                    <Text style={styles.tabText}>Warranty</Text>
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
        paddingHorizontal: 16,
        paddingVertical: 24,
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
        paddingVertical: 24,
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

export default BelowAddToCart;
