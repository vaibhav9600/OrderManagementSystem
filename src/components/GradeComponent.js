import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CementComponent = () => {
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleGradeSelection = (grade) => {
        setSelectedGrade(grade);
    };

    const handleSizeSelection = (size) => {
        setSelectedSize(size);
    };

    const isGradeSelected = (grade) => selectedGrade === grade;
    const isSizeSelected = (size) => selectedSize === size;

    return (
        <View>
            <View style={styles.section}>
                <View style={{ paddingVertical: 16, borderTopWidth: 1, borderTopColor: "#e5e5e5" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.sectionTitle}>Grade</Text>
                        <TouchableOpacity
                            style={[
                                styles.gradeButton,
                                isGradeSelected('PPC') && styles.selectedButton
                            ]}
                            onPress={() => handleGradeSelection('PPC')}
                        >
                            <Text style={[styles.buttonText, isGradeSelected('PPC') && styles.selectedButtonText]}>PPC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.gradeButton,
                            isGradeSelected('OPC33') && styles.selectedButton]}
                            onPress={() => handleGradeSelection('OPC33')}
                        >
                            <Text style={[styles.buttonText, isGradeSelected('OPC33') && styles.selectedButtonText]}>OPC33</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.gradeButton, isGradeSelected('OPC43') && styles.selectedButton]}
                            onPress={() => handleGradeSelection('OPC43')}
                        >
                            <Text style={[styles.buttonText, isGradeSelected('OPC43') && styles.selectedButtonText]}>OPC43</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingLeft: 78, marginLeft: -8, paddingTop: 8 }}>
                        <TouchableOpacity
                            style={[styles.gradeButton, isGradeSelected('OPC53') && styles.selectedButton]}
                            onPress={() => handleGradeSelection('OPC53')}
                        >
                            <Text style={[styles.buttonText, isGradeSelected('OPC53') && styles.selectedButtonText]}>OPC53</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={[styles.section, { paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: "#e5e5e5" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.sectionTitle}>Bag Size</Text>
                    <TouchableOpacity
                        style={[
                            styles.sizeButton,
                            isSizeSelected('50kg') && styles.selectedButton
                        ]}
                        onPress={() => handleSizeSelection('50kg')}
                    >
                        <Text style={[styles.buttonText, isSizeSelected('50kg') && styles.selectedButtonText]}>50 kg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.sizeButton,
                            isSizeSelected('100kg') && styles.selectedButton
                        ]}
                        onPress={() => handleSizeSelection('100kg')}
                    >
                        <Text style={[styles.buttonText, isSizeSelected('50kg') && styles.selectedButtonText]}>100 kg</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.propertyContainer}>
                        <Text style={styles.label}>In Stock</Text>
                        <Text style={styles.value}>2930</Text>
                    </View>
                    <View style={styles.propertyContainer}>
                        <Text style={styles.label}>Min Order Qty</Text>
                        <Text style={styles.value}>10</Text>
                    </View>
                    <View style={styles.propertyContainer}>
                        <Text style={styles.label}>Max Order Qty</Text>
                        <Text style={styles.value}>10</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        // marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '400',
        color: "#686868",
        width: 70,
    },
    gradeButton: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 10,
        paddingHorizontal: 6, // Adjusted padding
        borderRadius: 5,
        height: 38,
        width: 63,
        marginLeft: 8,
        justifyContent: "center",
        alignItems: "center", // Center the text vertically
    },
    sizeButton: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 10,
        paddingHorizontal: 6, // Adjusted padding
        borderRadius: 5,
        height: 38,
        width: 63,
        marginLeft: 8,
        justifyContent: "center",
        alignItems: "center", // Center the text vertically
    },
    buttonText: {
        fontSize: 12,
    },
    selectedButton: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: "#F15927",
    },
    selectedButtonText: {
        color: "#F15927", // Change color for selected text
    },
    container: {
        paddingVertical: 16,
        backgroundColor: '#fff',
        // borderRadius: 8,
        borderBottomWidth:1,
        borderBottomColor:"#e6e6e6",
        marginBottom:10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    propertyContainer: {
        flex: 1,
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        fontWeight: '400',
        marginBottom: 4,
    },
    value: {
        fontSize: 14, // You can adjust the font size here as needed
    },
});

export default CementComponent;
