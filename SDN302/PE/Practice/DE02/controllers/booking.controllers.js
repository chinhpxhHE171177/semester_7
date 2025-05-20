const Booking = require('../models/booking');
const User = require('../models/users');
const Room = require('../models/rooms');

//3.1 Booking room
exports.bookingRoom = async (req, res, next) => {
    try {
        const { roomId, startDate, endDate } = req.body;
        const userId = req.user.id;


        if (!roomId || !startDate || !endDate) {
            return res.status(400).json({ status: 400, message: 'Please provide all required fields' })
        }

        // Kiem tra phong co ton tai khong 
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ status: 404, message: 'Room not found' });
        }

        // Kiểm tra phòng có bị đặt trong khoảng thời gian đó không
        const existingBooking = await Booking.findOne({
            roomId,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'Room is already booked in this time range' });
        }

        // Tính tổng giá tiền
        const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
        const totalPrice = totalDays * room.price;

        // Tạo booking mới
        const newBooking = new Booking({
            userId,
            roomId,
            startDate,
            endDate,
            totalPrice
        });

        await newBooking.save();

        res.status(201).json({
            status: 201,
            message: 'Booking created successfully!',
            booking: newBooking
        });

    } catch (error) {
        next(error);
    }
}

//3.2 Lấy danh sách booking (Admin/User)
exports.getBookings = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;

        let query = {};

        // Nếu user là admin, lấy tất cả booking
        if (role !== 'admin') {
            query.userId = userId; // User thường chỉ lấy booking của họ
        }

        const bookings = await Booking.find(query)
            .populate('roomId', 'roomNumber type price')
            .populate('userId', 'name email')

        if (bookings.length === 0) {
            return res.status(404).json({ status: 404, message: 'You have not booked any room yet' });
        }

        const formattedBookings = bookings.map(booking => ({
            id: booking._id,
            customer: {
                id: booking.userId._id,
                name: booking.userId.name,
                email: booking.userId.email
            },
            room: {
                roomNumber: booking.roomId.roomNumber,
                type: booking.roomId.type,
                price: booking.roomId.price
            },
            startDate: booking.startDate,
            endDate: booking.endDate,
            totalPrice: booking.totalPrice,
            status: booking.status
        }));

        res.status(200).json({
            message: 'Bookings fetched successfully!',
            // bookings
            formattedBookings
        });

    } catch (error) {
        next(error);
    }
};


//3.3 Cancelled booking 
exports.cancelBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Lay la booking theo id 
        const booking = await Booking.findById(id)
            .populate('roomId');
        if (!booking) {
            return res.status(404).json({ status: 404, message: 'Booking not found!' });
        }

        // // Kiểm tra quyền hủy: Admin hoặc chính user đã đặt
        if (booking.userId.toString() !== userId && req.user.role !== 'admin') {
            return res.status(400).json({ status: 400, message: 'You do not have permission to cancel this booking' });
        }

        // kiem tra neu booking da confirmed thi khong the huy
        if (booking.status === 'confirmed') {
            return res.status(400).json({ status: 400, message: 'You cannot cancel the confirmed booking!' });
        }
        if (booking.status === 'cancelled') {
            return res.status(400).json({ status: 400, message: 'This reservation schedule has been canceled!' });
        }

        // update status to cancelled booking 
        booking.status = 'cancelled';
        await booking.save();

        // Nếu booking bị hủy, đổi trạng thái phòng thành "available"
        if (booking.status = 'cancelled') {
            booking.roomId.status = 'available';
            await booking.roomId.save();
        }

        res.status(200).json({
            message: 'Booking cancelled successfully!',
            booking: {
                _id: booking._id,
                status: booking.status
            }
        });

    } catch (error) {
        next(error);
    }
}

// Admin xác nhận hoặc từ chối đặt phòng
exports.confirmBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body; // 'confirmed' hoặc 'cancelled'
        const role = req.user.role;

        // Kiểm tra quyền admin
        if (role !== 'admin') {
            return res.status(403).json({ status: 403, message: 'Only admins can confirm bookings' });
        }

        // Tìm booking theo ID
        const booking = await Booking.findById(bookingId).populate('roomId');

        if (!booking) {
            return res.status(404).json({ status: 404, message: 'Booking not found' });
        }

        // Kiểm tra trạng thái hợp lệ
        if (!['confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({ status: 400, message: 'Invalid status. Use "confirmed" or "cancelled".' });
        }

        // Cập nhật trạng thái booking
        booking.status = status;
        await booking.save();

        // Nếu booking được xác nhận, đổi trạng thái phòng thành "booked"
        if (status === 'confirmed') {
            booking.roomId.status = 'booked';
            await booking.roomId.save();
        }

        // Nếu booking bị hủy, đổi trạng thái phòng thành "available"
        if (status === 'cancelled') {
            booking.roomId.status = 'available';
            await booking.roomId.save();
        }

        res.status(200).json({
            message: `Booking has been ${status} successfully`,
            booking: {
                id: booking._id,
                customer: booking.userId,
                room: {
                    id: booking.roomId._id,
                    roomNumber: booking.roomId.roomNumber,
                    type: booking.roomId.type,
                    price: booking.roomId.price,
                    status: booking.roomId.status
                },
                startDate: booking.startDate,
                endDate: booking.endDate,
                totalPrice: booking.totalPrice,
                status: booking.status
            }
        });

    } catch (error) {
        res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
};
