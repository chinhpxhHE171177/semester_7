import React from "react";
import { FlatList } from "react-native";
import ProductItem from "./ProductItem";
export default class ProductList extends React.Component {
    //code
    constructor() {
        super();
        this.state = {
            prd: null,
        };
        this.handlePressDetail = this.handlePressDetail.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.renderItemFlatlist = this.renderItemFlatlist.bind(this);
    }
    renderItemFlatlist({ item }) {
        //ket xuat du lieu item
        return (
            <ProductItem dataProd={item} handlePress={this.handlePressDetail} />
        );
    }
    handlePressDetail() {//ham click vao item
        this.props.navigation.navigate('Detail', { data: this.prd });
    }
    //ham doc du lueu tu api
    async getProducts() {
        const url = 'https://hungnttg.github.io/shopgiay.json';
        const response = await fetch(url, { method: 'GET' });//doc du lieu tu API
        const responseJSON = await response.json();//chuyen sang json
        //cap nhat du lieu vao prd
        this.setState({
            prd: responseJSON.products,
        });
    }
    componentDidMount() {
        //ham goi tu dong khi render
        this.getProducts();
    }
    //layout
    render() {
        return (
            <FlatList
                data={this.state.prd}
                numColumns={3}
                renderItem={this.renderItemFlatlist}
                removeClippedSubviews
            />
        );
    }
}