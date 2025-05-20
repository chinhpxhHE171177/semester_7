import React from "react";
import { Text, View, Image, TouchableWithoutFeedback, StyleSheet } from "react-native";
export default class ProductItem extends React.Component {
    //code
    constructor() {
        super();
        this.props = {
            dataProd: {},//doi tuong
            handlePress: null,//nhan su kien tu ben ngoai (component cha truyen vao)
        };
    }
    fun_handlePress() {//xu ly su kien khi nguoi dung click vao item
        this.props.handlePress ?
            this.props.handlePress(this.props.dataProd) : null;
    }
    //layout
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.fun_handlePress}>
                <View>
                    <Image source={{ uri: this.props.dataProd.search_image }}
                        style={styles.image} />
                    <Text>{this.props.dataProd.styleid}</Text>
                    <Text>{this.props.dataProd.brands_filter_facet}</Text>
                    <Text>{this.props.dataProd.price}</Text>
                    <Text>{this.props.dataProd.product_additional_info}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200, 
        height: 200, 
        borderWidth: 1,
    }
});