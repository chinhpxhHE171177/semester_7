// navigation.js 
import React from "react";
import ListProducts from "./ListProducts";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator(); // create stack navigator 

const Nav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ListProduct">
                <Stack.Screen
                    name="ListProduct"
                    component={ListProducts}  // Correct component name
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Nav;