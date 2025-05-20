import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default class Slot3_1 extends React.Component {
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
    //layout 
    render() {
        return (
            <View style={styles.container}>
                {/* Calculation */}
                <view style={styles.calculation}>
                    <Text style={styles.text}>{this.state.calculationText}</Text>
                </view>
                {/* Result */}
                <View style={styles.result}>
                    <Text style={styles.text}>{this.state.resultText}</Text>
                </View>
                {/* Buttons */}
                <View style={styles.buttons}>
                    {/* Number 1 */}
                    <View style={styles.number1}>
                        <TouchableOpacity style={styles.btn} key={1} onPress={() => this.pressButton(1)}>
                            <Text style={styles.text}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={4} onPress={() => this.pressButton(4)}>
                            <Text style={styles.text}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={7} onPress={() => this.pressButton(7)}>
                            <Text style={styles.text}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={'DEL'} onPress={() => this.pressButton('DEL')}>
                            <Text style={styles.text}>DEL</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Number 2 */}
                    <View style={styles.number2}>
                        <TouchableOpacity style={styles.btn} key={2} onPress={() => this.pressButton(2)}>
                            <Text style={styles.text}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={5} onPress={() => this.pressButton(5)}>
                            <Text style={styles.text}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={8} onPress={() => this.pressButton(8)}>
                            <Text style={styles.text}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={0} onPress={() => this.pressButton(0)}>
                            <Text style={styles.text}>0</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Number 3 */}
                    <View style={styles.number3}>
                        <TouchableOpacity style={styles.btn} key={3} onPress={() => this.pressButton(3)}>
                            <Text style={styles.text}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={6} onPress={() => this.pressButton(6)}>
                            <Text style={styles.text}>6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={9} onPress={() => this.pressButton(9)}>
                            <Text style={styles.text}>9</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={'='} onPress={() => this.pressButton('=')}>
                            <Text style={styles.text}>=</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Operation */}
                    <View style={styles.operations}>
                        <TouchableOpacity style={styles.btn} key={'+'} onPress={() => this.pressButton('+')}>
                            <Text style={styles.text}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={'-'} onPress={() => this.pressButton('-')}>
                            <Text style={styles.text}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={'*'} onPress={() => this.pressButton('*')}>
                            <Text style={styles.text}>*</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} key={'/'} onPress={() => this.pressButton('/')}>
                            <Text style={styles.text}>/</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
        textAlign: 'right'
    }
});