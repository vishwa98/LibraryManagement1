const express = require("express");
const router = express.Router();

// import custom routes
const AuthRoutes = require("./auth");
const LibrarianRoute = require("./librarian");
// const ProductRoute = require("./product");

// middleware to read and response with json
router.use(express.json());

// sub routes
router.use("/auth", AuthRoutes); // mapping auth routes

// protected routes
router.use("/librarian", LibrarianRoute);
// router.use("/product", ProductRoute);

module.exports = router;
