//Click button 
import React from "react";
import { View, Text, Button } from "react-native";
export default class Slot5_1 extends React.Component {
    //code 
    constructor() {
        super();
        this.state = {
            counter: 0,
        };
    }
    increment() {
        debugger;
        this.setState({
            counter: this.state.counter + 1,
        });
        console.log("Count: ", this.state.counter);
    }
    //layout 
    render() {
        return (
            <View style={{ padding: 50 }}>
                <Text>Example Slot 5_1</Text>
                <Text>Click button time to: {this.state.counter}</Text>
                <Button title="Click me" onPress={() => this.increment()} />
            </View>
        );
    }
}
