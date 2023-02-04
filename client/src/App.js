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
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import SearchWorkouts from "./pages/searchWorkout";
import MyWorkouts from "./pages/myWorkout";

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
              <Route path="/workouts" element={<SearchWorkouts />} />
              <Route path="/myworkout" element={<MyWorkouts />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </Router>
      </CssVarsProvider>
    </ApolloProvider>
  );
}

export default App;
