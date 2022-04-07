import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

export const LAUNCH_SITES = gql`
  query {
    launches {
      launch_site {
        site_name
      }
    }
  }
`;

export const SITE_DETAIL = gql`
  query Site($site: String!) {
    launches(find: {site_name: $site}) {
      launch_success
      launch_site {
        site_name
      }
      launch_year
      rocket {
              rocket_name
              rocket_type
            }
      mission_name
    }
  }
`;
