import React from "react";
import { Text, View } from "react-native";
import Slot24Child from "./Slot2.4.Child";
const Slot24Parent = () => {
    //khai bao du lieu de truyen vao props co ten la name
    const userName = "Pham Xuan Chinh";
    return (
        //truyen du lieu vao component con qua props: name
        <Slot24Child name={userName} />
    );
}
export default Slot24Parent;