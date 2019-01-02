const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

var PaintingType = new GraphQLObjectType({
    name = 'painting',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        url: { type: GraphQLString },
        techniques: { type: GraphQLString },

    })
})

module.exports = PaintingType;