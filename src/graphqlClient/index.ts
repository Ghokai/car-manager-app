import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const graphApiEndPoint = "https://fcg-fe-test.herokuapp.com";

export const getApolloClient = () => {
  const cache = new InMemoryCache();

  const link = new HttpLink({
    uri: graphApiEndPoint
  });

  const apolloClient = new ApolloClient({
    cache: cache,
    link: link
  });
  return apolloClient;
};
