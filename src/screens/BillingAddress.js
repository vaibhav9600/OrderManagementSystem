import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { selectTotalPrice } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckoutTop from '../components/checkOutTop';
import { Ionicons } from '@expo/vector-icons';
import { updateBillingAddress, updateBA } from '../store/addressSlice';

// const serverURL = 'http://127.0.0.1:8080/api';
const serverURL = 'http://10.44.1.91:31000/api/';


const getAddress = async () => {
    try {
        const response = await fetch(`${serverURL}/billing_addresses`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching billing adresses:', error);
    }
};

const BillingAddress = ({ navigation }) => {

    const [selectedId, setSelectedId] = useState(useSelector((state) => state.address.selectedBillingAddress));
    const totalPrice = useSelector(selectTotalPrice);
    const [addresses, setAddresses] = useState(useSelector((state) => state.address.billingAddresses));
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAddress = async () => {
            const addressData = await getAddress();
            if (addressData.data.length > 0 && selectedId === null) { // Check if addresses exist and selectedId is null
                setSelectedId(addressData.data[0].id); // Set the selectedId to the first address id
                dispatch(updateBillingAddress(addressData.data[0].id)); // Update the shipping address
            }
            setAddresses(addressData.data);
            dispatch(updateBA(addressData.data));
        };
        fetchAddress();
    }, []);

    const handleCheckBoxClick = (id) => {
        dispatch(updateBillingAddress(id));
        setSelectedId(id);
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 12, backgroundColor: "white" }}>
            <ScrollView style={{ marginBottom: 80 }} showsVerticalScrollIndicator={false}>
                <CheckoutTop numbering={2} varText={"Select a Billing Address"} navigation={navigation} />
                {addresses.map((address) => (
                    <TouchableOpacity
                        key={address.id}
                        onPress={() => handleCheckBoxClick(address.id)}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            borderColor: '#ccc',
                        }}
                    >
                        <View style={{
                            paddingVertical: 12,
                            flexDirection: "column",
                            borderColor: 'gray',
                            padding: 10,
                            borderRadius: 5,
                            backgroundColor: selectedId === address.id ? '#FEF2EE' : '#FAFAFA',
                        }}>
                            <View style={{ flexDirection: "row", alignContent: "space-between", paddingBottom: 6 }}>
                                <Text style={{ fontSize: 14, fontWeight: "500" }}>{address.addressTitle}</Text>

                                <View style={[(!(selectedId === address.id)) && styles.checkbox, (selectedId === address.id && styles.checkbox2)]}>
                                    {selectedId === address.id && (
                                        <Ionicons name="checkmark-circle-sharp" size={20} color="#F15927" style={{ marginTop: -4, marginLeft: -2 }} />
                                    )}
                                </View>
                            </View>
                            <View style={styles.addressBox}>
                                <Text style={{ marginRight: 10, fontSize: 12, fontWeight: "400", color: "#686868" }}>{address.address}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>₹ {totalPrice}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Payment Screen")}>
                    <Text style={styles.buttonText}>CONTINUE</Text>
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
    addressBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 7.5,
        marginLeft: 'auto',
    },
    checkbox2: {
        width: 16,
        height: 16,
        // borderWidth: 1,
        borderColor: '#000',
        borderRadius: 7.5,
        marginLeft: 'auto',
    },
    checkboxInner: {
        width: 16,
        height: 16,
        backgroundColor: 'black',
        borderRadius: 7.5,
        alignSelf: 'center',
    },
});


export default BillingAddress;
