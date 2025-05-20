// npm i @react-navigation/stack
// npm i @react-navigation/native
// npm i @react-native-async-storage/async-storage

import React, { useState, useCallback } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Button, StyleSheet } from "react-native";
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
    const [lands, setLands] = useState([]);
    const [search, setSearch] = useState('');

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const data = await AsyncStorage.getItem('lands');
                setLands(data ? JSON.parse(data) : []);
            };
            fetchData();
        }, [])
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for..."
                onChangeText={setSearch}
            />
            <FlatList
                data={lands.filter(l => l.name.includes(search) || l.location.includes(search))}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => navigation.navigate('Detail', { land: item })}
                    >
                        <Text style={styles.itemText}>{item.name} - {item.location}</Text>
                    </TouchableOpacity>
                )} 
            />
            <View style={styles.buttonContainer}>
                <Button title="Add" onPress={() => navigation.navigate('Edit')} color="#4CAF50" />
            </View>
        </View>
    );
};

const LandScreen = ({ navigation, route }) => {
    const [land, setLand] = useState(route.params?.land || { id: Date.now().toString(), name: '', location: '', price: '' });

    const saveLand = async () => {
        const storedLands = JSON.parse(await AsyncStorage.getItem('lands')) || [];
        await AsyncStorage.setItem(
            'lands',
            JSON.stringify(route.params?.land
                ? storedLands.map(l => l.id === land.id ? land : l)
                : [...storedLands, land])
        );
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={land.name}
                onChangeText={v => setLand({ ...land, name: v })}
            />
            <TextInput
                style={styles.input}
                placeholder="Location"
                value={land.location}
                onChangeText={v => setLand({ ...land, location: v })}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={land.price}
                onChangeText={v => setLand({ ...land, price: v })}
            />
            <View style={styles.buttonContainer}>
                <Button title="Save" onPress={saveLand} color="#2196F3" />
            </View>
        </View>
    );
};

const DetailScreen = ({ route, navigation }) => {
    const { land } = route.params;

    const deleteLand = async () => {
        const storedLand = JSON.parse(await AsyncStorage.getItem('lands')) || [];
        await AsyncStorage.setItem(
            'lands',
            JSON.stringify(storedLand.filter(l => l.id !== land.id))
        );
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.detailText}>Name: {land.name}</Text>
            <Text style={styles.detailText}>Location: {land.location}</Text>
            <Text style={styles.detailText}>Price: {land.price}</Text>
            <View style={styles.detailButtonContainer}>
                <Button title="Delete" onPress={deleteLand} color="#F44336" />
                <Button title="Edit" onPress={() => navigation.navigate('Edit', { land })} color="#FFC107" />
            </View>
        </View>
    );
};

const Stack = createStackNavigator();

export default function Slot11_1() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Edit" component={LandScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        marginTop: 16,
    },
    detailText: {
        fontSize: 18,
        marginBottom: 12,
        color: '#333',
    },
    detailButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});
