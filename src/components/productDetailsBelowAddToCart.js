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
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignproductDatas: 'center',
        paddingVertical: 10,
    },
    tab: {
        flex: 1,
        width:116.67,
        paddingVertical: 10,
        alignproductDatas: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderColor: '#F15927',
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color:"#F15927",
        alignItems:"center",
        alignSelf:"center",
    },
    tabContent: {
        flex: 1,
        paddingVertical: 24,
    },
});

export default BelowAddToCart;
