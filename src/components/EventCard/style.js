import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px solid;
  border-radius: 20px;
  text-align: center;
  width: max(50vw, 350px);
  padding: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  font-family: "Helvetica";
  color: rgba(10, 68, 109);
`;

export const Button = styled.button`
  pointer-events: auto;
  margin: 2px;
  padding: 4px;
  border-radius: 20px;
  color: white;
  background-color: rgba(10, 68, 109);
`;
