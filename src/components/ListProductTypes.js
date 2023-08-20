import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CircularFrame = ({ children }) => (
    <View style={styles.frame}>
        {children}
    </View>
);

const ProductType = ({ imageSource, label }) => (
    <View style={styles.productTypeContainer}>
        <CircularFrame>
            <Image
                source={imageSource}
                style={styles.image}
                resizeMode="contain"
            />
        </CircularFrame>
        <Text style={styles.label} numberOfLines={2}>{label}</Text>
    </View>
);

const ListProductTypes = ({ navigation }) => {
    const productTypes = [
        { imageSource: require('/Users/vaibhavmishra/project/oms/OrderMS/assets/header-components/cement.png'), label: 'Cement' },
        { imageSource: require('/Users/vaibhavmishra/project/oms/OrderMS/assets/header-components/paint-roller.png'), label: 'Paint' },
        { imageSource: require('/Users/vaibhavmishra/project/oms/OrderMS/assets/header-components/spray-can.png'), label: 'Walling Solutions' },
        { imageSource: require('/Users/vaibhavmishra/project/oms/OrderMS/assets/header-components/steel.png'), label: 'Steel' },
    ];

    return (
        <View style={styles.container}>
            {productTypes.map((productType, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.productTypeButton}
                    onPress={() =>
                    // console.log(`${productType.label} button pressed`)
                    { navigation.navigate('Cement Page'); }
                    }
                >
                    <ProductType
                        imageSource={productType.imageSource}
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
