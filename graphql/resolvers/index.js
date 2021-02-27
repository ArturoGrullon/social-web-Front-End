const postsResolvers = require('./post')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')

module.exports= {
    Post:{
        likeCount: (parent) => parent.likes.lenght,
        commentCount: (parent) => parent.comments.lenght
        },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
}