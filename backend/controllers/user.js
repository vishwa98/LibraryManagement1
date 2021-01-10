const User = require('../models/user');

//Retreive a single user
exports.userById = (req, res, next, id) => {
    User.findById(id)
    .populate("bookborrowings", "_id name author isbn publisher language price quantity")
    .exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};



exports.getUser = (req, res) => {

    return res.json(req.profile);
};

//Update a user
exports.updateUser = (req, res) => {

    const { firstName, lastName, email, password, city, address1, address2, postalCode } = req.body;

    User.findOne({ _id: req.profile._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!firstName) {
            return res.status(400).json({
                error: 'First name is required'
            });
        } else {
            user.firstName = firstName;
        }

        if (!lastName) {
            return res.status(400).json({
                error: 'Last name is required'
            });
        } else {
            user.lastName = lastName;
        }

        if (!email) {
            return res.status(400).json({
                error: 'Email is required'
            });
        } else {
            user.email = email;
        }

        if (password) {
            if (password.length < 2) {
                return res.status(400).json({
                    error: 'Password should be min 3 characters long'
                });
            } else {
                user.password = password;
            }
        }

        if (!city) {
            return res.status(400).json({
                error: 'City is required'
            });
        } else {
            user.city = city;
        }

        if (!address1) {
            return res.status(400).json({
                error: 'Address 1 is required'
            });
        } else {
            user.address1 = address1;
        }

        if (!address2) {
            return res.status(400).json({
                error: 'Address 2 is required'
            });
        } else {
            user.address2 = address2;
        }

        if (!postalCode) {
            return res.status(400).json({
                error: 'Postal Code is required'
            });
        } else {
            user. postalCode =  postalCode;
        }

        user.save((err, editedDetails) => {

            if (err) {

                return res.status(400).json({

                    error: 'Unable to update user'

                });
            }

            res.json(editedDetails);

        });
    });
}

//Remove a book from user's borrowings
exports.removeBorrowBook = (req,res,next) => {

    User.findByIdAndUpdate(req.params.userId, { $pull: { bookborrowings: req.params.productId } }, { new: true })
    .populate("bookborrowings", "_id name author isbn publisher language price quantity")
    .exec((err,bookborrowings) => {

        if(err){

            console.log(err);
            return res.status(404);
        }
        else{

            return res.status(200).json(bookborrowings);
        }
    });
}

//Display all users
exports.allUsers = (req, res) => {
    let orderPro = req.query.orderPro ? req.query.orderPro : "asc";
    let sortPro = req.query.sortPro ? req.query.sortPro : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    User.find()
      .sort([[sortPro, orderPro]])
      .limit(limit)
      .exec((err, showgames) => {
        if (err) {
          return res.status(400).json({ error: "Error in loading Users" });
        }

        res.json(showgames);
      });
  };


  exports.getBorrowed = (req , res , next ) => {

    console.log(req.profile.bookborrowings)
    return res.status(200).json( req.profile.bookborrowings )

}

//Lend a book to a user
exports.addLend = (req, res, next) => {

    User.findByIdAndUpdate(req.body.userId, { $push: { bookborrowings: req.body.wishId } }, { new: true }, (err, result) => {
        if(err) {
            return res.status(503).json({ error: err });
        }
        else{
            console.log(req.body);
            return res.status(200).json({key1: result});
        }
        next();
    });

};




