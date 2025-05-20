// Cart.js
import React, { useState } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import ProductItem from "./ProductItem";
import { ScrollView } from "react-native-gesture-handler";

// Giỏ hàng toàn cục
global.mycart = [];

const Cart = ({ route }) => {
    const [count, setCount] = useState(1);
    const [list, setList] = useState([]); // State chứa giỏ hàng hiện tại
    const data = route.params?.data || {}; // Đảm bảo data là object

    // Thêm sản phẩm vào giỏ hàng
    const ListProductInCart = () => {
        const newList = [{ ...data, count }, ...global.mycart]; // Thêm số lượng
        setList(newList); // Cập nhật danh sách hiển thị
        global.mycart = newList; // Cập nhật giỏ hàng toàn cục
    };

    // Hiển thị sản phẩm trong giỏ hàng
    const renderItemCart = ({ item }) => {
        return <ProductItem dataProd={item} />;
    };

    return (
        <ScrollView style={{ height: '100vh', overflowY: 'auto' }}>
            <View style={styles.container}>
                {/* Sản phẩm đang xem */}
                <View style={styles.productCard}>
                    <ProductItem dataProd={data} />
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => setCount(count > 1 ? count - 1 : 1)}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{count}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.addToCartButton} onPress={ListProductInCart}>
                        <Text style={styles.addToCartText}>🛒 Thêm vào giỏ hàng</Text>
                    </TouchableOpacity>
                </View>

                {/* Danh sách sản phẩm trong giỏ */}
                <Text style={styles.cartTitle}>🛍 Giỏ Hàng ({list.length} sản phẩm)</Text>
                <FlatList
                    data={list}
                    renderItem={renderItemCart}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2} // Hiển thị 2 cột
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.cartList}
                />
            </View>
        </ScrollView>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    productCard: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    quantityText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    addToCartButton: {
        backgroundColor: "#28A745",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    addToCartText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    cartTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        color: "#333",
    },
    cartList: {
        paddingBottom: 20,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 10,
    },
});
