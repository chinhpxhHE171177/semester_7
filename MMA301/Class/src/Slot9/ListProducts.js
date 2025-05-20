import React from "react";
import { FlatList } from "react-native";
import Products from "./Products";
export default class ListProducts extends React.Component {
    //code 
    constructor() {
        super();
        this.state = {
            prd: null,
        }
        this.fun_renderItemFlatlist = this.fun_renderItemFlatlist.bind(this);
        this.viewDetail = this.viewDetail.bind(this);
        this.getProducts = this.getProducts.bind(this);
    }
    fun_renderItemFlatlist(item) {
        return (
            <Products dataProd={item} handlePress={() => this.viewDetail({ id: item })} />
        );
    }
    viewDetail({ d }) {
        this.props.navigation.navigate('DetailProduct', { data: d });
    }

    // GET ALL PRODUCTS
    async getProducts() {
        const url = "https://hungnttg.github.io/shopgiay.json";
        const response = await fetch(url);
        const responseJSON = await response.json();
        // set state 
        this.setState({
            prd: responseJSON.products,
        });
    }

    componentDidMount() {
        this.getProducts(); // call api automatically 
    }
    //layout 
    render() {
        return (
            <FlatList
                data={this.state.prd}
                renderItem={this.fun_renderItemFlatlist}
                numColumns={3}
                removeClippedSubviews
            />
        )
    }
}
