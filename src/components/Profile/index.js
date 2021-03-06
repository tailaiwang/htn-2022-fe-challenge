// Hack the North 2022 Frontend Developer Challenge
// Tailai Wang
// Profile Page

import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../contexts/userContext";
import { request } from "graphql-request";
import { sampleEventsQuery } from "../../utils/queries";
import Event from "../EventCard";
import { Card, Button, Wrapper, EventWrapper, LoadingWrapper } from "./style";
import moment from "moment";
import { Audio } from "react-loader-spinner";

const Profile = () => {
  // Context to Handle Auth Flow (Logout)
  const { user, logout } = useContext(UserContext);

  // Make GraphQL Query and store in state
  const [apiResponse, setApiResponse] = useState(null);
  const [availableEvents, setAvailableEvents] = useState(null);
  // State Variables to handle showing event in popup
  const [activeEvent, setActiveEvent] = useState({});
  const [showEvent, setShowEvent] = useState(false);
  // State Variable to show loading animation
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
          setAvailableEvents(appendValue);
        } else {
          setAvailableEvents(data.sampleEvents);
        }
        setApiResponse(data.sampleEvents);
      }
    );
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Hooks for Various Button
  // Sort Events by Start Time
  const onStartSort = (e) => {
    e.preventDefault();
    let sortedAsceding = availableEvents.sort((a, b) => {
      return a.start_time - b.start_time;
    });
    setAvailableEvents([...sortedAsceding]);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  // Sort Events by ID
  const onIdSort = (e) => {
    e.preventDefault();
    let sortedAsceding = availableEvents.sort((a, b) => {
      return a.id - b.id;
    });
    setAvailableEvents([...sortedAsceding]);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  // Activate new Event Popup
  const onCardOpen = (id) => {
    let updatedValue = availableEvents[id];
    setActiveEvent((activeEvent) => updatedValue);
    setShowEvent(true);
    document.body.style.overflow = "hidden";
  };

  // Close Event Popup
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
          <Event
            event={activeEvent}
            related={apiResponse}
            close={onCardClose}
          />
        )}
      </EventWrapper>
      {loading === false ? (
        <>
          <h1>{user.username}&apos;s Hackathon Global Portal</h1>
          <p>Click on cards to learn more!</p>
        </>
      ) : (
        <h1>Welcome {user.username}!</h1>
      )}

      {user.username == "Guest" && loading === false ? (
        <Button onClick={logout}>Login to View All Events</Button>
      ) : (
        loading === false && <Button onClick={logout}>Logout</Button>
      )}

      {loading === false && (
        <span>
          <Button onClick={onStartSort}>Sort by Start Time</Button>
          <Button onClick={onIdSort}>Sort by ID</Button>
        </span>
      )}

      <div>
        {loading === false ? (
          <div>
            {availableEvents &&
              availableEvents.map((item, index) => {
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
            <span>Loading...</span>
          </LoadingWrapper>
        )}
      </div>
    </Wrapper>
  );
};

export default Profile;
