const mongoose = require('mongoose');
const Movie = require('../models/movie');
const Producer = require('../models/producer');
const Director = require('../models/director');
const Star = require('../models/star');

//1.1 Create new movie 
exports.createMovie = async (req, res) => {
    try {
        const { title, release, description, producer, director, genres, stars } = req.body;

        if (!title || !release || !producer || !director || stars.length === 0) {
            res.status(400).json({ message: "Missing required fields" });
        }

        // create a new movie 
        const newMovie = await Movie.create({
            title,
            release,
            description,
            producer,
            director,
            genres,
            stars
        });

        return res.status(201).json(newMovie);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// 1.1 Create new movie with validation
// exports.createMovieWithValidation = async (req, res) => {
//     try {
//         const { title, release, description, producer, director, genres, stars } = req.body;

//         // Kiểm tra các trường bắt buộc
//         if (!title || !release || !description || !producer || !director || !Array.isArray(stars) || stars.length === 0) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         // Kiểm tra ngày release hợp lệ và không được là ngày trong tương lai
//         const releaseDate = new Date(release);
//         const today = new Date();
//         today.setHours(0, 0, 0, 0); // Đặt thời gian về 00:00 để so sánh chính xác

//         if (isNaN(releaseDate.getTime())) {
//             return res.status(400).json({ message: "Invalid release date" });
//         }
//         if (releaseDate > today) {
//             return res.status(400).json({ message: "Release date cannot be in the future" });
//         }

//         // Kiểm tra producer tồn tại không
//         const existingProducer = await Producer.findById(producer);
//         if (!existingProducer) {
//             return res.status(400).json({ message: `Producer with ID ${producer} does not exist` });
//         }

//         // Kiểm tra director tồn tại không
//         const existingDirector = await Director.findById(director);
//         if (!existingDirector) {
//             return res.status(400).json({ message: `Director with ID ${director} does not exist` });
//         }

//         // Kiểm tra tất cả các stars có tồn tại không
//         const existingStars = await Star.find({ _id: { $in: stars } });
//         if (existingStars.length !== stars.length) {
//             return res.status(400).json({ message: "One or more stars do not exist" });
//         }

//         // Tạo một bộ phim mới sau khi đã validate
//         const newMovie = await Movie.create({
//             title,
//             release: releaseDate,
//             description,
//             producer,
//             director,
//             genres,
//             stars
//         });

//         return res.status(201).json({ success: true, data: newMovie });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

exports.createMovieWithValidation = async (req, res) => {
    try {
        const { title, release, description, producer, director, genres, stars } = req.body;
        let errors = [];

        // Kiểm tra các trường bắt buộc
        if (!title) errors.push("Title is required");
        if (!release) errors.push("Release date is required");
        if (!description) errors.push("Description is required");
        if (!producer) errors.push("Producer ID is required");
        if (!director) errors.push("Director ID is required");
        if (!Array.isArray(stars) || stars.length === 0) errors.push("At least one star ID is required");

        // Nếu có lỗi thiếu trường, trả về luôn
        if (errors.length > 0) {
            return res.status(400).json({ message: "Validation failed", errors });
        }

        // Kiểm tra ngày release hợp lệ và không được là ngày trong tương lai
        const releaseDate = new Date(release);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Đặt thời gian về 00:00 để so sánh chính xác

        if (isNaN(releaseDate.getTime())) {
            errors.push("Invalid release date");
        } else if (releaseDate > today) {
            errors.push("Release date cannot be in the future");
        }

        // Kiểm tra producer, director, stars có phải là ObjectId hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(producer)) errors.push(`Invalid producer ID: ${producer}`);
        if (!mongoose.Types.ObjectId.isValid(director)) errors.push(`Invalid director ID: ${director}`);
        stars.forEach(starId => {
            if (!mongoose.Types.ObjectId.isValid(starId)) {
                errors.push(`Invalid star ID: ${starId}`);
            }
        });

        // Nếu có lỗi ObjectId, trả về luôn
        if (errors.length > 0) {
            return res.status(400).json({ message: "Validation failed", errors });
        }

        // Kiểm tra sự tồn tại của producer, director, stars trong database
        const existingProducer = await Producer.findById(producer);
        if (!existingProducer) errors.push(`Producer with ID ${producer} does not exist`);

        const existingDirector = await Director.findById(director);
        if (!existingDirector) errors.push(`Director with ID ${director} does not exist`);

        const existingStars = await Star.find({ _id: { $in: stars } });
        if (existingStars.length !== stars.length) {
            errors.push("One or more stars do not exist");
        }

        // Nếu có lỗi tồn tại, trả về luôn
        if (errors.length > 0) {
            return res.status(400).json({ message: "Validation failed", errors });
        }

        // Tạo một bộ phim mới sau khi đã validate
        const newMovie = await Movie.create({
            title,
            release: releaseDate,
            description,
            producer,
            director,
            genres,
            stars
        });

        return res.status(201).json({ success: true, data: newMovie });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//1.2 Get All Movies 
exports.getAllMovie = async (req, res) => {
    try {
        const movies = await Movie.find()
            .populate('producer')
            .populate({
                path: 'director',
                select: 'fullname dob nationality' // Chỉ lấy những trường cần thiết
            }) // one-to-one --> return one object 
            .populate('stars') // one-to-many --> return arrays object --> map()

        if (movies.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No data'
            });
        };

        // C1: Định dạng lại release date
        // const formattedMovies = movies.map(movie => ({
        //     ...movie._doc,
        //     release: movie.release.toISOString().split('T')[0] // Định dạng YYYY-MM-DD
        //     // Hoặc dùng: new Date(movie.release).toLocaleDateString('vi-VN') nếu muốn kiểu dd/mm/yyyy
        // }));

        // C2: Hàm định dạng ngày theo dd/MM/yyyy
        const formatDate = (date) => {
            const d = new Date(date);
            const day = d.getDate().toString().padStart(2, '0'); // Lấy ngày, thêm '0' nếu nhỏ hơn 10
            const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng (tính từ 0 nên +1)
            const year = d.getFullYear(); // Lấy năm
            return `${day}/${month}/${year}`; // Trả về chuỗi định dạng dd/MM/yyyy
        };

        // Định dạng lại release (movie) và dob (director)
        const formattedMovies = movies.map(movie => ({
            ...movie._doc,
            release: formatDate(movie.release), // Định dạng release
            director: {
                ...movie.director._doc,
                dob: formatDate(movie.director.dob) // Định dạng dob của director
            },
            stars: movie.stars.map(star => ({
                ...star._doc,
                dob: formatDate(star.dob) // Định dạng ngày sinh của từng diễn viên
            }))
        }));

        //return res.status(200).json(movies);
        return res.status(200).json(formattedMovies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//1.3 Get stars by movie id
exports.getStarsByMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id).populate({
            path: 'stars',
            select: '-createdAt -updatedAt'
        });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        return res.status(200).json(movie.stars);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// 1.4 Get All Movies (with genre filter)
exports.getAllMovieWithGenre = async (req, res) => {
    try {
        const { genre } = req.query; // Lấy genre từ query parameter

        // Tạo điều kiện tìm kiếm
        let query = {};
        if (genre) {
            query.genres = genre; // Lọc theo thể loại
        }

        // Tìm phim theo query, populate thông tin liên quan
        const movies = await Movie.find(query)
            .populate('producer')
            .populate('director')
            .populate('stars');

        // Kiểm tra nếu không có phim nào
        if (movies.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No movies found'
            });
        }

        return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};