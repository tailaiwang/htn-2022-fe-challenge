import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/userContext";
import { request, gql } from "graphql-request";
const query = gql`
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
  const { user, logout } = useContext(UserContext);

  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    request("https://api.hackthenorth.com/v3/graphql", query).then((data) =>
      console.log(data)
    );
  }, []);

  return (
    <div className="user-profile">
      <h1>Welcome {user.username}!</h1>
      <p>You&apos;re logged in now!</p>
      <button onClick={logout}>Logout</button>
      <div>{apiResponse}</div>
    </div>
  );
};

export default Profile;
