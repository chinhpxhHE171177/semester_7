import { React } from 'react';
import { Text, View, TouchableOpacity, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';

export default class Products extends React.Component {
    //code 
    constructor() {
        super();
        this.props = {
            dataProd: {},
            handlePress: null,
        };
        this.func_handlePress = this.func_handlePress.bind(this); // dang ky ham 
    }
    func_handlePress() { // ham xu ly skien khi user press
        if (this.props.handlePress) {
            this.props.handlePress(this.props.dataProd);
        }
    }
    //layout 
    render() {
        return (
            <TouchableWithoutFeedback on onPress={this.func_handlePress}>
                <View>
                    <Image source={{ uri: this.props.dataProd.search_image }} />
                    <Text>{this.props.dataProd.styleid}</Text>
                    <Text>{this.props.dataProd.brands_filter_facet}</Text>
                    <Text>{this.props.dataProd.price}</Text>
                    <Text>{this.props.dataProd.product_additional_info}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 200,
        height: 200,
        borderWidth: 1
    }
})