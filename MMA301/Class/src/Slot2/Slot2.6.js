import React, { useState } from "react";
import { Text, View, Button } from "react-native";
const Slot2_6 = () => {
    //code
    const [count, setCount] = useState(0);
    //giao dien
    return (
        <View>
            <Text>So lan click: {count}</Text>
            <Button onPress={() => setCount(count + 1)} title="Click me" />
        </View>
    );

}
export default Slot2_6;