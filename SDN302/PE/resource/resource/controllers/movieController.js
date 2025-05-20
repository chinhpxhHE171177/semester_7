const Movie = require('../models/movie');
const Producer = require('../models/producer');
const Director = require('../models/director');
const Star = require('../models/star');

//1.1 Create new movie 
exports.createMovie = async (req, res) => {
    try {
        const { title, release, description, producer, director, genres, stars } = req.body;

        // Validation thủ công
        if (!title || title.trim().length === 0) {
            return res.status(500).json({
                status: 500,
                message: 'movie validation failed: title: The movie title is required',
            });
        }

        if (!stars || !Array.isArray(stars) || stars.length === 0) {
            return res.status(500).json({
                status: 500,
                message: 'movie validation failed: stars: At least one star is required',
            });
        }

        // Kiểm tra genres hợp lệ
        const validGenres = ['Action', 'Drama', 'Comedy', 'Cartoon'];
        if (genres && genres.length > 0) {
            const invalidGenres = genres.filter((genre) => !validGenres.includes(genre));
            if (invalidGenres.length > 0) {
                return res.status(500).json({
                    status: 500,
                    message: `movie validation failed: genres: ${invalidGenres.join(', ')} is/are not supported`,
                });
            }
        }

        const newMovie = await Movie.create({
            title,
            release,
            description,
            producer,
            director,
            genres,
            stars
        });

        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 2. List all movies
exports.listMovies = async (req, res) => {
    try {
        // Lấy tất cả phim và populate các trường liên quan
        const movies = await Movie.find()
            .populate('producer', 'name -_id') // Chỉ lấy trường 'name' từ Producer
            .populate('director', 'fullname -_id') // Chỉ lấy trường 'fullname' từ Director
            .populate('stars', 'fullname -_id'); // Chỉ lấy trường 'fullname' từ Star

        if (!movies || movies.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No movies found in the database',
            });
        }

        // Định dạng lại dữ liệu theo yêu cầu
        const formattedMovies = movies.map((movie) => ({
            _id: movie._id.toString(),
            title: movie.title,
            release: movie.release.toISOString(),
            description: movie.description || '',
            producer: movie.producer ? movie.producer.name : 'Unknown Producer',
            director: movie.director ? movie.director.fullname : 'Unknown Director',
            genres: movie.genres,
            stars: movie.stars.map((star) => star.fullname), // Chỉ lấy fullname của stars
        }));

        res.status(200).json(formattedMovies);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};


// 3. List all movies by star
exports.getMovieByStar = async (req, res) => {
    try {
        const { starId } = req.params; // Lấy starId từ URL params

        // Kiểm tra xem starId có tồn tại trong collection stars không
        const starExists = await Star.findById(starId);
        if (!starExists) {
            return res.status(404).json({
                status: 404,
                message: 'This movie star does not exist.',
            });
        }

        // Tìm tất cả phim có starId trong mảng stars
        const movies = await Movie.find({ stars: starId })
            .populate('producer', 'name -_id') // Populate tên producer
            .populate('director', 'fullname -_id') // Populate tên director
            .populate('stars', 'fullname -_id'); // Populate tên các stars

        if (!movies || movies.length === 0) {
            return res.status(404).json({
                status: 404,
                message: `No movies found for star with ID: ${starId}`,
            });
        }

        // Định dạng lại dữ liệu giống câu 2
        const formattedMovies = movies.map((movie) => ({
            _id: movie._id.toString(),
            title: movie.title,
            release: movie.release.toISOString(),
            description: movie.description || '',
            producer: movie.producer ? movie.producer.name : 'Unknown Producer',
            director: movie.director ? movie.director.fullname : 'Unknown Director',
            genres: movie.genres,
            stars: movie.stars.map((star) => star.fullname),
        }));

        res.status(200).json(formattedMovies);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

// 4. Count movies by director name
exports.countMoviesByDirector = async (req, res) => {
    try {
        const { directorName } = req.params; // Lấy directorName từ URL params

        // Tìm director theo fullname
        const director = await Director.findOne({ fullname: directorName });
        if (!director) {
            return res.status(404).json({
                status: 404,
                message: 'Director not found',
            });
        }

        // Đếm số lượng phim theo director._id
        const movieCount = await Movie.countDocuments({ director: director._id });

        // Trả về kết quả theo định dạng yêu cầu
        res.status(200).json({
            director: directorName,
            numberOfMovies: movieCount,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

// 5. Add stars to a movie
exports.addStarsToMovie = async (req, res) => {
    try {
        const { movieId } = req.params; // Lấy movieId từ URL params
        const starIds = req.body; // Lấy mảng starId từ body

        // Kiểm tra movieId có tồn tại không
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({
                status: 404,
                message: 'Movie not found',
            });
        }

        // Kiểm tra tất cả starId có tồn tại không
        const validStars = await Star.find({ _id: { $in: starIds } });
        const validStarIds = validStars.map((star) => star._id.toString());
        const invalidStarIds = starIds.filter((id) => !validStarIds.includes(id));

        if (invalidStarIds.length > 0) {
            return res.status(400).json({
                status: 400,
                message: `Invalid star IDs: ${invalidStarIds.join(', ')}`,
            });
        }

        // Lọc ra các starId mới (chưa có trong movie.stars)
        const currentStarIds = movie.stars.map((star) => star.toString());
        const newStarIds = starIds.filter((id) => !currentStarIds.includes(id));

        if (newStarIds.length === 0) {
            return res.status(200).json({
                status: 200,
                message: 'No new stars added. All provided stars already exist in the movie.',
            });
        }

        // Thêm các starId mới vào mảng stars
        movie.stars = [...movie.stars, ...newStarIds];
        await movie.save();

        // Populate thông tin chi tiết và trả về phim đã cập nhật
        const updatedMovie = await Movie.findById(movieId)
            .populate('producer', '_id')
            .populate('director', '_id')
            .populate('stars', '_id');

        const formattedMovie = {
            _id: updatedMovie._id.toString(),
            title: updatedMovie.title,
            release: updatedMovie.release.toISOString(),
            description: updatedMovie.description || '',
            producer: updatedMovie.producer ? updatedMovie.producer._id : 'Unknown Producer',
            director: updatedMovie.director ? updatedMovie.director._id : 'Unknown Director',
            genres: updatedMovie.genres,
            stars: updatedMovie.stars.map((star) => star._id),
            createdAt: updatedMovie.createdAt.toISOString(),
            updatedAt: updatedMovie.updatedAt.toISOString(),
            __v: movie.stars.__v
        };

        res.status(200).json(formattedMovie);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};