import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import addresses from '../data/addresses';
import { selectTotalPrice } from "../store/cartSlice";
import { useSelector } from "react-redux";

const PaymentPage = ({ navigation }) => {

    const [selectedId, setSelectedId] = useState(null);
    const totalPrice = useSelector(selectTotalPrice);


    const handleCheckBoxClick = (id) => {
        setSelectedId(id);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {addresses.map((address) => (
                    <TouchableOpacity
                        key={address.id}
                        onPress={() => handleCheckBoxClick(address.id)}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            borderBottomWidth: 1,
                            borderColor: '#ccc',
                            backgroundColor: selectedId === address.id ? '#e0e0e0' : 'white',
                        }}
                    >
                        <Text style={{ marginRight: 10 }}>{address.address}</Text>
                        <View
                            style={{
                                width: 20,
                                height: 20,
                                borderWidth: 1,
                                borderColor: '#000',
                                borderRadius: 3,
                                backgroundColor:
                                    selectedId === address.id ? '#000' : 'transparent',
                            }}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>₹ {totalPrice}</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>PLACE ORDER</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    totalsContainer: {
        margin: 20,
        borderColor: "gainsboro",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 2,
    },
    text: {
        fontSize: 16,
        color: "gray",
    },
    textBold: {
        fontSize: 16,
        fontWeight: "500",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: "gainsboro",
    },
    button: {
        backgroundColor: "#F15927",
        alignItems: "center",
        paddingVertical: 6,
        borderRadius: 4,
        // paddingHorizontal:20,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
        lineHeight: 24
    },
    totalContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    totalText: {
        fontSize: 17,
        fontWeight: "600",
        marginRight: 10,
        lineHeight: 33,
    },
    welcomeText: {
        fontSize: 14,
        fontWeight: "600",
        // marginRight: 10,
        lineHeight: 18,
    },
    couponInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    couponText: {
        fontSize: 12,
        color: "gray",
        // marginRight: 10,
        paddingVertical: 4,
        fontWeight: "400",
    },
    removeButton: {
        backgroundColor: "#F15927",
        paddingVertical: 4,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    dottedBox: {
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "gray",
        paddingHorizontal: 16,
        borderRadius: 5,
    },
});

export default PaymentPage;
