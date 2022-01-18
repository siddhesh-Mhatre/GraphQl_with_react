import {gql} from "apollo-server-express";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id:ID!):User   
    quotes:[QuoteWithName]
    iquote(by:ID!):[Quote]
    myprofile:User
  }
type QuoteWithName{
  name:String
  by:IdName
}
type IdName{
  _id:String
  firstName:String
}

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    quotes:[Quote]
    password:String!
  }
  type Quote{
        name:String!
        by:ID!
  }

type Token{
  token:String!
}
type deletedQuote{
  quote:String!
}
  type Mutation{
    signupUser(userNew:UserInput!): User
    signinUser(userSignin:UserSigninInput!):Token
    createQuote(name:String!):String
    deleteQuote(QuoteInfo:QuoteData!):String
    editQuote(Editequote:EditedQuoteData!):String
  }

  
   input QuoteData{
    name:String!
    by:ID!
    UpadtedQuote:String
   }
   input EditedQuoteData{
    name:String!
    by:ID!
    UpadtedQuote:String!
   }
  input UserInput{
    firstName: String!
    lastName: String!
    email: String!
    password:String!
  }

  input UserSigninInput{
    email: String!
    password:String!
  }

`; // createing schema

export default typeDefs