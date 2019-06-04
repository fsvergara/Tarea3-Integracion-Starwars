import ApolloClient from "apollo-boost";

export const client = new ApolloClient({
  uri: "https://swapi-graphql-integracion-t3.herokuapp.com"
});