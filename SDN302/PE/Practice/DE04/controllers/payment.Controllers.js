const Payment = require('../models/payment');
const Appointment = require('../models/appointments');
const User = require('../models/users');

//4. Payment 
exports.payment = async (req, res, next) => {
    try {
        const { appointmentId, paymentMethod } = req.body;
        const customerId = req.user.id;

        if (!appointmentId) {
            return res.status(400).json({ status: 400, message: 'Please enter appointment that you want to pay' });
        }

        const user = await User.findById(customerId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' })
        }

        if (!paymentMethod) {
            return res.status(400).json({ status: 400, message: 'Please enter payment method that you want to pay' });
        }

        const appointment = await Appointment.findById(appointmentId)
            .populate('serviceId');
        if (!appointment) {
            return res.status(404).json({ status: 404, message: 'Appointment not found' });
        }

        if (appointment.status === 'rejected') {
            return res.status(400).json({ status: 400, message: 'Appointment has been rejected' });
        }

        if (appointment.paymentStatus === 'paid') {
            return res.status(400).json({ status: 400, message: 'Appointment has been paid' });
        }


        // Thanh toan 
        const paymentPrice = new Payment({
            customerId,
            appointmentId,
            paymentMethod,
            amount: appointment.serviceId.price
        });
        await paymentPrice.save();

        // Cap nhat trang thai da thanh toan cho lich hen
        appointment.paymentStatus = 'paid';
        await appointment.save();

        // Neu dat lich thanh cong, tru tien trong vi cua khach hang
        user.walletBalance -= appointment.serviceId.price;
        await user.save();

        res.status(200).json({ status: 200, message: 'Payment successfully' });

    } catch (error) {
        next(error);
    }
}