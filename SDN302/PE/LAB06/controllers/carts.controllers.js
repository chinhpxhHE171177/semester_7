const Carts = require('../models/carts');
const Products = require('../models/products');
const Users = require('../models/users');

// Create cart and after buy product (get product in cart) - includes 2 api
// 3.1 Create cart
exports.createCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Kiem tra userId co ton tai khong
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Kiểm tra nếu user đã có giỏ hàng
        const existingCart = await Carts.findOne({ user: userId });
        if (existingCart) {
            return res.status(200).json({ message: "Cart already exists", cart: existingCart });
        }

        // create new cart 
        const newCart = new Carts({
            discountTotal: 0,
            totalProduct: 0,
            totalQuantity: 0,
            totalPrice: 0,
            user: userId,
            products: []
        });
        await newCart.save();

        // Formatted cart when added
        const formattedCart = {
            discountTotal: newCart.discountTotal,
            totalProduct: newCart.totalProduct,
            totalQuantity: newCart.totalQuantity,
            totalPrice: newCart.totalPrice,
            user: newCart.user,
            _id: newCart._id,
            products: newCart.products,
            __v: 0,
        }

        res.status(201).json({
            newCart: formattedCart
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//3.2 BUY Product (put in cart)
exports.addToCart = async (req, res) => {
    try {
        const { productId, cartId, quantity } = req.body;

        // Kiểm tra giỏ hàng có tồn tại không
        const cart = await Carts.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: "Cart is not existed" });
        }

        // Kiểm tra sản phẩm có tồn tại không
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Kiểm tra số lượng sản phẩm có đủ không
        if (product.stock < quantity) {
            return res.status(400).json({
                message: `Product don't have enough ${quantity} product. Current stock now: ${product.stock}`
            });
        }

        // Cập nhật thông tin sản phẩm trong giỏ hàng
        const existingProductIndex = cart.products.findIndex(p => p.id.toString() === productId);

        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
            cart.products[existingProductIndex].quantity += quantity;
            cart.products[existingProductIndex].total =
                cart.products[existingProductIndex].quantity *
                (product.price * (1 - product.discountPercentage / 100));
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
            cart.products.push({
                _id: product._id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                discountPercentage: product.discountPercentage,
                total: quantity * (product.price * (1 - product.discountPercentage / 100))
            });
        }

        // Cập nhật tổng giá trị giỏ hàng
        cart.totalQuantity += quantity;
        cart.totalProduct = cart.products.length;
        // cart.totalPrice = cart.products.reduce((sum, p) => sum + p.total, 0);
        // cart.discountTotal = cart.products.reduce((sum, p) => sum + (p.price * p.quantity * (p.discountPercentage / 100)), 0);
        // Tính tổng số tiền trong giỏ hàng
        cart.totalPrice = parseFloat(cart.products.reduce((sum, p) => sum + p.total, 0).toFixed(4));

        // Tính tổng giảm giá
        cart.discountTotal = parseFloat(cart.products.reduce((sum, p) => sum + (p.price * p.quantity * (p.discountPercentage / 100)), 0).toFixed(4));

        // cart.products.forEach(product => {
        //     product.total = parseFloat((product.quantity * (product.price * (1 - product.discountPercentage / 100))).toFixed(4));
        // });

        // Giảm số lượng sản phẩm trong kho
        product.stock -= quantity;
        await product.save();
        await cart.save();

        res.status(200).json({
            message: {
                cart: {
                    _id: cart._id,
                    discountTotal: cart.discountTotal,
                    totalProduct: cart.totalProduct,
                    totalQuantity: cart.totalQuantity,
                    totalPrice: cart.totalPrice,
                    user: cart.user,
                    products: cart.products,
                    __v: cart.__v,
                },
                stock: product.stock,
                message: "Successfully!"
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//7. Get alls carts of an account (have check authentication)
exports.getAllCarts = async (req, res) => {
    try {
        const userId = req.user._id; // Lấy user ID từ token

        // Tìm tất cả carts của user
        const carts = await Carts.find({ user: userId })
            .populate("products._id", "name price quantity discountPercentage total thumbnail") // Populate sản phẩm
            .populate("user", "_id username email"); // Populate user (nếu cần thông tin)

        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: "❌ No carts found for this user" });
        }

        // Định dạng lại dữ liệu trả về
        const formattedCarts = carts.map(cart => ({
            _id: cart._id,
            discountTotal: cart.discountTotal,
            totalProduct: cart.totalProduct,
            totalQuantity: cart.totalQuantity, // Sửa lỗi chính tả
            totalPrice: cart.totalPrice,
            // user: {
            //     _id: cart.user._id,
            //     username: cart.user.username,
            //     email: cart.user.email
            // },
            user: cart.user._id,
            products: cart.products.map(product => ({
                _id: product._id._id,
                name: product._id.name,
                price: product._id.price,
                quantity: product.quantity,
                discountPercentage: product._id.discountPercentage,
                total: product.total,
                thumbnail: product._id.thumbnail || null
            })),
            __v: cart.__v
        }));

        res.status(200).json({
            message: "Success",
            data: formattedCarts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

