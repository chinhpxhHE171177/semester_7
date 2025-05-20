import React from "react";
import { View, Button, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "./actions";

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    return (
        <View>
            {cartItems.map(item => (
                <view key={item.id}>
                    <Text>{item.name} - {item.quantity}</Text>
                    <Button title="Remove from Cart"
                        onPress={() => dispatch(removeItem(item))} />
                </view>
            ))}
        </View>
    );
}

export default Cart;