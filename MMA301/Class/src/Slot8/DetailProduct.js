// DetailProduct.js
import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import ProductItem from "./ProductItem";

const DetailProduct = ({ navigation }) => {
    const route = useRoute();
    const d = route.params?.data || {}; // Fix dữ liệu mặc định

    const addToCart = () => {
        navigation.navigate('Cart', { data: d });
    }

    return (
        <ScrollView style={{ height: '100vh', overflowY: 'auto' }}>
            <View style={styles.container}>
                <ProductItem dataProd={d} />
                <TouchableOpacity onPress={addToCart} style={styles.button}>
                    <Text style={styles.buttonText}>🛒 Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default DetailProduct;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: "center",
        backgroundColor: "#F9F9F9",
    },
    button: {
        backgroundColor: "#28a745", // Màu xanh lá hiện đại
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 25, // Bo góc mềm mại
        elevation: 5, // Hiệu ứng đổ bóng
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
});
