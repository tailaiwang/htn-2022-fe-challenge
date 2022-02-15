import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";




export default function Event({
  close: closeWrapper,
  related,
  event,
}) {

  const [curEvent, setCurEvent] = useState(event);

  const newCard = (id) => {
    let updatedValue = related[id - 1];
    setCurEvent((curEvent) => updatedValue);
    console.log("Hi");
  }

  return (
    <Wrapper>
      <Button onClick={closeWrapper}>Exit</Button>
      <h1>{curEvent.name}</h1>
      <p>
        {moment(curEvent.start_time).format("dddd, h:mma")} to{" "}
        {moment(curEvent.end_time).format("h:mma")}
      </p>
      <p>{curEvent.description}</p>
      <span>
        Related Event(s):
        {curEvent.related_events.map((event, index) => {
          return (
            <Button onClick={() => {newCard(event)}} key={index}>
              {event}
            </Button>
          );
        })}
      </span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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

const Button = styled.button`
  pointer-events: auto;
  margin: 2px;
  padding: 4px;
  border-radius: 20px;
  color: white;
  background-color: rgba(10, 68, 109);
`;
