const mongoose = require('mongoose');
const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');
const Inventory = require('../models/inventory');


// 2. API Đặt hàng
// Yêu cầu đặc biệt:

// Kiểm tra số dư tài khoản người dùng có đủ để mua không.
// Kiểm tra kho hàng còn đủ sản phẩm không.
// Nếu đủ điều kiện, trừ số dư tài khoản và giảm số lượng sản phẩm trong kho.
// Nếu bất kỳ bước nào thất bại, phục hồi dữ liệu (rollback transaction).
exports.createOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { products } = req.body;

        // Kiểm tra người dùng có tồn tại không
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        // Tính tổng giá trị đơn hàng
        let totalPrice = 0;
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ status: 404, message: `Product not found ${item.productId}` });
            }
            totalPrice += product.price * item.quantity;
        }

        // Kiểm tra số dư tài khoản user
        if (user.balance < totalPrice) {
            return res.status(400).json({
                status: 'error',
                message: 'Insufficient balance',
                required: totalPrice,
                available: user.balance
            });
        }

        // Kiểm tra kho hàng
        for (const item of products) {
            const inventory = await Inventory.findOne({ productId: item.productId });
            if (!inventory || inventory.stock < item.quantity) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Out of stock',
                    productId: item.productId,
                    requestedQuantity: item.quantity,
                    availableStock: inventory ? inventory.stock : 0
                });
            }
        }

        // Cập nhật số dư user
        user.balance -= totalPrice;
        await user.save();

        // Cập nhật tồn kho
        for (const item of products) {
            await Inventory.updateOne(
                { productId: item.productId },
                { $inc: { stock: -item.quantity } }
            );
        }

        // Tạo đơn hàng mới
        const order = new Order({
            userId,
            products,
            totalPrice,
            paymentStatus: 'unpaid'
        });
        await order.save();

        return res.status(201).json({
            status: 'success',
            message: 'Order placed successfully',
            orderId: order._id,
            deductedBalance: totalPrice,
            remainingBalance: user.balance
        });

    } catch (error) {
        next(error);
    }
};



// Thanh toan hoa don
// Chi cho phep thanh toan hoa don neu don hang co trang thai la pending 
// Khi thanh toan TC --> status: completed 
exports.paymentStatus = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { orderId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found!' });
        }

        const order = await Order.findById(orderId);
        if (order.userId.toString() !== userId) {
            return res.status(404).json({ status: 404, message: 'The order is not your' });
        }

        if (order._id.toString() !== orderId) {
            return res.status(404).json({ status: 404, message: `Cannot find the order with id ${orderId}` });
        }

        if (order.status === 'completed') {
            return res.status(404).json({ status: 404, message: `Cannot payment the order when it completed!` });
        }

        order.status = 'completed';
        await order.save();

        res.status(200).json({
            status: 'success',
            message: 'Payment successfully!',
            orderId: order._id,
            newStatus: order.status
        });

    } catch (error) {
        next(error);
    }
}
