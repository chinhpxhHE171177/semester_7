import React from "react";
import { Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "./actions";
const ProductList = ({ products }) => {
    const dispatch = useDispatch();
    return (
        <view>
            {
                products.map(product => (
                    <View key={product.id}>
                        <Text>{product.name}</Text>
                        <Button title="Add to Cart" onPress={() => dispatch(addItem(product))} />
                    </View>
                ))
            };
        </view>
    )
}

export default ProductList;