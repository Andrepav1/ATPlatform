var express = require("express");
var router = express.Router();

const fx = require("simple-fxtrade");
const User = require("../models/user");

// login only sets the API key and the account ID for the next calls and saves the user object
router.post("/login", function (req, res, next) {
  const { apiKey, accountId, live } = req.body;

  try {
    fx.configure({ apiKey, accountId, live });

    var user_instance = new User({
      api_key: apiKey,
      primary_account: accountId,
    });

    user_instance.save((error) => {
      if (error) {
        console.log("Error while saving user");
      }
    });
  } catch (error) {
    next(error);
  }

  res.json({ apiKey, accountId });
});

module.exports = router;
