const express = require("express");

const {
  getCategories,
} = require("../controllers/categoryAdmin");

const router = express.Router();

router.route("/").get(getCategories);



module.exports = router;
