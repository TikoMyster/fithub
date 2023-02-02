import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { CssVarsProvider } from "@mui/joy/styles";

import Home from "./pages/Home";
// import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
// ===================to do===================
import Workout from "./pages/Workout";
// import { StoreProvider } from "./utils/GlobalState";
// import Success from "./pages/Success";
// import OrderHistory from "./pages/OrderHistory";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CssVarsProvider>
        <Router>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/*=================== to do : add  element to workout route=================== */}
              <Route path="/workouts" />

              {/*<Route path="/success" element={<Success />} />
            <Route path="/orderHistory" element={<OrderHistory />} />
            <Route path="/products/:id" element={<Detail />} />*/}
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </Router>
      </CssVarsProvider>
    </ApolloProvider>
  );
}

export default App;
