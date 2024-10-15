import { gql } from '@apollo/client';

export const GET_ALL_ONE_ON_ONE_ROOMS = gql`
  query GetAllOneOnOneRooms {
    getAllOneOnOneRooms {
      roomName
      id
      users {
        id
        emailId
        userName
      }
    }
  }
`;

export const GET_ALL_GROUPS = gql`
  query GetAllGroups($pagination: GetPaginationInput!) {
    getAllGroups(pagination: $pagination) {
      totalCount
      rooms {
        roomName
        id
        users {
          id
          emailId
          userName
        }
      }
    }
  }
`;

export const GET_ALL_USER = gql`
  query GetAllUser($pagination: GetPaginationInput!) {
    getAllUser(pagination: $pagination) {
      totalCount
      users {
        id
        emailId
        userName
      }
    }
  }
`;

export const CHECK_ROOM_ALREADY_EXIST = gql`
  query CheckRoomAlreadyExist($senderId: String!, $recipientId: String!) {
    checkRoomAlreadyExist(senderId: $senderId, recipientId: $recipientId) {
      id
      roomName
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation CreateRoom($createRoomInput: CreateRoomInput!) {
    createRoom(createRoomInput: $createRoomInput) {
      id
    }
  }
`;

export const GET_ROOM_BY_ID = gql`
  query GetRoomById($id: String!) {
    getRoomById(id: $id) {
      id
      roomName
      users {
        userName
        id
        emailId
        profileUrl
      }
      messages {
        message
        id
        user {
          id
          emailId
          profileUrl
          userName
        }
      }
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      id
    }
  }
`;

export const GET_ALL_MESSAGES = gql`
  query GetAllMessagesByRoomId($id: String!, $pagination: GetPaginationInput!) {
    getAllMessagesByRoomId(id: $id, pagination: $pagination) {
      totalCount
      messages {
        id
        message
        user {
          id
          profileUrl
        }
        room {
          id
        }
        createdAt
      }
    }
  }
`;
