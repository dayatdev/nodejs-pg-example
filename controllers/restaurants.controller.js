const db = require("../db");

const getAllRestaurants = async (req, res) => {
  const restaurants = await db.query(
    "SELECT * FROM restaurants WHERE user_id = $1",
    [req.user.id]
  );

  res.status(200).json({
    status: "success",
    results: restaurants.rows.length,
    data: {
      restaurants: restaurants.rows,
    },
  });
};

const getRestaurant = async (req, res) => {
  const restaurant = await db.query(
    "SELECT * FROM restaurants WHERE id = $1 AND user_id = $2",
    [req.params.id, req.user.id]
  );

  if (restaurant.rows.length === 0) {
    return res.status(404).json({
      status: "fail",
      error: `Restaurant with id = ${req.params.id} not found`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      restaurant: restaurant.rows[0],
    },
  });
};

const createRestaurant = async (req, res) => {
  const { name, location, priceRange } = req.body;
  const restaurant = await db.query(
    "INSERT INTO restaurants (name, location, price_range, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, location, priceRange, req.user.id]
  );

  res.status(201).json({
    status: "success",
    data: {
      restaurant: restaurant.rows[0],
    },
  });
};

const updateRestaurant = async (req, res) => {
  const { name, location, priceRange } = req.body;
  const restaurant = await db.query(
    "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 and user_id = $5 RETURNING *",
    [name, location, priceRange, req.params.id, req.user.id]
  );

  if (restaurant.rows.length === 0) {
    return res.status(404).json({
      status: "fail",
      error: `Restaurant with id = ${req.params.id} not found`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      restaurant: restaurant.rows[0],
    },
  });
};

const deleteRestaurant = async (req, res) => {
  const restaurant = await db.query(
    "DELETE FROM restaurants WHERE id = $1 AND user_id = $2 RETURNING *",
    [req.params.id, req.user.id]
  );

  if (restaurant.rows.length === 0) {
    return res.status(404).json({
      status: "fail",
      error: `Restaurant with id = ${req.params.id} not found`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {},
  });
};

module.exports = {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
