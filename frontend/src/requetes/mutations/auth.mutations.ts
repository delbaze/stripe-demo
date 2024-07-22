import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($infos: InputRegister!) {
    register(infos: $infos) {
      id
      email
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      expirationDate
      id
      resetToken
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($data: InputChangePassword!) {
    changePassword(data: $data) {
      message
      success
    }
  }
`;
