'use strict';

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');
const addAnimal = require('./resolvers/create');
const viewAnimal = require('./resolvers/view');
const listAnimals = require('./resolvers/list');
const removeAnimal = require('./resolvers/remove');
const updateAnimal = require('./resolvers/update');

const animalType = new GraphQLObjectType({
    name: 'animal',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        genus: { type: new GraphQLNonNull(GraphQLString) },
        isHungry: { type: new GraphQLNonNull(GraphQLBoolean) },
        lastFedDate: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        dateAdded: { type: new GraphQLNonNull(GraphQLString) },
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            listAnimals: {
                type: new GraphQLList(animalType),
                resolve: (parent, args) => listAnimals()
            },
            viewAnimal: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: animalType,
                resolve: (parent, args) => viewAnimal(args.id)
            }
        }
    }),

    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            removeAnimal: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: GraphQLBoolean,
                resolve: (parent, args) => removeAnimal(args.id)
            },
            createAnimal: {
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    genus: { type: new GraphQLNonNull(GraphQLString) },
                    isHungry: { type: new GraphQLNonNull(GraphQLBoolean) }
                },
                type: animalType,
                resolve: (parent, args) => addAnimal(args)
            },
            updateAnimal: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) },
                    name: { type: new GraphQLNonNull(GraphQLString) }                    
                },
                type: animalType,
                resolve: (parent, args) => updateAnimal(args)
            }      
        }
    })
});

module.exports = schema;