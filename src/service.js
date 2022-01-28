const Restaurant = require("./models/Restaurant");

// fastify-openapi-glue library expects the method names in the Service class to match the `operationId` from each path in your schema. That's how it will know the request method (GET/POST, etc) and the schema for the request/response of each route
class Service {
  constructor() {}

  getRestaurants = async (_req, res) => {
    const restaurants = await Restaurant.find();
    res.send(restaurants);
  };

  addRestaurant = async (req, res) => {
    // create and save restaurant to db
    const newRestaurant = await Restaurant.create(req.body);

    res.code(201).send(newRestaurant);
  };

  getRestaurant = async (req, res) => {
    // get id from path parameters
    const { id } = req.params;

    // check that restaurant exists
    const restaurant = await Restaurant.findById(id);

    if (restaurant) {
      res.send(restaurant);
    } else {
      res.code(404).send({ message: `Restaurant with id '${id}' not found` });
    }
  };

  updateRestaurant = async (req, res) => {
    // get id from path parameters
    const { id } = req.params;

    // check that restaurant exists
    const restaurant = await Restaurant.findById(id);

    if (restaurant) {
      // Update restaurant in database
      await restaurant.update(req.body);
      // send empty response with status 204
      res.code(204).send();
    } else {
      res.code(404).send({ message: `Restaurant with id '${id}' not found` });
    }
  };

  deleteRestaurant = async (req, res) => {
    // get id from path parameters
    const { id } = req.params;

    // check that restuarant exists
    const restaurant = await Restaurant.findById(id);

    if (restaurant) {
      // Delete restaurant from database
      await Restaurant.findByIdAndRemove(id);
      // send empty response with status 204
      res.code(204).send();
    } else {
      res.code(404).send({ message: `Restaurant with id '${id}' not found` });
    }
  };
}

module.exports = Service;
