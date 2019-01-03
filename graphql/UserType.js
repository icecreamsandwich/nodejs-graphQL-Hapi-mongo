const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

var UserType = new GraphQLObjectType({
  name: "Users",
  fields: () => ({
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    grade: { type: GraphQLString }
  })
});

module.exports = UserType;
