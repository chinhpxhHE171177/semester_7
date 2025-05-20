import React from "react";
import { Text, View, Button } from "react-native";

export default class Slot21 extends React.Component {
    //code 
    constructor(props) {
        super(props);
        this.state = {
            text: 'Click me',
            dem: 0,
        }
    }
    updateText() {
        this.setState((pre) => {
            return {
                dem: pre.dem + 1,
                text: 'Click lan ',
            }
        });
    }
    //giao dien
    render() {
        return (
            <View>
                <Text onPress={() => this.updateText()}>{this.state.text} : {this.state.dem}</Text>
            </View>
        );
    }
}