// Hack the North 2022 Frontend Developer Challenge
// Tailai Wang
// Profile Page

import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/userContext";
import { request, gql } from "graphql-request";
import styled from "styled-components";
import moment from "moment";

// GraphQL Query for All Events
const sampleEventsQuery = gql`
  {
    sampleEvents {
      id
      name
      event_type
      permission
      start_time
      end_time
      description
      speakers {
        name
        profile_pic
      }
      public_url
      private_url
      related_events
    }
  }
`;

const Profile = () => {
  // Context to Handle Auth Flow (Logout)
  const { user, logout } = useContext(UserContext);

  // Make GraphQL Query and store in state
  const [apiResponse, setApiResponse] = useState(null);
  useEffect(() => {
    request("https://api.hackthenorth.com/v3/graphql", sampleEventsQuery).then(
      (data) => setApiResponse(data.sampleEvents)
    );
  }, []);

  const onStartSort = (e) => {
    e.preventDefault();
    let sortedAsceding = apiResponse.sort((a, b) => {
      return a.start_time - b.start_time;
    });
    setApiResponse([...sortedAsceding])
  };

  const onIdSort = (e) => {
    e.preventDefault();
    let sortedAsceding = apiResponse.sort((a, b) => {
      return a.id - b.id;
    });
    setApiResponse([...sortedAsceding])
  };

  return (
    <Wrapper>
      <h1>Welcome {user.username}!</h1>
      <Button onClick={logout}>Logout</Button>
      <span>
        <Button onClick={onStartSort}>Sort by Start Time</Button>
        <Button onClick={onIdSort}>Sort by ID</Button>
      </span>
      
      <div>
        {apiResponse &&
          apiResponse.map((item, index) => {
            return (
              <Card key={index}>
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
    </Wrapper>
  );
};

export default Profile;

// Custom Styled components
const Wrapper = styled.div`
  max-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(rgb(200, 217, 235) 0%, rgb(241, 244, 249) 60.28%);
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
