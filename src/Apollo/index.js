import { ApolloClient, HttpLink } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache: cache,
  link: new HttpLink({
    uri: "http://localhost:4000/",
  }),
});
