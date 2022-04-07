import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";

import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector("#root")
);
