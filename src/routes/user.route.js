// routes/userRoutes.js
const express = require("express");
const router = express.Router();
import userService from "../services/user.service";

router.get("/", async (req, res) => {
  const users = await userService.getAllUsers();
  console.log(users);
  res.json(users);
});

// router.get("/:id", async (req, res) => {
//   const user = await getUserById(req.params.id);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });

module.exports = router;
