import styled from "styled-components";

export const LoadingWrapper = styled.div`
  height: 100%;
  text-align: center;
`;

export const EventWrapper = styled.div`
  overflow-y: hidden;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
  ${({ active }) => active && `background-color: rgba(0, 0, 0, 0.6);`}
`;

export const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(rgb(200, 217, 235) 0%, rgb(241, 244, 249) 60.28%);
  ${({ active }) => active && `pointer-events: none;`}
`;

export const Button = styled.button`
  margin: 2px;
  padding: 4px;
  border-radius: 20px;
  color: white;
  background-color: rgba(10, 68, 109);
`;

export const Card = styled.div`
  width: 70vw;
  background-color: white;
  font-family: "Helvetica";
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  text-align: center;
  border: 2px solid;
`;
