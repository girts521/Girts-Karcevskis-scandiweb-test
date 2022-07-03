import {ApolloClient, HttpLink} from "@apollo/client";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache
});

export const client = new ApolloClient({
    cache: cache,
    link:   new HttpLink({
        uri: 'http://localhost:4000/',
      }),
  });