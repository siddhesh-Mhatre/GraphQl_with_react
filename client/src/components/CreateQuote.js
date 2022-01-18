import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../gqloperation/muations";
import { GET_ALL_QUOTES } from "../gqloperation/queries";

const CreateQuote = () => {
  const [quote, setQuote] = useState("quote");
  const [createQuote,{loading,error,data}]= useMutation(CREATE_QUOTE,{
    refetchQueries:[
      'getAllQuotes',
      'getMyProfile'
    ]
  })
  if(error){console.log(error.message);}
  if(loading) return <h1>Loading</h1>
  if(data){console.log(data);}

  const handelSubmit = (e) => {
    e.preventDefault();
     console.log(quote);
     createQuote({
       variables:{
         name:quote
       }
     })
  };

  return (
    <div className="container my-container">
    {
      error  && 
      <div className="red card-panel">{error.message}</div>
    }
    {
      data  && 
      <div className="green card-panel">{data.quote}</div>
    }
      <form action="" onSubmit={handelSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="write your quote here"
        />
        <button className="btn green">Create</button>
      </form>
    </div>
  );
};

export default CreateQuote;
