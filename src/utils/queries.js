// Hack the North 2022 Frontend Developer Challenge 
// Tailai Wang
// GraphQL Query Constants 

import { gql } from "graphql-request";

// GraphQL Query for All Events
export const sampleEventsQuery = gql`
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

