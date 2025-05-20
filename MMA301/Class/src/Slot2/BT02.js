// Build Electronic Calculator interface using react native
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Calculator = () => {
    const [input, setInput] = useState('');

    const handlePress = (value) => {
        setInput((prev) => (prev === 'Error' ? value : prev + value));
    };

    const handleClear = () => {
        setInput('');
    };

    const handleCalculate = () => {
        try {
            setInput(eval(input).toString());
        } catch {
            setInput('Error');
        }
    };

    const renderButton = (label, onPress, style = styles.button) => (
        <TouchableOpacity key={label} style={style} onPress={onPress}>
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.display}>{input}</Text>
            <View style={styles.grid}>
                {['7', '8', '9', '/'].map((item) =>
                    renderButton(item, () => handlePress(item))
                )}
                {['4', '5', '6', '*'].map((item) =>
                    renderButton(item, () => handlePress(item))
                )}
                {['1', '2', '3', '-'].map((item) =>
                    renderButton(item, () => handlePress(item))
                )}
                {['C', '0', '=', '+'].map((item) =>
                    renderButton(
                        item,
                        item === 'C'
                            ? handleClear
                            : item === '='
                                ? handleCalculate
                                : () => handlePress(item),
                        item === 'C' ? styles.clearButton : styles.button
                    )
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    display: {
        fontSize: 36,
        marginBottom: 20,
        textAlign: 'right',
        width: '50%',
        padding: 10,
        backgroundColor: '#eaeaea',
        borderRadius: 10,
    },
    grid: {
        width: '50%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        width: '23%',
        margin: '1%',
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
    },
    clearButton: {
        width: '23%',
        margin: '1%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        borderRadius: 10,
    },
});

export default Calculator;
