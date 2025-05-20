import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
const Slot2_5 = () => {
    //code
    const [hoTen, setHoTen] = useState('');
    //giao dien
    return (
        <View>
            <TextInput
                placeholder="Hay nhap ho ten"
                onChangeText={hoTen => setHoTen(hoTen)}
                defaultValue={hoTen}
            />
            <Text>Ban vua nhap thong tin: {hoTen}</Text>
        </View>
    );
}
export default Slot2_5;