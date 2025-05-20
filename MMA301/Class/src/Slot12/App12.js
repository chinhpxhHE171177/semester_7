import React from "react";
import { View, Text } from "react-native";
import { Provider } from "react-redux";

import Store from "./store";
import ProductList from "./ListProduct";
import Cart from "./Cart";

// Can replace products by api
const products = [
    { id: 1, name: 'Product One' },
    { id: 2, name: 'Product Two' },
    { id: 3, name: 'Product Three' },
    { id: 4, name: 'Product Four' },
    { id: 5, name: 'Product Five' },
]

const App12 = () => {
    return (
        <Provider store={Store}>
            <View>
                <ProductList products={products} />
                <Cart />
            </View>
        </Provider>
    );
}

export default App12;