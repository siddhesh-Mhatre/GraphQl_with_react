import { gql } from "@apollo/client";
export const SIGNUP_USER = gql`
  mutation createUser($userNew: UserInput!) {
    user: signupUser(userNew: $userNew) {
      firstName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation SigninUser($usersignin: UserSigninInput!) {
    user: signinUser(userSignin: $usersignin) {
      token
    }
  }
`;

export const CREATE_QUOTE = gql`
mutation createQuote($name:String!){
  quote:createQuote(name:$name)
}`

export const DELETE_QUOTE = gql` 
mutation DeleteQuote($QuoteInfo:QuoteData!){
deleted_qote:deleteQuote(QuoteInfo:$QuoteInfo)
}`

export const EDIT_QUOTE=gql`

mutation Edite($Quoteinfo:EditedQuoteData!){
  Edited_qote:editQuote(Editequote:$Quoteinfo) 
  }
  
`
