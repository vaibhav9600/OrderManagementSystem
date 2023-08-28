import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import { totalQuantity, selectTotalPrice } from '../store/cartSlice';

const CheckoutTop = ({ numbering, varText, navigation, renderSecondContainer = true }) => {
    const totalQ = useSelector(totalQuantity);
    const totalPrice = useSelector(selectTotalPrice);
    const imageAddress = "/Users/vaibhavmishra/project/oms/OrderMS/assets/product-images/cement-1.png";
    return (
        <View style={{ flex: 1, }}>
            <View style={{ paddingVertical: 8, borderWidth: 1, borderRadius: 4, borderColor: "gainsboro", marginVertical: 16 }}>
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                    <View style={{ paddingHorizontal: 12, paddingVertical: 0, flexDirection: "row" }}>
                        <View style={{ padding: 8, backgroundColor: "#FAFAFA", borderRadius: 5 }}>
                            <Image source={{ uri: imageAddress }} style={styles.image} />
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.name}>{totalQ} items</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Shopping Cart")}>
                                <Text style={styles.size}>Show Details</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>₹ {totalPrice}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {renderSecondContainer && (
                <View style={styles.secondContainer}>
                    <View style={styles.circle}>
                        <Text style={styles.number}>{numbering}</Text>
                    </View>
                    <Text style={styles.text}>{varText}</Text>
                </View>
            )}
        </View >
    );
};

const styles = StyleSheet.create({
    totalContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 120
    },
    totalText: {
        fontSize: 17,
        fontWeight: "600",
        marginRight: 10,
        lineHeight: 33,
    },
    contentContainer: {
        marginLeft: 10,
        paddingVertical: 14,
        paddingHorizontal: 8,
        // width: 106
    },
    image: {
        width: 44,
        padding: 8,
        aspectRatio: 1,
    },
    name: {
        fontWeight: "500",
        fontSize: 14,
    },
    size: {
        fontSize: 12,
        color: "gray",
    },
    secondContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 15,
        backgroundColor: '#F15927',
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    text: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CheckoutTop;
