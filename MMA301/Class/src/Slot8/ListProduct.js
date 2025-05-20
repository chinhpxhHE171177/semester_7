// ListProduct.js
import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet, ActivityIndicator, Text } from "react-native";
import ProductItem from "./ProductItem";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const ListProduct = () => {
    const [prd, setPrd] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const viewDetail = (data) => {
        navigation.navigate("DetailProduct", { data });
    };

    const getProducts = async () => {
        try {
            const url = "https://hungnttg.github.io/shopgiay.json";
            const response = await fetch(url);
            const responseJSON = await response.json();
            setPrd(responseJSON.products);
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#28a745" style={styles.loading} />;
    }

    return (
        <ScrollView style={{ height: '100vh', overFlowY: 'auto' }}>
            <View style={styles.container}>
                <FlatList
                    data={prd}
                    renderItem={({ item }) => (
                        <ProductItem dataProd={item} handlePress={() => viewDetail(item)} />
                    )}
                    numColumns={3}
                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                    columnWrapperStyle={styles.row} // Căn chỉnh giữa các cột
                    ListHeaderComponent={<Text style={styles.title}>🛍 Danh Sách Sản Phẩm</Text>}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </ScrollView>
    );
};

export default ListProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15,
        color: "#333",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
