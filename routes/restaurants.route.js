const express = require("express");
const {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurants.controller");

const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", protect, getAllRestaurants);
router.get("/:id", protect, getRestaurant);
router.post("/", protect, createRestaurant);
router.put("/:id", protect, updateRestaurant);
router.delete("/:id", protect, deleteRestaurant);

module.exports = router;
