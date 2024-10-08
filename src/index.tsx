import React from "react";
import ReactDOM from "react-dom/client";
import "./global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./pages/index";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { Amplify } from "aws-amplify";
import { config } from "./configs/config";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { fetchAuthSession } from "aws-amplify/auth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const getNewAccessToken = async () => {
  const { tokens } = await fetchAuthSession({ forceRefresh: true });
  let token = tokens?.accessToken.toString() ?? "";
  localStorage.setItem("jwtToken", token);
  return token;
};

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token: string = localStorage.getItem("jwtToken") || "";
  // return the headers to the context so httpLink can read them
  if (token && token !== "undefined" && token.split(".").length > 1) {
    const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    const isExpired = Date.now() >= jwtPayload.exp * 1000;

    if (isExpired) {
      token = await getNewAccessToken();
    }
  }
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, operation, forward }: any) => {
  if (graphQLErrors && graphQLErrors.length) {
    // token expired. Refetch token using refresh token
    if (
      graphQLErrors[0]?.extensions?.response?.message === "ACCESS_TOKEN_EXPIRED"
    ) {
      console.warn("Refreshing token and trying again.");
      fetchAuthSession({ forceRefresh: true });
      // Automatically refresh user session if jwt token expired or else same session will return.
      // Reference link => https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#retrieve-current-session
    }
  }
});

Amplify.configure(config.amplifyConfig);

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_BACKEND_URL,
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

root.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
