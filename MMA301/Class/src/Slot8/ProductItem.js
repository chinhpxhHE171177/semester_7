// ProductItem.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductItem = ({ dataProd, handlePress }) => {
    const fun_handlePress = () => {
        if (handlePress) {
            handlePress(dataProd);
        }
    };

    return (
        <TouchableOpacity onPress={fun_handlePress} style={styles.card}>
            <Image source={{ uri: dataProd.search_image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.brand}>{dataProd.brands_filter_facet}</Text>
                <Text style={styles.title}>{dataProd.product_additional_info}</Text>
                <Text style={styles.price}>${dataProd.price}</Text>
                <Text style={styles.styleID}>ID: {dataProd.styleid}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProductItem;

const styles = StyleSheet.create({
    card: {
        width: '30%',
        height: 'auto',
        backgroundColor: '#fff',
        borderRadius: 12, // Bo góc 
        margin: 10,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Đổ bóng trên Android 
        alignItems: 'center',
    },
    image: {
        width: 430,
        height: 430,
        borderRadius: 8, // Bo góc hình ảnh
        marginBottom: 8,
    },
    textContainer: {
        alignItems: 'center',
    },
    brand: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    title: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e63946', // Màu đỏ nổi bật cho giá 
        marginTop: 6,
    },
    styleID: {
        fontSize: 12,
        color: '#777',
        marginTop: 4,
    },
});
