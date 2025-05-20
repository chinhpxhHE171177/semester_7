// Left menu
// npm i @react-navigation/drawer
import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
//define home screen 
const HomeScreen = ({ navigation }) => {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.onpenDrawer()} style={{ position: 'absolute', left: 20, top: 20 }}>
            <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text>Home Screen</Text>
    </View>
};

const SettingsScreen = () => {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings Screen</Text>
    </View>
};

export default function LeftMenu() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Settings" component={SettingsScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}