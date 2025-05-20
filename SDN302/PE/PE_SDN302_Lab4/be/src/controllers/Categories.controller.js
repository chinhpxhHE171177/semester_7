const Category= require("../models/Categories");
module.exports = {
  index: async (req, res) => {
    try {
      const categories = await Category.find();
      return res.json(categories);
    } catch (error) {
      return res.json({
        message: error.message,
      });
    }
  },
};
