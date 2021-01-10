const express = require("express");

const router = express.Router();

const { userById, removeBorrowBook, getUser, updateUser, allUsers, getBorrowed, addLend } = require("../controllers/user");
const AuthController = require("../controllers/AuthController");

router.put("/user/addlend", addLend);

router.get("/user/:userId/borrowedbooks", getBorrowed);

router.delete("/user/:userId/removeborrowing/:productId", removeBorrowBook);

router.get("/secret/:userId", AuthController.verifyToken, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get('/user/:userId', AuthController.verifyToken, getUser);

router.get('/admin/user/:userId', getUser);

router.put('/user/:userId', AuthController.verifyToken, updateUser);

router.param("userId", userById);

router.get("/allusers", allUsers);

module.exports = router;
