// Hack the North 2022 Frontend Developer Challenge
// Tailai Wang
// Login Page

import React, { useState, useContext } from "react";
import UserContext from "../../contexts/userContext";
import { Error, Header, Button, FieldSet, Form, Wrapper } from "./style";

const Login = () => {
  // Context to handle auth flow
  const { login, hasLoginError } = useContext(UserContext);
  const { proceed } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Hooks for Auth - Login Attempt and Continue without Logging in
  const onSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  const onProceed = (e) => {
    e.preventDefault();
    proceed();
  };

  // Handling Input Form
  const onInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Header>Hackathon Global Portal Login</Header>
        {hasLoginError && <Error>Login Failed: Incorrect Credentials</Error>}
        <FieldSet>
          <label>
            <span>Username </span>
            <input
              type="text"
              value={username}
              onChange={onInputChange(setUsername)}
              placeholder="Zafin"
              required
            />
          </label>
          <label>
            <span>Password </span>
            <input
              type="password"
              value={password}
              onChange={onInputChange(setPassword)}
              placeholder="123"
              required
            />
          </label>
        </FieldSet>
        <Button>Login</Button>
        <Button onClick={onProceed}>Continue without Logging in</Button>
      </Form>
    </Wrapper>
  );
};

export default Login;
