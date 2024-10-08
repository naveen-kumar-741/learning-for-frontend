import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation Mutation($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUserData {
    getCurrentUserData {
      id
      userName
      emailId
      firstName
      lastName
      mobileNumber
      profileUrl
    }
  }
`;
