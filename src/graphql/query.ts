import { gql } from "@apollo/client";

export interface SearchQueryRepositoryNodeProps {
  id: string;
  name: string;
  description: string;
  url: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface SearchQueryRepositoryProps {
  search: {
    nodes: SearchQueryRepositoryNodeProps[];
    pageInfo?: {
      endCursor?: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    repositoryCount?: number;
  };
}

export const searchQueryRepository = gql`
  query Repository(
    $query: String!
    $type: SearchType!
    $after: String
    $first: Int
  ) {
    search(query: $query, type: $type, after: $after, first: $first) {
      nodes {
        ... on Repository {
          name
          description
          url
          updatedAt
          createdAt
          id
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      repositoryCount
    }
  }
`;

export interface SearchQueryUsersNodeProps {
  id: string;
  email: string;
  location: string;
  name: string;
  url: string;
}

export interface SearchQueryUsersProps {
  search: {
    nodes: SearchQueryUsersNodeProps[];
    pageInfo?: {
      endCursor?: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    userCount?: number;
  };
}

export const searchQueryUsers = gql`
  query Users(
    $query: String!
    $type: SearchType!
    $after: String
    $first: Int
  ) {
    search(query: $query, type: $type, after: $after, first: $first) {
      nodes {
        ... on User {
          id
          email
          location
          name
          url
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      userCount
    }
  }
`;
