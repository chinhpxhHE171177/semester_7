import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default class BT03 extends React.Component {
    //code 
    constructor() {
        super();
        this.state = {
            resultText: "",
            calculationText: "",
        }
    }

    //functions
    pressButton(text) {
        // press on "="
        if (text === '=') {
            return this.calculationResult(this.state.calculationText); // function calculate result 
        } else if (text === 'DEL') {
            this.operate('DEL'); // function delete
        } else {
            //when press on other button
            this.setState({
                calculationText: this.state.calculationText + text, // add text
            });
        }
    }

    //function sovle function for each button
    operate(oper) {
        switch (oper) {
            case 'DEL':
                let text = this.state.calculationText.split('');
                text.pop(); //delete last character
                this.setState({
                    calculationText: text.join(''), // join all to string 
                });
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                this.setState({
                    calculationText: this.state.calculationText + oper, // add operator 
                });
                break;
        }
    }

    //define function calculate result 
    // Function to calculate the result
    calculationResult(text) {
        try {
            // Use eval to calculate and update resultText
            this.setState({
                resultText: eval(text),
            });
        } catch (error) {
            this.setState({
                resultText: "Error", // Display error if calculation fails
            });
        }
    }
    //layout using loop
    renderButtons() {
        const buttons = [
            ['1', '4', '7', 'DEL'],
            ['2', '5', '8', '0'],
            ['3', '6', '9', '='],
            ['+', '-', '*', '/']
        ];

        return buttons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.container}>
                {row.map((button, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.btn}
                        onPress={() => this.pressButton(button)}
                    >
                        <Text style={styles.text}>{button}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        ));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.calculation}>
                    <Text style={styles.text}>{this.state.calculationText}</Text>
                </View>
                <View style={styles.result}>
                    <Text style={styles.styleText}>{this.state.resultText}</Text>
                </View>
                <View style={styles.buttons}>
                    {this.renderButtons()}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '50%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    //slpit container --> 10 components
    result: {
        flex: 1,
        //format
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        backgroundColor: '#C0C0C0',
    },
    calculation: {
        flex: 2,
        //format
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#A9A9A9',
    },
    buttons: {
        flex: 7,
        backgroundColor: '#5a5a5a',
        //split 
        flexDirection: 'row',
    },
    numbers: {
        flex: 3,
        backgroundColor: '#2B2B2B',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch', // keo dan cho cac item fill deu 
    },
    number1: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#c3c3c3',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    number2: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#c5c5c55',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    number3: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#d3d3d3',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    operations: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#c1c1c1',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    btn: {
        borderColor: 'black',
        borderWidth: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    displayText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    styleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginHorizontal: 10,
    }
});