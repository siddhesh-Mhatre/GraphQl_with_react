import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_ALL_QUOTES } from "../gqloperation/queries";
import { Link } from "react-router-dom";
import Loading from "./Loading";
const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  if (loading) return <Loading/>;
  if (error) {
    console.log(error.message);
  }
  if(data.quotes.length ==0){
    return <h2>No Quotes Available</h2>
  }
 
  return (
    <div className="container">
      {data.quotes.map((quote,ind) => {
        return (
          <blockquote key={ind}>
            <h6>{quote.name}</h6>
         <Link to={`/profile/${quote.by._id}`}><p className="right-align">~{quote.by.firstName}</p></Link>    
          </blockquote>
        );
      })}

   
    </div>
  );
};

export default Home;
