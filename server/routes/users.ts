var express = require("express");
const { updateUser } = require("../util/users");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("users");
});

router.put("/update", (req, res, next) => {
  const { api_key, email } = req.body;
  updateUser(api_key, { email })
    .then(() => {
      res.json({ message: "updated successfully" });
    })
    .catch((error) => {
      res.json({ error });
    });
});

module.exports = router;
