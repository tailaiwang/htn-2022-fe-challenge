import React, { useState, useContext } from "react";
import UserContext from "../../contexts/userContext";
import moment from "moment";
import { Wrapper, Button } from "./style";

export default function Event({ close: closeWrapper, related, event }) {
  const { user, logout } = useContext(UserContext);
  // State Variable (Derived from props) for event info on popup
  const [curEvent, setCurEvent] = useState(event);
  // Update Event Info based on related events button
  const newCard = (id) => {
    let updatedValue = related[id - 1];
    setCurEvent((curEvent) => updatedValue);
  };

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
        {curEvent.related_events.length != 0 && (
          <span>Click for Related Event(s):</span>
        )}
        {curEvent.related_events.map((event, index) => {
          if (
            related[event - 1].permission == "private" &&
            user.username == "Guest"
          ) {
            return <></>;
          }
          return (
            <Button
              onClick={() => {
                newCard(event);
              }}
              key={index}
            >
              {event}
            </Button>
          );
        })}
      </span>
    </Wrapper>
  );
}
