const Appointment = require('../models/appointments');
const User = require('../models/users');
const Service = require('../models/services');
const appointments = require('../models/appointments');

//3. Create a new appointment
// Require: 
// - Kiem tra khach hang co du so du trong vi khong 
// - Kiem tra khung gio co trong khong 
// - Neu dat lich thanh cong, tru tien tu vi cua khach hang
exports.createAppointment = async (req, res, next) => {
    try {
        const { serviceId, appointmentTime } = req.body;
        const customerId = req.user.id;

        if (!serviceId || !appointmentTime) {
            return res.status(400).json({ status: 400, message: 'Service ID and appointment time are required' });
        }

        const service = await Service.findById(serviceId)
            .populate('providerId');
        if (!service) {
            return res.status(404).json({ status: 404, message: 'Serivce not found' })
        }

        const user = await User.findById(customerId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' })
        }

        // Kiem tra khach hang co du so du
        if (user.walletBalance < service.price) {
            return res.status(400).json({ status: 400, message: 'Not enough balance' });
        }

        const startTime = new Date(appointmentTime);
        const endTime = new Date(startTime.getTime() + service.duration * 60000); // Tính thời gian kết thúc (60000 ms = 1 phut)

        // C1: Chi kiem tra bi trung ngay 
        // const appointment = await Appointment.findOne({ appointmentTime });
        // if (appointment) {
        //     return res.status(400).json({ status: 400, message: 'Appointment time is not available' });
        // }

        // C2: kiem tra trung thoi gian va khoang duration trong ngay do
        // Kiểm tra trùng lịch
        const overlappingAppointment = await Appointment.findOne({
            serviceId,
            $or: [
                {
                    appointmentTime: {
                        $lt: endTime,  // Lịch đã có bắt đầu trước khi cuộc hẹn mới kết thúc
                        $gte: startTime // Lịch đã có kết thúc sau khi cuộc hẹn mới bắt đầu
                    }
                },
                {
                    appointmentTime: {
                        $lte: startTime  // Lịch đã có bắt đầu trước khi cuộc hẹn mới bắt đầu
                    },
                    $expr: { $gte: [{ $add: ["$appointmentTime", service.duration * 60000] }, startTime] } // Lịch đã có vẫn đang diễn ra tại thời điểm startTime
                }
            ]
        });


        if (overlappingAppointment) {
            return res.status(400).json({ status: 400, message: 'Appointment time overlaps with an existing booking' });
        }

        // Tao lich hen moi
        const newAppointment = new Appointment({
            customerId,
            serviceId,
            providerId: service.providerId,
            appointmentTime
        });
        await newAppointment.save();

        // Neu dat lich thanh cong, tru tien trong vi cua khach hang
        user.walletBalance -= service.price;
        await user.save();

        const formattedAppointment = {
            customer: user.name,
            service: service.name,
            provider: service.providerId.name,
            appointmentTime: newAppointment.appointmentTime,
            status: newAppointment.status,
            paymentStatus: newAppointment.paymentStatus
        }

        res.status(201).json({
            status: 'success',
            message: 'Appointment created successfully',
            data: formattedAppointment
        });

    } catch (error) {
        next(error);
    }
}