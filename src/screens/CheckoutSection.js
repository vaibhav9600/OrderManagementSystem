import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import addresses from '../data/addresses';

const Stack = createNativeStackNavigator();

const App = () => {

    const PaymentComponent = ({ paymentType, onSelect }) => {
        return (
            <TouchableOpacity onPress={onSelect}>
                <Text>Payment Type: {paymentType}</Text>
            </TouchableOpacity>
        );
    };
    const BillingComponent = ({ billingLocation, onSelect }) => {
        return (
            <TouchableOpacity onPress={onSelect}>
                <Text>Billing Location: {billingLocation}</Text>
            </TouchableOpacity>
        );
    };
    const AddressComponent = ({ address, isSelected, onSelect }) => {
        return (
            <TouchableOpacity onPress={onSelect}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{address.address}, {address.city}</Text>
                    <Text> {isSelected ? '✓' : ''}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedBilling, setSelectedBilling] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [orderNumber, setOrderNumber] = useState(null);

    const handleCheckout = () => {
        if (!selectedAddress) {
            // Address selection state
            setSelectedAddress(addresses.find(addr => addr.isSelected));
        } else if (!selectedBilling) {
            // Billing location selection state
            setSelectedBilling(selectedAddress.city);
        } else if (!selectedPayment) {
            // Payment type selection state
            setSelectedPayment('Credit Card'); // You can add more payment options
        } else {
            // Place order
            const generatedOrderNumber = Math.floor(Math.random() * 100000);
            setOrderNumber(generatedOrderNumber);
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Checkout">
                    {() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {!orderNumber ? (
                                <>
                                    {!selectedAddress && addresses.map(addr => (
                                        <AddressComponent
                                            key={addr.id}
                                            address={addr}
                                            isSelected={addr.isSelected}
                                            onSelect={() => {
                                                if (!addr.isSelected) {
                                                    addresses.forEach(a => a.isSelected = false);
                                                    addr.isSelected = true;
                                                    setSelectedAddress(addr);
                                                }
                                            }}
                                        />
                                    ))}
                                    {selectedAddress && !selectedBilling && (
                                        <BillingComponent
                                            billingLocation={selectedAddress.city}
                                            onSelect={() => setSelectedBilling(selectedAddress.city)}
                                        />
                                    )}
                                    {selectedBilling && !selectedPayment && (
                                        <PaymentComponent
                                            paymentType="Credit Card" // You can add more payment options
                                            onSelect={() => setSelectedPayment('Credit Card')}
                                        />
                                    )}
                                    <Button title="Checkout" onPress={handleCheckout} />
                                </>
                            ) : (
                                <Text>Order confirmed! Order number: {orderNumber}</Text>
                            )}
                        </View>
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
