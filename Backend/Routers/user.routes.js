const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController.js");
const userValidation = require("../Validation/user.validation.js");
const authToken = require("../Auth/authToken.js");
// User Router

router.get("/", userController.getUsers);
router.post(
  "/",
  userValidation.formUserValidation(),
  userController.createUser,
);
router.get("/:id", userValidation.idValidation(), userController.getUser);

router.delete("/:id", userController.removeUser);
router.patch(
  "/:id",
  userValidation.bodyFormValidation(),
  userController.updateBodyInfo,
);
module.exports = router;
