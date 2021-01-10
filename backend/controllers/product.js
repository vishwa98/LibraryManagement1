const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");

//Get a single book product

exports.productById = (req, res, next, id) => {
  Product.findById(id)

    .populate("comments.postedBy", "_id firstName")
    .populate("ratings", "text")
    .populate("ratings.ratedBy", "_id name")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(404).json({
          error: "Error in loading product",
        });
      }
      req.product = product;
      next();
    });
};

exports.singleProductView = (req, res) => {
  Product.findById(req.params.productId, (err, product) => {
    if (err) return res.status(404).json({ error: err });
    return res.json(product);
  });
};

//create a single book product
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to upload image",
      });
    }

    let product = new Product(fields);

    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      return res.json(result);
    });
  });
};

//DELETE a book product
exports.removeProduct = (req, res) => {
  if (req.product._id) {
    Product.deleteOne({ _id: req.product._id }, (err) => {
      if (err) return res.status(400).json({ success: false, error: err });
      res.status(200).json({ success: true });
    });
  } else {
    return res.json({ success: false, error: "Product not found" });
  }
};

//Update a book product
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to upload image",
      });
    }

    let product = new Product(fields);
    if (files.photo.name.length > 0) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    } else {
      product.photo = false;
    }

    Product.findById(req.product._id, function (err, productFound) {
      if (err) return res.send(500, { success: false, msg: err });

      productFound.name = product.name;
      productFound.author = product.author;
      productFound.isbn = product.isbn;
      productFound.publisher = product.publisher;
      productFound.language = product.language;
      productFound.status = product.status;
      productFound.category = product.category;


      if (files.photo.name.length > 0) {
        productFound.photo = product.photo;
      }

      productFound.save(function (err, doc) {
        if (err) return res.send(500, { success: false, msg: err });
        return res.status(200).send({
          success: true,
          msg: "Succesfully saved.",
        });
      });
    });

    // console.log(req.product);

    // Product.findOneAndUpdate({ _id: req.product._id }, product, function (
    //   err,
    //   doc
    // ) {
    //   if (err) return res.send(500, { success: false, msg: err });
    //   return res.status(200).send({
    //     success: true,
    //     msg: "Succesfully saved.",
    //   });
    // });
  });
};

//Retreive all book products
exports.allProducts = (req, res) => {
  let orderPro = req.query.orderPro ? req.query.orderPro : "asc";
  let sortPro = req.query.sortPro ? req.query.sortPro : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Product.find()
    .select("-photo") //Not selecting photo
    .populate("category")
    .populate("comments", "text created")
    .populate("comments.postedBy", "_id firstName")
    .populate("ratings", "text")
    .populate("ratings.ratedBy", "_id name")
    .sort([[sortPro, orderPro]])
    .limit(limit)
    .exec((err, showproducts) => {
      if (err) {
        return res.status(400).json({ error: "Error in loading products" });
      }

      res.json(showproducts);
    });
};

exports.categoriesView = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Error in loading categories",
      });
    }

    res.json(categories);
  });
};

//Filter book products
exports.filterProductss = (req, res) => {
  let sortPro = req.body.sortPro ? req.body.sortPro : "_id";
  let orderPro = req.body.orderPro ? req.body.orderPro : "desc";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let reqDetails = {}; //contains all the details received in the request body

  for (let i in req.body.filters) {
    if (req.body.filters[i].length > 0) {
      //checks whether request body object has value greater than 0

      if (i === "price") {
        reqDetails[i] = {
          $gte: req.body.filters[i][0], //greater than 0th index
          $lte: req.body.filters[i][1], //less the 1st index
        };
      } else {
        reqDetails[i] = req.body.filters[i];
      }
    }
  }

  Product.find(reqDetails)
    .select("-photo")
    .populate("category")
    .sort([[sortPro, orderPro]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: "Error in loading products" });
      }

      res.json({
        data,
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

//Rating a book product
exports.rating = (req, res) => {
  let rating = req.body.rating;

  rating.ratedBy = req.body.userId;

  Product.findByIdAndUpdate(
    req.body.productId,
    { $push: { ratings: rating } },
    { new: true }
  )
    .populate("ratings.ratedBy", "_id name")
    .populate("ratedBy", "_id name")
    .exec((err, rev) => {
      if (err) {
        return res.status(400).json({
          error: "Error in adding review",
        });
      } else {
        res.json(rev);
      }
    });
};

exports.updateBookStatus = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to upload image",
        });
      }

      let product = new Product(fields);
      if (files.photo.name.length > 0) {
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      } else {
        product.photo = false;
      }

      Product.findById(req.product._id, function (err, productFound) {
        if (err) return res.send(500, { success: false, msg: err });

        productFound.name = product.name;
        productFound.author = product.author;
        productFound.isbn = product.isbn;
        productFound.status = product.status;
        productFound.category = product.category;


        if (files.photo.name.length > 0) {
          productFound.photo = product.photo;
        }

        productFound.save(function (err, doc) {
          if (err) return res.send(500, { success: false, msg: err });
          return res.status(200).send({
            success: true,
            msg: "Succesfully saved.",
          });
        });
      });
    });
  };
