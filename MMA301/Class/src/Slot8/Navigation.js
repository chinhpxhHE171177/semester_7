// navigation.js 
import React from "react";
import ListProduct from "./ListProduct";
import DetailProduct from "./DetailProduct";
import Cart from "./Cart";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator(); // create stack navigator 

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ListProduct">
                <Stack.Screen name="ListProduct" component={ListProduct} />
                <Stack.Screen name="DetailProduct" component={DetailProduct} />
                <Stack.Screen name="Cart" component={Cart} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;