import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { ApolloProvider } from "@apollo/client";

// GraphQl
import { client } from "./client";

//Theme
import { theme } from "./theme/theme";

//Screens
import UserSearchScreen from "./screens/UsersSearch/UsersSearch";
import RepositoriesSearchScreen from "./screens/RepositoriesSearch/RepositoriesSearch";

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route path="/" element={<UserSearchScreen />} />
            <Route path="/users" element={<UserSearchScreen />} />
            <Route
              path="/repositories"
              element={<RepositoriesSearchScreen />}
            />
          </Routes>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
