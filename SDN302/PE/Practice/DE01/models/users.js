// modles/users.js
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullname:
    {
        type: String,
        required: [true, 'Fullname is required']
    },
    email:
    {
        type: String,
        required: [true, 'Email is required'],
        unique: true, trim: true, match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password:
    {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters long"],
        validate: {
            validator: function (value) {
                return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            },
            message: "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
        }
    },
    role:
    {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        default: 'student',
    }
}, { timestamps: true, collection: 'users' });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('user', userSchema);

