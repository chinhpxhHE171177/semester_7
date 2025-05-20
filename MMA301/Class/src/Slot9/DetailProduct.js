import { React } from 'react';
import { ScrollView, Button } from 'react-native';
import Products from './Products';
export default class DetailProduct extends React.Component {
    //code 
    constructor() {
        super();
        
    }
    //layout 
    render() {
        return (
            <ScrollView>
                <Products dataProd={this.state.prd} />
                <Button title='Add to cart' onPress={() => this.addToCart} />
            </ScrollView>
        )
    }
}