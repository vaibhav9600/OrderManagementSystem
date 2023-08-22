import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HorizontalProductList = ({ data, title }) => {
    return (
        <View style={styles.horizontalContainer}>
            <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons name="lightning-bolt-circle" size={49} color="#F15927" style={{ gap: 8 }} />
                <Text style={styles.horizontalTitle}>{title}</Text>
            </View>
            <FlatList
                horizontal
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.horizontalItem}>
                        <Image source={{ uri: item.image }} style={styles.horizontalImage} />
                        <Text style={styles.horizontalItemName}>{item.name}</Text>
                        <View style={styles.containerPrice}>
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>₹160</Text>
                                <Text style={styles.originalPrice}>
                                    ₹320
                                </Text>
                                {item.isOnSale && (
                                    <View style={styles.saleTag}>
                                        <Text style={styles.saleText}>50% off</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                )
                }
            />
        </View >
    );
};

const styles = StyleSheet.create({
    horizontalContainer: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    horizontalTitle: {
        fontSize: 24,
        fontWeight: '600',
        paddingVertical: 10,
    },
    horizontalItem: {
        marginRight: 16,
        width: 150,
    },
    horizontalImage: {
        width: '100%',
        height: 150,
        backgroundColor: '#F6F6F6',
    },
    horizontalItemName: {
        marginTop: 8,
        fontSize: 14,
        color: '#686868',
    },
    horizontalItemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
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
        fontSize: 12,
        fontWeight: "bold",
        marginRight: 8,
    },
    originalPrice: {
        fontSize: 12,
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
        fontSize: 12,
    },
});

export default HorizontalProductList;
