const { body, param, query } = require("express-validator");
const validate = require("../utils/validate");
const ALLOWED_CATEGORIES = [
  "Chest",
  "Back",
  "Triceps",
  "Biceps",
  "Legs",
  "Abs",
];
const exerciseBodyValidation = [
  body("name").notEmpty().withMessage("Name cant be empty"),
  body("category").notEmpty().withMessage("Category cant be empty"),
  body("category")
    .isIn(ALLOWED_CATEGORIES)
    .withMessage("Please select a valid category"),
  validate,
];

module.exports = { exerciseBodyValidation };
