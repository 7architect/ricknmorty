import { apolloClient } from '@/shared/apollo/apollo-client.ts'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { provide } from 'vue'

export const setupApollo = () => provide(DefaultApolloClient, apolloClient)
