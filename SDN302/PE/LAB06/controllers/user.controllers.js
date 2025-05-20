const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

// Hàm kiểm tra email hợp lệ
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Hàm kiểm tra mật khẩu với từng điều kiện cụ thể
const validatePassword = (password) => {
    if (password.length < 8) {
        return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
        return "Password must contain at least one number.";
    }
    if (!/[@$!%*?&]/.test(password)) {
        return "Password must contain at least one special character (@$!%*?&).";
    }
    return null; // Nếu mật khẩu hợp lệ
};

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Kiểm tra nếu thiếu thông tin
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Kiểm tra email hợp lệ
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Kiểm tra từng điều kiện của mật khẩu
        const passwordError = validatePassword(password);
        if (passwordError) {
            return res.status(400).json({ message: passwordError });
        }

        // Kiểm tra email đã tồn tại
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password trước khi lưu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo user mới
        const newUser = new Users({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Created successfully",
            data: {
                username: newUser.username,
                password: 'Not Show',
                email: newUser.email,
                _id: newUser._id,
                __v: newUser.__v
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//5. Login use 2 libralies bcrypt (to compare password hashed), jsonwebtoken to get token
exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Tìm user theo email
        const user = await Users.findOne({ email });

        if (!user) return res.status(404).json({ message: '❌ User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: '🔒 Invalid password' });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //res.json({ message: '✅ Login successful', token, user: { _id: user._id, username: user.username, avatar: user.avatar } });
        res.status(200).json({
            id: user._id,
            name: user.username,
            email: user.email,
            accessToken: token
        });
    } catch (err) {
        res.status(500).json({ message: '🚫 Login failed' });
    }
};