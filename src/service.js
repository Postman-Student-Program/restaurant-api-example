const { nanoid } = require("nanoid");

let restaurants = [
  {
    id: "4Oj9hUC-EwrYdn9uOYeui",
    name: "Puerto Viejo",
    cuisine: "dominican",
    hasTakeout: true,
  },
  {
    id: "8NBUuV1hY1mUEomWxnws1",
    name: "Sadas",
    cuisine: "japanese",
    hasTakeout: true,
  },
];

class Service {
  constructor() {}

  getRestaurants(_req, res) {
    res.send(restaurants);
  }

  addRestaurant(req, res) {
    // get newRestaurant properties from request body
    const newRestaurant = req.body;
    // generate a unique random id and add it to newRestaurant
    newRestaurant.id = nanoid();

    // save new restaurant to db
    restaurants.push(newRestaurant);

    res.code(201).send(newRestaurant);
  }

  getRestaurant(req, res) {
    // get id from path parameters
    const { id } = req.params;
    // Get restaurant from database
    const restaurant = restaurants.find((r) => r.id === id);

    // Send restaurant in response if found, otherwise send 404
    if (restaurant) {
      res.send(restaurant);
    } else {
      res.code(404).send({ message: `Restaurant with id '${id}' not found` });
    }
  }

  updateRestaurant(req, res) {
    // get id from path parameters
    const { id } = req.params;

    // check that restuarant exists. If not found, `foundIndex` will equal -1
    const foundIndex = restaurants.findIndex((r) => r.id === id);

    if (foundIndex > -1) {
      // Update restaurant in database
      const prevData = restaurants[foundIndex];
      restaurants[foundIndex] = { ...prevData, ...req.body };
      // send empty response with status 204
      res.code(204).send();
    } else {
      res.code(404).send({ message: `Restaurant with id '${id}' not found` });
    }
  }

  deleteRestaurant(req, res) {
    // get id from path parameters
    const { id } = req.params;

    // check that restuarant exists. If not found, `foundIndex` will equal -1
    const foundIndex = restaurants.findIndex((r) => r.id === id);

    if (foundIndex > -1) {
      // Delete restaurant from database
      restaurants.splice(foundIndex, 1);
      // send empty response with status 204
      res.code(204).send();
    } else {
      res.code(404).send({ message: `Restaurant with id '${id}' not found` });
    }
  }
}

module.exports = Service;
