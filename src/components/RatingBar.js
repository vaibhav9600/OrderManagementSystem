import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use any icon library you prefer

const StarRatingComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.ratingContainer}>
                <Icon name="star" size={18} color="#FFD700" />
                <Icon name="star" size={18} color="#FFD700" />
                <Icon name="star-half-full" size={18} color="#FFD700" />
                <Icon name="star-o" size={18} color="#D3D3D3" />
                <Icon name="star-o" size={18} color="#D3D3D3" />
                <Text style={styles.ratingText}>2.5</Text>
            </View>
            <View style={styles.reviewContainer}>
                <Text style={styles.reviewCountText}>(2 reviews)</Text>
                <TouchableOpacity style={styles.writeReviewButton}>
                    <Text style={styles.writeReviewButtonText}>WRITE A REVIEW</Text>
                </TouchableOpacity>
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
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        paddingLeft: 8,
        fontSize: 12,
        fontWeight: "700",
        color: "#686868"
    },
    reviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewCountText: {
        paddingRight: 16,
        fontSize: 12,
        fontWeight: "400",
        color: "#686868"
    },
    writeReviewButton: {
        paddingVertical: 4,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    writeReviewButtonText: {
        color: '#F15927',
        fontSize: 13,
        fontWeight: '600',
    },
};

export default StarRatingComponent;
