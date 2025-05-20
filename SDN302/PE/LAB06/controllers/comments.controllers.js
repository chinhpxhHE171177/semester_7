const Products = require('../models/products');
const Comments = require('../models/comments');
const Users = require('../models/users'); // Import model Users nếu có


//2. Create comments and update collection products
exports.createComment = async (req, res) => {
    try {
        const { productId, title, body, userId } = req.body;

        // Kiểm tra xem productId có hợp lệ không
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Tạo comment mới
        const newComment = new Comments({ title, body, user: userId });
        await newComment.save();

        // Thêm comment vào danh sách của sản phẩm
        await Products.findByIdAndUpdate(productId, {
            $push: { comments: newComment._id }
        });

        // Populate user để lấy đầy đủ thông tin
        const populatedComment = await Comments.findById(newComment._id).populate('user', '_id username');

        // Định dạng lại dữ liệu phản hồi
        const formattedComment = {
            title: populatedComment.title,
            body: populatedComment.body,
            user: {
                id: populatedComment.user._id,
                username: populatedComment.user.username
            },
            _id: populatedComment._id,
            createdAt: populatedComment.createdAt,
            updatedAt: populatedComment.updatedAt,
        };

        res.status(201).json({
            // message: 'Comment added successfully',
            //newComment: populatedComment,
            newComment: formattedComment,
            // productId
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
