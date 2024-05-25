import express from "express";
import { updateUser } from "../util/users";

const router = express.Router();

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

export default router;
