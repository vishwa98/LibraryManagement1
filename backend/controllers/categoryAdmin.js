const CategoryAdmin = require("../models/CategoryAdmin");

// @desc    Get all categories
// @route   GET /api/categories/
// @access  Private
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryAdmin.find();
    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
      message: "fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

