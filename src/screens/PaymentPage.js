import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { selectTotalPrice, totalQuantity } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckoutTop from '../components/checkOutTop';
import { Ionicons } from '@expo/vector-icons';
import { updatePaymentMethod } from '../store/addressSlice';
import { selectProductsWithQuantities } from '../store/cartSlice';
import { updateInvoice } from '../store/invoiceSlice';

const serverURL = 'http://127.0.0.1:8080/api';

const getAddress = async () => {
    try {
        const response = await fetch(`${serverURL}/payment_methods`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching payment methods:', error);
    }
};

const createCartItemsBatch = async (cartItems) => {
    try {
        const response = await fetch(`${serverURL}/create_cartItems_batch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
        });
        if (response.ok) {
            console.log('cartItems added successfully');
            // You can perform additional actions here after successful cart items addition
        } else {
            console.error('Failed to create cartItems');
        }
    } catch (error) {
        console.error('Error creating cartItems:', error);
    }
};

const addInvoice = async (invoiceData) => {
    try {
        const response = await fetch(`${serverURL}/create_invoice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoiceData),
        });
        if (response.ok) {
            console.log('invoice added successfully');
            // You can perform additional actions here after successful booking addition
        } else {
            console.error('Failed to create invoice');
        }
    } catch (error) {
        console.error('Error creating invoice:', error);
    }
};

const getInvoiceID = async () => {
    try {
        const response = await fetch(`${serverURL}/get_invoice_id`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching invoice id:', error);
    }
};

const PaymentPage = ({ navigation }) => {
    const [selectedId, setSelectedId] = useState(null);
    const totalPrice = useSelector(selectTotalPrice);
    const cartTotalQuantity = useSelector(totalQuantity);
    const dispatch = useDispatch();
    const [invoiceID, setInvoiceID] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const productsWithQuantities = useSelector(selectProductsWithQuantities);
    const shipping_add = useSelector((state) => state.address.selectedShippingAddress);
    const billing_add = useSelector((state) => state.address.selectedBillingAddress);
    const payment_met = useSelector((state) => state.address.selectedPaymentMethod);

    const invoiceData = {
        bill_add_id: shipping_add,
        ship_add_id: billing_add,
        payment_id: payment_met
    };


    const handlePlaceOrder = async () => {
        if (totalPrice !== 0) {
            await addInvoice(invoiceData); // Wait for addInvoice to complete
            const newInvoiceID = await getInvoiceID();
            // setInvoiceID(newInvoiceID.data); // Update the invoice ID state
            // console.log("invoice id:" + newInvoiceID.data);

            const productsWithInvoiceId = productsWithQuantities.map((product) => ({
                ...product,
                invoice_id: newInvoiceID.data !== null ? newInvoiceID.data : 13,
            }));
            dispatch(updateInvoice(newInvoiceID.data));
            console.log(productsWithInvoiceId);
            await createCartItemsBatch(productsWithInvoiceId);

            navigation.navigate("Final Screen");
        }
    };


    useEffect(() => {
        const fetchPayment = async () => {
            const paymentData = await getAddress();
            const paymentMethodsWithSelection = paymentData.data.map(payment => ({
                ...payment,
                isSelected: false,
            }));
            setPaymentMethods(paymentMethodsWithSelection);
            if (paymentMethodsWithSelection.length > 0 && selectedId === null) {
                setSelectedId(paymentMethodsWithSelection[0].id);
                dispatch(updatePaymentMethod(paymentMethodsWithSelection[0].id));
            }
        };
        fetchPayment();
    }, [invoiceData, invoiceID]);

    const handleCheckBoxClick = (id) => {
        dispatch(updatePaymentMethod(id));
        setSelectedId(id);
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 12, backgroundColor: "white" }}>
            <ScrollView style={{ marginBottom: 80 }} showsVerticalScrollIndicator={false}>
                <CheckoutTop numbering={3} varText={"Select a Payment Method"} navigation={navigation} />
                {paymentMethods.map((payment) => (
                    <TouchableOpacity
                        key={payment.id}
                        onPress={() => handleCheckBoxClick(payment.id)}
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
                            flex: 1,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                            backgroundColor: selectedId === payment.id ? '#FEF2EE' : '#FAFAFA',
                        }}>
                            <View style={{ flexDirection: "row", alignContent: "space-between", paddingBottom: 5 }}>
                                <View style={[styles.checkbox, selectedId === payment.id && styles.checkbox2]}>
                                    {selectedId === payment.id && (
                                        <Ionicons name="checkmark-circle-sharp" size={20} color="#F15927" style={{ marginTop: -4, marginLeft: -2 }} />
                                    )}
                                </View>
                                {/* {(payment.type === 'Credit' || payment.type === 'credit') && (
                                    <View style={styles.availableCreditContainer}>
                                        <Text style={styles.availableCreditText}>Available Credit:</Text>
                                        <Text style={styles.availableCreditAmount}>₹ 8000</Text>
                                    </View>
                                )} */}
                            </View>
                            <View style={styles.addressBox}>
                                <Text style={{ marginRight: 10, fontSize: 12, fontWeight: "400", color: "#686868" }}>{payment.type}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>₹ {totalPrice}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.button,
                    { backgroundColor: totalPrice === 0 ? 'gray' : '#F15927' }]}
                    onPress={handlePlaceOrder}
                    disabled={totalPrice === 0}>
                    <Text style={styles.buttonText}>PLACE ORDER</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};



const styles = StyleSheet.create({
    checkbox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 7.5,
        // marginLeft: 'auto',
    },
    checkbox2: {
        // width: 16,
        // height: 16,
        borderWidth: 0,
        borderColor: '#000',
        borderRadius: 7.5,
        // marginLeft: 'auto',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    availableCreditContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    availableCreditText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#686868',
        marginRight: 5,
    },
    availableCreditAmount: {
        flexDirection: "row",
        fontSize: 12,
        fontWeight: '500',
        color: '#F15927',
    },
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
        lineHeight: 18,
    },
    couponInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    couponText: {
        fontSize: 12,
        color: "gray",
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

export default PaymentPage;