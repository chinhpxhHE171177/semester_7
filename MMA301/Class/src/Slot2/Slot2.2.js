import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import Slot23 from "./Slot2.3";//truyen du lieu vao props
//dinh nghia them 1 props 
const SuDungProps = (props) => { //truyen su kien onchangeText
    return (
        <TextInput {...props} editable maxLength={120} />
    );
};
//dinh nghia state 
const SuDungState = () => {
    const [giaTri, setGiaTri] = useState('');
    return (
        <View>
            <SuDungProps
                onChangeText={text => setGiaTri(text)}
                value={giaTri}
            />
            <Text>Gia tri vua truyen la: {giaTri}</Text>
            <Slot23 TenSinhVien={giaTri} />
        </View>
    );
};

export default SuDungState;