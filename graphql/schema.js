const graphql = require("graphql");
const PaintingType = require("./PaintingType");
const UserType = require("./UserType");
const Painting = require("./../models/Painting");
const User = require("./../models/User");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    painting: {
      type: PaintingType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //logic
        return Painting.findById(args.id);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //logic
        return User.findById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
