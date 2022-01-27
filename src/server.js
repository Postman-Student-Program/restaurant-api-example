const fastify = require("fastify")({ logger: true });
const openapiGlue = require("fastify-openapi-glue");
const mongoose = require("mongoose");
const Service = require("./service");

// initialize access to .env variables like `process.env.YOUR_VAR_NAME`
require("dotenv").config();

const glueOptions = {
  specification: `${__dirname}/schema.yaml`,
  service: new Service(),
};

fastify.register(openapiGlue, glueOptions);

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
