const Inventory = require('../models/inventory');
const Product = require('../models/product');
const User = require('../models/user');


exports.addNewInventory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId, stock, address } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found!' });
        }

        // Kiem tra co phai la admin khong 
        if (user.role !== 'admin') {
            return res.status(403).json({ status: 403, message: 'Permission denied' });
        }

        if (!productId || !stock) {
            return res.status(400).json({ status: 400, message: 'Please filled all fileds' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: 404, message: 'Product not found' });
        }

        const inventory = await Inventory.findOne({ productId });
        if (inventory) {
            return res.status(400).json({ message: 'This product have created inventory!' })
        }

        const newInventory = new Inventory({ productId, stock, address });
        await newInventory.save();

        res.status(200).json({
            status: 'success',
            message: 'Add new inentory successfully!',
            newInventory
        });
    } catch (error) {
        next(error);
    }
}




// xports.addNewInventory = async (req, res, next) => {
//     try {
//         const userId = req.user.id;
//         const { productId, stock, address } = req.body;

//         if (!productId || !stock || stock < 0) {
//             throw new Error('Please provide a valid productId and positive stock value.');
//         }

//         const user = await User.findById(userId);
//         if (!user) {
//             throw new Error('User not found!');
//         }

//         if (user.role !== 'admin') {
//             throw new Error('Permission denied');
//         }

//         const product = await Product.findById(productId);
//         if (!product) {
//             throw new Error('Product not found');
//         }

//         let inventory = await Inventory.findOne({ productId });
//         if (inventory) {
//             // In ra giá trị cũ trước khi cập nhật (debug)
//             console.log(`Before update: ${inventory.stock}, Adding: ${stock}`);

//             // Chỉ cập nhật stock nếu stock hợp lệ
//             inventory.stock = Number(inventory.stock) + Number(stock);
//             inventory.address = address; // Cập nhật địa chỉ nếu có
//             await inventory.save();

//             // In ra giá trị sau khi cập nhật (debug)
//             console.log(`After update: ${inventory.stock}`);
//         } else {
//             inventory = new Inventory({ productId, stock, address });
//             await inventory.save();
//         }
//         res.status(200).json({
//             status: 'success',
//             message: 'Added new inventory successfully!',
//             inventory,
//         });
//     } catch (error) {
//         next(error);
//     }
// }