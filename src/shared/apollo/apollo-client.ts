import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { provideApolloClient } from '@vue/apollo-composable'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPH_TARGET,
})
const cache = new InMemoryCache()
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export const apolloProvided = provideApolloClient(apolloClient)
