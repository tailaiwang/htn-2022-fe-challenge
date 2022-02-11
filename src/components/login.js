// Hack the North 2022 Frontend Developer Challenge 
// Tailai Wang
// Login Page 

import React, { useState, useContext } from "react";
import UserContext from "../contexts/userContext";
import styled from "styled-components";

const Login = () => {
  // Context to handle auth flow
  const { login, hasLoginError } = useContext(UserContext);
  const { proceed } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Hooks for Auth
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

// Custom Styled components
const Wrapper = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(rgb(200, 217, 235) 0%, rgb(241, 244, 249) 60.28%);
`;
const Form = styled.form`
  border: 1px solid;
  height: 50vh;
  padding: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  font-family: "Helvetica";
  color: rgba(10, 68, 109);
  border-radius: 20px;
`;

const FieldSet = styled.fieldset`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 2vw;
  width: 50%;
  height: 15%;
  border-radius: 20px;
  margin: 1vw;
`;

const Button = styled.button`
  margin: 2px;
  padding: 4px;
  border-radius: 20px;
  color: white;
  background-color: rgba(10, 68, 109);
`;

const Header = styled.h1`
  text-align: center;
`;

const Error = styled.div`
  color: red;
`;
