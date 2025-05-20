const Room = require('../models/rooms');
const User = require('../models/users');

//2.1 List all rooms
exports.getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();

        if (!rooms) {
            res.status(404).json({ message: 'Room not found!' });
        }

        res.status(200).json({
            status: 'success',
            data: rooms
        });
    } catch (error) {
        next(error);
    }
}

//2.2 Add new room (admin)
exports.addNewRoom = async (req, res, next) => {
    try {
        const { roomNumber, type, price, status } = req.body;
        const userId = req.user.id;


        // Kiem tra tai khoan co phai la admin hay khong
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can be add new room' });
        }

        // Kiem tra so thu tu phong khong duoc de trung
        const room = await Room.findOne({ roomNumber });
        if (room) {
            return res.status(404).json({ message: 'Room already exists' });
        }

        const newRoom = new Room({ roomNumber, type, price, status });
        const result = await newRoom.save();

        res.status(201).json({
            message: 'Add new room successfully!',
            result
        });
    } catch (error) {
        next(error);
    }
}

//2.3 Lay danh sach phong (co loc theo gia va trang thai)
// exports.getRooms = async (req, res, next) => {
//     try {
//         let {status, minPrice, maxPrice} = req.query;

//         // Tao object query de loc du lieu 
//         let filter = {};

//         // Loc theo trang thai phong (available, booked)
//         if (status) {
//             filter.status = status;
//         }

//         // Loc theo khoang gia (minPrice - maxPrice)
//         if (minPrice || maxPrice) {
//             filter.price = {};
//             if (minPrice) filter.price.$gte = Number(minPrice)
//             if (maxPrice) filter.price.$lte = Number(minPrice)
//         }

//         // Truy van mongodb
//         const rooms = await Room.find(filter);

//         res.status(200).json({
//             message: 'List of rooms retrieved successfully!',
//             total: rooms.length,
//             rooms
//         });
//     } catch (error) {
//         next(error);
//     }
// }

// 2.3 Get all rooms (with filter)
exports.getRooms = async (req, res, next) => {
    try {
        let { status, minPrice, maxPrice, priceGt, priceGte, priceLt, priceLte } = req.query;

        let filter = {};

        // Lọc theo trạng thái phòng (available, booked)
        if (status) {
            filter.status = status;
        }

        // Lọc giá với nhiều tùy chọn hơn
        if (minPrice || maxPrice || priceGt || priceGte || priceLt || priceLte) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);  // Giá >= minPrice
            if (maxPrice) filter.price.$lte = Number(maxPrice);  // Giá <= maxPrice
            if (priceGt) filter.price.$gt = Number(priceGt);     // Giá > priceGt
            if (priceGte) filter.price.$gte = Number(priceGte);  // Giá >= priceGte
            if (priceLt) filter.price.$lt = Number(priceLt);     // Giá < priceLt
            if (priceLte) filter.price.$lte = Number(priceLte);  // Giá <= priceLte
        }

        // Truy vấn MongoDB
        const rooms = await Room.find(filter);

        res.status(200).json({
            message: 'List of rooms retrieved successfully!',
            total: rooms.length,
            rooms
        });
    } catch (error) {
        next(error);
    }
};


//2.4 Update room (admin)
exports.updateRoom = async (req, res, next) => {
    try {
        const { price, status } = req.body;
        const { id } = req.params;
        const userId = req.user.id;

        // Kiem tra tai khoan co phai la admin hay khong
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ status: 403, message: 'Only admins can be add new room' });
        }

        // Kiểm tra dữ liệu đầu vào
        if (price === undefined || price < 0 || !status) {
            return res.status(400).json({ message: 'Please provide a valid price and status' });
        }

        const room = await Room.findById(id);

        if (!room) {
            return res.status(404).json({ message: 'Room not found!' });
        }

        // Cap nhat thong tin phong 
        room.price = price;
        room.status = status;

        await room.save();

        res.status(200).json({
            status: '200',
            message: 'Room updated successfully!',
            room: {
                _id: room._id,
                roomNumber: room.roomNumber,
                type: room.type,
                price: room.price,
                status: room.status
            }
        });

    } catch (error) {
        next(error);
    }
}

//2.5 Delete room (admin)
exports.deleteRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Kiem tra tai khoan co phai la admin hay khong
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found!' })
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ status: 403, message: 'Only admins can be delete this room' });
        }

        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ status: 404, message: 'Room not found!' });
        }

        await Room.deleteOne(room);

        res.status(200).json({
            status: 200,
            message: 'Room deleted successfully!'
        });
    } catch (error) {
        next(error);
    }
}