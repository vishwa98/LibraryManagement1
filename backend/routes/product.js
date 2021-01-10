const express = require("express");

const router = express.Router();

const {
  create,
  productById,
  singleProductView,
  allProducts,
  categoriesView,
  filterProductss,
  photo,
  rating,
  removeProduct,
  updateProduct,
  updateBookStatus,
} = require("../controllers/product");

const AuthController = require("../controllers/AuthController");
const { userById } = require("../controllers/user");

//Ratings
router.put("/product/rating", AuthController.verifyToken, rating);

router.get("/product/:productId", singleProductView);

router.post(
  "/product/create",
  AuthController.verifyToken,
  AuthController.verifyIsLibrarian,
  create
);
router.delete(
  "/product/delete/:productId",
  AuthController.verifyToken,
  AuthController.verifyIsLibrarian,
  removeProduct
);

router.put(
  "/product/update/:productId",
  AuthController.verifyToken,
  AuthController.verifyIsLibrarian,
  updateProduct
);

router.put(
  "/book/update/:productId",
  AuthController.verifyToken,
  AuthController.verifyIsLibrarian,
  updateBookStatus
);

router.get("/products", allProducts);
router.get("/products/categories", categoriesView);
router.post("/products/filter", filterProductss);
router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
