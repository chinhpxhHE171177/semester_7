const { Tutorials, Tutorial } = require("../models/Tutorials");
const Category = require("../models/Categories");
const Image = require("../models/Images");
// module.exports = {
//   index: async (req, res) => {
//     //console.log(req);

//     try {
//       const tutorials = await Tutorials.find()
//         .populate("category")
//         .populate("comments");
//       return res.json(tutorials);
//     } catch (error) {
//       return res.json({
//         message: error.message,
//       });
//     }
//   },

//   getComments: async (req, res) => {
//     try {
//       const { id } = req.params;
//       //console.log(id);
//       const tutorials = await Tutorials.findById(id).populate({
//         path: "comments",
//         select: "-__v",
//       });
//       const getComment = tutorials.comments;
//       return res.json(getComment);
//     } catch (error) {
//       return res.json({
//         message: error.message,
//       });
//     }
//   },

//   createTutorial: async (req, res) => {
//     try {
//       const { body } = req;
//       // dữ liệu của image thì đủ nhé ae 
//       const imageDataArray = body.images.map(imageData => ({
//         path: imageData.path,
//         url: imageData.url,
//         caption: imageData.caption,
//       }));
//       // còn đây là của thằng tutorial 
//       /*
//         anh em chú ý tutorial mặc dù là nhúng nhưng mà _id của image nó vẫn là định dạng ref nên ae phải lấy cái saveImages này trả về cho nó nhé , nếu anh em lưu trực tiếp image ở body vào thì nó sẽ ko có ref đâu và cũng k có id
//       */
//       const savedImages = await Image.insertMany(imageDataArray, { ordered: true });
//       const images = savedImages.map(savedImage => ({
//         _id: savedImage._id,
//         url: savedImage.url,
//         caption: savedImage.caption,
//       }));
//       const newTutorial = await Tutorials.create({
//         ...body,
//         images,  
//       });
//       return res.json(newTutorial);
//     } catch (error) {
//       return res.json({
//         message: error.message,
//       });
//     }
//   },
//   updateTutorial: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { body } = req;

//       // Nếu có images, cần xử lý ảnh trước khi cập nhật
//       let images = [];
//       if (body.images && body.images.length > 0) {
//         const imageDataArray = body.images.map(imageData => ({
//           path: imageData.path,
//           url: imageData.url,
//           caption: imageData.caption,
//         }));

//         // Chèn ảnh mới vào database và lấy _id
//         const savedImages = await Image.insertMany(imageDataArray, { ordered: true });

//         images = savedImages.map(savedImage => ({
//           _id: savedImage._id,
//           url: savedImage.url,
//           caption: savedImage.caption,
//         }));
//       }

//       // Cập nhật tutorial
//       const updatedTutorial = await Tutorials.findByIdAndUpdate(
//         id,
//         {
//           ...body,
//           ...(images.length > 0 && { images }), // Chỉ cập nhật images nếu có hình mới
//         },
//         { new: true }
//       );

//       if (!updatedTutorial) {
//         return res.status(404).json({ message: "Tutorial not found" });
//       }

//       return res.json(updatedTutorial);
//     } catch (error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// };


// 1.1
exports.getAllTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find()
      .populate('category')
      .populate('comments')
    //console.log(tutorials);
    if (tutorials.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No data'
      });
    };
    // return res.status(200).json({
    //   success: true,
    //   data: tutorials
    // });
    return res.status(200).json(tutorials);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

//1.2
exports.getAllCommentsByTutorialID = async (req, res) => {
  try {
    const { id } = req.params;
    const tutorial = await Tutorial.findById(id).populate({
      path: 'comments',
      // select: "-__v",
      select: "-__v -createAt", // Loại bỏ createAt khi lấy dữ liệu từ database
    });
    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }
    //return res.json(tutorial.comments);

    // Ghi đè createdAt bằng thời gian hiện tại
    const commentsWithCurrentTime = tutorial.comments.map(comment => ({
      ...comment.toObject(),
      createdAt: new Date(), // Ghi đè createAt
    }));

    return res.json(commentsWithCurrentTime);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

//1.3
exports.createNewTutorial = async (req, res) => {
  const { title, author, images, comments, category, tags } = req.body;

  if (!title || !author || !category) {
    return res.json({
      success: false,
      message: 'Please input full fields'
    });
  }

  const newTutorial = new Tutorial({ title, author, images, comments, category, tags: tags || [] });
  await newTutorial.save();
  return res.status(201).json({
    sucess: true,
    message: 'Add new success tutorial',
    data: newTutorial
  });
}

// 1.4
exports.deleteTutorial = async (req, res) => {
  try {
    const { id } = req.params;
    const tutorial = await Tutorial.findByIdAndDelete(id);

    if (!tutorial) {
      return res.status(404).json({ success: false, message: "Tutorial not found" });
    }

    return res.status(200).json({ success: true, message: "Tutorial deleted successfully" });
  } catch (error) {
    return res.status(500).json("message: error.message");
  }
}