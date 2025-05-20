const Products = require('../models/products');
const Images = require('../models/images');
const Comments = require('../models/comments');


//1. GET ALL PRODUCT with stock > 0
// If stock > 9 --> 'many products left' else stock < 9 --> 'little stock left'
// show total products 

// exports.getAllProducts = async (req, res) => {
//     try {
//         const products = await Products.find({ stock: { $gt: 0 } }) // Lọc stock > 0
//             .populate('images')
//             .populate('comments');

//         if (!products || products.length === 0) {
//             return res.status(404).json({ message: 'No products found' });
//         }

//         const formattedProducts = products.map(p => ({
//             _id: p._id,
//             name: p.name,
//             description: p.description,
//             stock: p.stock > 9 ? 'many products left' : 'little stock left',
//             images: p.images,
//         }));

//         res.status(200).json({
//             data: formattedProducts,
//             totalProduct: products.length
//         });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

exports.getAllProducts = async (req, res) => {
    try {
        // Lấy tất cả sản phẩm (bao gồm cả stock = 0)
        const allProducts = await Products.find()
            .populate('images', '_id url caption')
            .populate('comments');

        if (!allProducts || allProducts.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        // Lọc ra sản phẩm có stock > 0 để hiển thị
        const filteredProducts = allProducts.filter(p => p.stock > 0).map(p => ({
            _id: p._id,
            name: p.name,
            description: p.description,
            stock: p.stock > 9 ? 'many products left' : 'little stock left',
            images: p.images,
        }));

        res.status(200).json({
            data: filteredProducts,       // Chỉ chứa sản phẩm có stock > 0
            totalProduct: allProducts.length // Tổng số sản phẩm, bao gồm cả stock = 0
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// 6. Create new product (have check authentication)
exports.createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPercentage,
            stock,
            brand,
            thumbnail
        } = req.body;

        if (!name || !price || !stock || !brand || !thumbnail) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        const newProduct = new Products({
            name,
            description,
            price,
            discountPercentage,
            stock,
            brand,
            thumbnail
        });
        await newProduct.save();

        // const formattedProducts = {
        //     name: newProduct.name,
        //     description: newProduct.description,
        //     price: newProduct.price,
        //     discountPercentage: newProduct.discountPercentage,
        //     stock: newProduct.stock,
        //     brand: newProduct.brand,
        //     thumbnail: newProduct.thumbnail,
        //     comments: [],
        //     _id: newProduct._id,
        //     images: [],
        //     __v: newProduct._v
        // }

        res.status(201).json({
            message: 'Created product sucessfully',
            data: {
                name: newProduct.name,
                description: newProduct.description,
                price: newProduct.price,
                discountPercentage: newProduct.discountPercentage,
                stock: newProduct.stock,
                brand: newProduct.brand,
                thumbnail: newProduct.thumbnail,
                comments: [],
                _id: newProduct._id,
                images: [],
                __v: newProduct.__v
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
