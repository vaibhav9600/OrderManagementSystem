import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';


const PopUpTop = ({ product, quantity }) => {
    const totalPrice = (quantity * product.price).toLocaleString('en-IN');
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
                <Image source={{ uri: product.image }} style={styles.image} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.name}>{product.name}</Text>
                        <Text style={styles.size}>{quantity} x ₹ {product.price.toLocaleString('en-IN')}</Text>
                    </View>
                    <Text style={{ width: 80, textAlign: 'right', fontWeight: "600", lineHeight: 18, fontSize: 14 }}>
                        ₹ {totalPrice}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentContainer: {
        marginLeft: 10,
    },
    image: {
        width: 60,
        padding: 8,
        aspectRatio: 1,
        backgroundColor: "#F6F6F6",
        borderRadius: 2,
    },
    name: {
        fontWeight: "400",
        fontSize: 12,
    },
    size: {
        fontSize: 12,
        color: "#686868",
        fontWeight: "500",
    },
};

export default PopUpTop;
