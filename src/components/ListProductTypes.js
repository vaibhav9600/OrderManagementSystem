import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CircularFrame = ({ children }) => (
    <View style={styles.frame}>
        {children}
    </View>
);

const ProductType = ({ imageUrl, label }) => (
    <View style={styles.productTypeContainer}>
        <CircularFrame>
            <Image
                source={{ uri: imageUrl }} // Use uri directly in the Image component
                style={styles.image}
                resizeMode="contain"
            />
        </CircularFrame>
        <Text style={styles.label} numberOfLines={2}>{label}</Text>
    </View>
);

const ListProductTypes = ({ navigation }) => {
    const productTypes = [
        { imageUrl: 'https://i.ibb.co/WG1CVxW/cement.png', label: 'Cement' },
        { imageUrl: 'https://i.ibb.co/6wGqyvX/paint-roller.png', label: 'Paint' },
        { imageUrl: 'https://i.ibb.co/qmSHkhr/spray-can.png', label: 'Walling Solutions' },
        { imageUrl: 'https://i.ibb.co/BypzpsY/steel.png', label: 'Steel' },
    ];

    return (
        <View style={styles.container}>
            {productTypes.map((productType, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.productTypeButton}
                    onPress={() => {
                        // console.log(`${productType.label} button pressed`);
                        navigation.navigate('Cement Page');
                    }}
                >
                    <ProductType
                        imageUrl={productType.imageUrl}
                        label={productType.label}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3'
    },
    productTypeButton: {
        marginHorizontal: 8,
    },
    productTypeContainer: {
        alignItems: 'center',
    },
    frame: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#E6DBCF",
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 34,
        height: 34,
    },
    label: {
        marginTop: 4,
        fontSize: 12,
        textAlign: 'center',
    },
});

export default ListProductTypes;
