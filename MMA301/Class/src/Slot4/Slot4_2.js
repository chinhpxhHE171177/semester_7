// Xay dung giao dien may tinh == vong lap + kieu function  
import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native-web";

const Slot4_2 = () => {
    //--------code-----------
    //Declare states 
    const [result, setResult] = useState('');// Display result 
    const [express, setExpress] = useState('');// Display expression
    const [middle, setMiddle] = useState('');// attribute save in background 
    // Declare variables temp
    let resultText = "";
    let calculationText = "";
    const pressButton = (text) => {
        // When user press on button =, calculate result 
        if (text === "=") {
            calculationText = middle; //Move data from middle to calculationText
            resultText = eval(calculationText); // Calculate result 
            setResult(resultText); //Display result 
        } else if (text === "DEL") {
            calculationText = middle; //Move data from middle to calculationText
            let text1 = calculationText.split(''); //Slpit string 
            text1.pop(); //Delete last character 
            calculationText = text1.join(''); //Join all to string 
            setMiddle(calculationText); //Update to variable middle 
            setExpress(calculationText);//Update expression for user know 
        } else {
            calculationText = middle; //Get values from attribute's middle 
            calculationText += text; //Add text to calculationText
            setExpress(calculationText);// Update expression for use know 
            setMiddle(calculationText); //Update to variable middle 
        }
    }
    //layout
    let rows = []; // arrays for numbers
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', '0', '=']];

    for (let i = 0; i < nums.length; i++) {
        let row = []; // row contains numbers 
        for (let j = 0; j < nums[i].length; j++) {
            // Push each number button into the row
            row.push(
                <TouchableOpacity key={`${i}-${j}`} style={styles.button} onPress={() => pressButton(nums[i][j])}>
                    <Text style={styles.text}>{nums[i][j]}</Text>
                </TouchableOpacity>
            );
        }
        // Push the completed row into rows
        rows.push(
            <View key={`row-${i}`} style={styles.lines}>
                {row}
            </View>
        );
    }

    let ops = []; //arrays operators 
    let pos = ['+', '-', '*', '/', 'DEL'];
    for (let i = 0; i < 5; i++) {
        ops.push(
            <TouchableOpacity key={ops[i]} style={styles.button} onPress={() => pressButton(pos[i])}>
                <Text style={styles.text}>{pos[i]}</Text>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>
            {/* Result */}
            <View style={styles.result}>
                <Text style={styles.text}>{result}</Text>
            </View>
            {/* Calculation */}
            <View style={styles.calculation}>
                <Text style={styles.text}>{express}</Text>
            </View>
            {/* Buttons */}
            <View style={styles.button}>
                <View style={styles.numbers}>{rows}</View>
                <View style={styles.operation}>{ops}</View>
            </View>
        </View>
    )
};

//Styles 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    //Devide colums --> 3 components 
    result: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    calculation: {
        flex: 2,
        backgroundColor: 'green',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    button: {
        flex: 7,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    //Devide buttons --> 2 components: 3,1
    numbers: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    //Deived numbers --> columns 
    lines: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#a2a2a2',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    operators: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: '#a1a1a1',
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Slot4_2;