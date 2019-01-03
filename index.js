const hapi = require("hapi");
const mongoose = require("mongoose");
const { createStore, applyMiddleware } = require("redux");
// removing graphqlHapi and graphiqlHapi and using inbuilt apollo server utility
//const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const { ApolloServer } = require("apollo-server-hapi");
const schema = require("./graphql/schema");
//initialize models
const Painting = require("./models/Painting");
const User = require("./models/User");

/* swagger section */
const Inert = require("inert");
const Vision = require("vision");
const HapiSwagger = require("hapi-swagger");
const Pack = require("./package");

const server = new ApolloServer({
  schema
});

const app = hapi.server({
  port: 4000,
  host: "192.168.1.106"
});

// connect to mongodb
mongoose.connect(
  "mongodb://localhost/mongo-node-graphql",
  { useNewUrlParser: true, useCreateIndex: true },
  // eslint-disable-next-line no-unused-vars
  function(req, res) {
    console.log("connected to mongodb !!");
  }
);

const init = async () => {
  //Registering swagger plugins for Hapi
  await app.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: "Paintings API Documentation",
          version: Pack.version
        }
      }
    }
  ]);

  //API routes
  app.route([
    {
      method: "GET",
      path: "/",
      handler: function(request, reply) {
        return "<h1>Modern APi using Hapi </h1>";
      }
    },
    {
      method: "GET",
      path: "/api/v1/paintings",
      config: {
        description: "Get all the paintings",
        tags: ["api", "v1", "paitings"]
      },
      handler: (req, reply) => {
        return Painting.find();
      }
    },
    {
      method: "POST",
      path: "/api/v1/paintings",
      config: {
        description: "Save the paintings",
        tags: ["api", "v1", "paintings"]
      },
      handler: (req, reply) => {
        const { name, url, techniques } = req.payload;
        const painting = new Painting({
          name,
          url,
          techniques
        });
        return painting.save();
      }
    },
    {
      method: "POST",
      path: "/api/v1/user",
      config: {
        description: "Save the user",
        tags: ["api", "v1", "user"]
      },
      handler: (req, reply) => {
        const { firstname, lastname, email, phone, grade } = req.payload;
        const user = new User({
          firstname,
          lastname,
          email,
          phone,
          grade
        });
        return user.save();
      }
    },
    {
      method: "GET",
      path: "/api/v1/user",
      config: {
        description: "Get all the users",
        tags: ["api", "v1", "user"]
      },
      handler: (req, reply) => {
        return User.find();
      }
    }
  ]);
  //starting the server
  await server.applyMiddleware({ app });
  await app.start();
  console.log(`server is running at :${app.info.uri}`);
};

process.on("unHandledRejection", err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

init();
