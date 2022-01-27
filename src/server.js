const fastify = require("fastify")({ logger: true });
const { nanoid } = require("nanoid");

/* Example of defining a route for GET / */

// fastify.get("/", async (req, res) => {
//   res.send({ message: "hello world!" });
// });

// Our temporary database, an array of restaurants :)
let restaurants = [
  {
    id: "abc",
    name: "Puerto Viejo",
    cuisine: "dominican",
    hasTakeout: true,
  },
  {
    id: "def",
    name: "Cataldo",
    cuisine: "italian",
    hasTakeout: false,
  },
];

// GET /restaurants
fastify.get("/restaurants", async (req, res) => {
  res.send(restaurants);
});

// POST /restaurants
fastify.post("/restaurants", async (req, res) => {
  // get newRestaurant properties from request body
  const newRestaurant = req.body;

  // generate a random UUID and add it to newRestaurant
  newRestaurant.id = nanoid();

  // save new restaurant to db
  restaurants.push(newRestaurant);

  res.code(201).send(newRestaurant);
});

// GET /restaurants/:id
fastify.get("/restaurants/:id", async (req, res) => {
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
});

// PUT /restaurants/:id
fastify.put("/restaurants/:id", async (req, res) => {
  // get id from path parameters
  const { id } = req.params;

  // check that restaurant exists. If not found, `foundIndex` will equal -1
  const foundIndex = restaurants.findIndex((r) => r.id === id);

  if (foundIndex > -1) {
    // Update restaurant in database at foundIndex
    const prevData = restaurants[foundIndex];
    restaurants[foundIndex] = { ...prevData, ...req.body };
    // send empty response OK
    res.code(204).send();
  } else {
    res.code(404).send({ message: `Restaurant with id '${id}' not found` });
  }
});

// DELETE /restaurants/:id
fastify.delete("/restaurants/:id", async (req, res) => {
  // get id from path parameters
  const { id } = req.params;

  // check that restaurant exists. If not found, `foundIndex` will equal -1
  const foundIndex = restaurants.findIndex((r) => r.id === id);

  if (foundIndex > -1) {
    // Delete restaurant from database
    restaurants.splice(foundIndex, 1);
    // send empty response OK
    res.code(204).send();
  } else {
    res.code(404).send({ message: `Restaurant with id '${id}' not found` });
  }
});

// Start the server!
const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
