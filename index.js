const {ApolloServer, PubSub} = require('apollo-server');
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const {MONGO} = require('./config.js')
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubsub})
})

mongoose.
    connect(MONGO, {useNewUrlParser: true,  useUnifiedTopology: true}) //This returns a promise
    .then(() => {
        console.log('Connected to MongoDB')
        return server.listen({port: 3000});
    }).
    then(port =>{
        console.log(`Server at port ${port.url}`)
    });