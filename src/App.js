// Hack the North 2022 Frontend Developer Challenge 
// Tailai Wang
// App Page 

import React, { useReducer } from "react";

import UserContext from "./contexts/userContext";
import Login from "./components/login";
import Profile from "./components/profile";

import "./index.css";

// Hard Coded Username and Password
const USERNAME = "Zafin";
const PASSWORD = "123";

const INITIAL_STATE = {
  user: null,
  hasLoginError: false,
};

// Simple authentication to make sure username and password are correct
const validateCredentials = (username, password) =>
  username === USERNAME && password === PASSWORD;

// Reducer to handle auth flow
const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      const { username, password } = action.payload;
      // Incorrect Auth - displays error message
      if (!validateCredentials(username, password)) {
        return {
          ...state,
          hasLoginError: true,
          user: null,
        };
      }

      // Successful Login
      return {
        ...state,
        hasLoginError: false,
        user: {
          id: 1,
          username: USERNAME,
        },
      };
    }
    case "logout": {
      return {
        ...state,
        user: null,
      };
    }

    case "proceed": {
      // Continute without Logging in (Guest Account)
      return {
        ...state,
        hasLoginError: false,
        user: {
          id: 0,
          username: "Guest",
        },
      };
    }
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const currentValue = {
    user: state.user,
    hasLoginError: state.hasLoginError,
    login: (username, password) =>
      dispatch({
        type: "login",
        payload: { username, password },
      }),
    logout: () => dispatch({ type: "logout" }),
    proceed: () => dispatch({ type: "proceed" }),
  };

  return (
    <UserContext.Provider value={currentValue}>
      {state.user && <Profile />}
      {!state.user && <Login />}
    </UserContext.Provider>
  );
}
