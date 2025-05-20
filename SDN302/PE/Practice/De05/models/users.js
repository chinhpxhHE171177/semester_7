const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullname: { type: String },
    username: { type: String, required: [true, 'User name is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    phone: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    address: { type: String },
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
    personalInfo: {
        bio: { type: String },
        profileImage: { type: String },
        socialLinks: [
            {
                url: { type: String, default: '' }
            }
        ],
    },
    enrolledCourses: [
        {
            courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
            progress: { type: Number, min: 0, max: 100 },
            status: { type: String, enum: ['learning', 'completed', 'cancelled'] }
        }
    ]
}, { timestamps: true, collection: 'users' });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('user', userSchema);