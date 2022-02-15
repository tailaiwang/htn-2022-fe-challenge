import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(rgb(200, 217, 235) 0%, rgb(241, 244, 249) 60.28%);
`;

export const Form = styled.form`
  border: 1px solid;
  min-height: 50vh;
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

export const FieldSet = styled.fieldset`
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

export const Button = styled.button`
  margin: 2px;
  padding: 4px;
  border-radius: 20px;
  color: white;
  background-color: rgba(10, 68, 109);
`;

export const Header = styled.h1`
  text-align: center;
`;

export const Error = styled.div`
  color: red;
`;
