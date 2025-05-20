const Service = require('../models/services');
const User = require('../models/users');

// 2. Create a new service
// Require: 
// - Only Service Provider can create a new service 
// - Check data validation
exports.createService = async (req, res, next) => {
    try {
        const {name, description, price, duration} = req.body;
        const providerId = req.user.id;

        // Check is the user a provider
        const user = await User.findById(providerId);
        if (!user || user.role !== 'provider') {
            return res.status(403).json({ status: 403, message: 'Only provider can create a service' });
        }

        // Chech data validation
        if (!name || !price || !duration) {
            return res.status(400).json({ status: 400, message: 'Name, price, and duration are required' });
        }

        // create new service 
        const newService = new Service({
            name,
            description,
            price,
            providerId,
            duration
        });

        await newService.save();
        res.status(201).json({
            status: 'success',
            messgae: 'Service created successfully',
            service: newService
        });
    } catch (error) {
        next(error);
    }
}