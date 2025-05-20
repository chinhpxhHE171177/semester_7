import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Slot16_1 = () => {
    const [coordinate, setCoordinate] = useState({
        latitude: 21.0278,
        longitude: 105.8342
    });

    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setCoordinate({ latitude, longitude });
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                onPress={handleMapPress}
            >
                <Marker coordinate={coordinate} title="Vị trí đã chọn" />
            </MapView>
            <View style={styles.infoBox}>
                <Text style={styles.text}>Vĩ độ: {coordinate.latitude.toFixed(6)}</Text>
                <Text style={styles.text}>Kinh độ: {coordinate.longitude.toFixed(6)}</Text>
            </View>
        </View>
    );
};

export default Slot16_1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1
    },
    infoBox: {
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});
