import React from 'react'
import App from './App'
import {ApolloProvider, InMemoryCache, ApolloClient, createHttpLink} from '@apollo/client'


const httpLink = createHttpLink({uri: 'http://localhost:3000'});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client = {client}>
        <App/>
    </ApolloProvider>
)