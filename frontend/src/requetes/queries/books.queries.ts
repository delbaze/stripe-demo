import { gql } from "@apollo/client";

export const LIST_BOOKS = gql`
    query Books {
        books {
            title
            id
        }
    }
`;
