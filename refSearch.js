import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

// Assuming your Go server is running at http://your-server-ip:8080
const serverURL = 'http://192.168.1.8:8080/api';

// Creating a new product
const createProduct = async (productData) => {
    try {
        const response = await fetch(`${serverURL}/create_cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'FetchReflication/json',
            },
            body: JSON.stringify(productData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating product:', error);
    }
};

// Fetching all products
const getProducts = async () => {
    try {
        const response = await fetch(`${serverURL}/products`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

// Deleting a product
const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${serverURL}/delete_cart/${productId}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};


const FetchRef = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const productsData = await getProducts();
        setProducts(productsData.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <View>
            <Text>Product List:</Text>
            {products.map((product) => (
                <View key={product.id}>
                    <Text>{product.name}</Text>
                    <Button
                        title="Delete"
                        onPress={() => deleteProduct(product.id)}
                    />
                </View>
            ))}
        </View>
    );
};

export default FetchRef;
