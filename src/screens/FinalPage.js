import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { selectTotalPrice } from "../store/cartSlice";
import { useSelector } from "react-redux";
import CheckoutTop from '../components/checkOutTop';


const FinalPage = ({ navigation }) => {

    const [selectedId, setSelectedId] = useState(null);
    const totalPrice = useSelector(selectTotalPrice);


    const handleCheckBoxClick = (id) => {
        setSelectedId(id);
    };

    const ImageAdd = "/Users/vaibhavmishra/project/oms/OrderMS/assets/FinishLine.png"
    return (
        <View style={{
            flex: 1, backgroundColor: "white",
        }}>
            <View style={{ paddingHorizontal: 12, }}>
                <ScrollView style={{ marginBottom: 0 }} showsVerticalScrollIndicator={false}>
                    <CheckoutTop navigation={navigation} renderSecondContainer={false} />
                </ScrollView>
            </View>
            <View style={{
                paddingVertical: 40,
                paddingHorizontal: 55,
            }}>
                <View style={{ width: 250, paddingTop: 24, alignItems: "center" }}>
                    <Image source={{ uri: ImageAdd }} style={{ width: 200, height: 200 }} />
                    <Text style={styles.textOne}>Thank you Harish!</Text>
                    <View style={{ flexDirection: "row", paddingBottom: 8 }}>
                        <Text style={styles.textOne}>Your order number is </Text>
                        <Text style={[styles.textOne, styles.textTwo]}>102</Text>
                    </View>
                    <Text style={{ textAlign: "center", fontSize: 12, color: "#686868" }}>We've received your order. We will send you an email once it's confirmed.</Text>
                    <View style={{ width: 200, alignItems: "center", alignContent: "center", marginTop: 10 }}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Products")}>
                            <Text style={styles.buttonText}>CONTINUE SHOPPING</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
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
    textOne: {
        fontSize: 20,
        fontWeight: "500",
    },
    textTwo: {
        color: "#F15927",
        fontSize: 22,
        fontWeight: "700"
    },
    button: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#F15927",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#F15927",
        fontWeight: "600",
        fontSize: 14,
    },
});

export default FinalPage;
