import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: "Bearer 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",
  },
}));

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         search: {
//           keyArgs: ["query", "after"],
//           merge(existing, incoming, { args }) {
//             const existingNodes = existing?.nodes || [];
//             console.log(existing, incoming, args);
//             if (!args?.after) {
//               return incoming;
//             }
//             return {
//               ...incoming,
//               nodes: [...existingNodes, ...incoming.nodes],
//             };
//           },
//         },
//       },
//     },
//   },
// });

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({}),
});
