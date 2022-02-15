// Hack the North 2022 Frontend Developer Challenge
// Tailai Wang
// Profile Page

import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/userContext";
import { request } from "graphql-request";
import { sampleEventsQuery } from "../utils/queries";
import Event from "./EventCard";
import moment from "moment";
import styled from "styled-components";
import { Audio } from "react-loader-spinner";

const Profile = () => {
  // Context to Handle Auth Flow (Logout)
  const { user, logout } = useContext(UserContext);

  // Make GraphQL Query and store in state
  const [apiResponse, setApiResponse] = useState(null);
  const [activeEvent, setActiveEvent] = useState({});
  const [showEvent, setShowEvent] = useState(false);
  const [loading, setLoading] = useState(false);

  // API Request, keeps private/public events based on auth status
  useEffect(() => {
    setLoading(true);
    request("https://api.hackthenorth.com/v3/graphql", sampleEventsQuery).then(
      (data) => {
        if (user.username == "Guest") {
          var appendValue = [];
          data.sampleEvents.map(function (event) {
            if (event.permission == "public") {
              appendValue.push(event);
            }
          });
          setApiResponse(appendValue);
        } else {
          setApiResponse(data.sampleEvents);
        }
      }
    );
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Sort Events by Start Time
  const onStartSort = (e) => {
    e.preventDefault();
    let sortedAsceding = apiResponse.sort((a, b) => {
      return a.start_time - b.start_time;
    });
    setApiResponse([...sortedAsceding]);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  // Sort Events by ID
  const onIdSort = (e) => {
    e.preventDefault();
    let sortedAsceding = apiResponse.sort((a, b) => {
      return a.id - b.id;
    });
    setApiResponse([...sortedAsceding]);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  // Activate new Event Popup
  const onCardOpen = (id) => {
    let updatedValue = apiResponse[id];
    setActiveEvent((activeEvent) => updatedValue);
    setShowEvent(true);
    document.body.style.overflow = "hidden";
  };

  const onCardClose = () => {
    let updatedValue = {};
    setActiveEvent((activeEvent) => updatedValue);
    setShowEvent(false);
    document.body.style.overflow = "visible";
  };

  return (
    <Wrapper active={showEvent}>
      <EventWrapper active={showEvent}>
        {showEvent && (
          <Event event={activeEvent} related={apiResponse} close={onCardClose}/>
        )}
      </EventWrapper>
      <h1>Welcome {user.username}!</h1>
      {user.username == "Guest" ? (
        <Button onClick={logout}>Login to View All Events</Button>
      ) : (
        <Button onClick={logout}>Logout</Button>
      )}
      <span>
        <Button onClick={onStartSort}>Sort by Start Time</Button>
        <Button onClick={onIdSort}>Sort by ID</Button>
      </span>

      <div>
        {loading === false ? (
          <div>
            {apiResponse &&
              apiResponse.map((item, index) => {
                return (
                  <Card
                    key={index}
                    onClick={() => {
                      onCardOpen(index);
                    }}
                  >
                    <h1>{item.name}</h1>
                    <p>
                      {moment(item.start_time).format("dddd, h:mma")} to{" "}
                      {moment(item.end_time).format("h:mma")}
                    </p>
                    <p>{item.description}</p>
                  </Card>
                );
              })}
          </div>
        ) : (
          <LoadingWrapper>
            <Audio
              background="none"
              height="100"
              width="100"
              color="grey"
              ariaLabel="loading"
            />
          </LoadingWrapper>
        )}
      </div>
    </Wrapper>
  );
};

export default Profile;

// Custom Styled components
const LoadingWrapper = styled.div`
  height: 100%;
`;

const EventWrapper = styled.div`
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

const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(rgb(200, 217, 235) 0%, rgb(241, 244, 249) 60.28%);
  ${({ active }) => active && `pointer-events: none;`}
`;

const Button = styled.button`
  margin: 2px;
  padding: 4px;
  border-radius: 20px;
  color: white;
  background-color: rgba(10, 68, 109);
`;

const Card = styled.div`
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
