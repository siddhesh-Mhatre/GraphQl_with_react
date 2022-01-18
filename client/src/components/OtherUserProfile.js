import { useQuery } from "@apollo/client";
import React from "react";
import {GET_USER_BY_ID } from "../gqloperation/queries";
import {useParams} from "react-router-dom" 
const OtherUserProfile = () => {
    const {userid}=useParams()
 
  const { loading, error, data } = useQuery(GET_USER_BY_ID,{
      variables:{userid}
  });
 


  if (loading) return <h2>Profile is Loading</h2>;
  

  if (error) {
    console.log(error);
  }
  console.log(data.user.quotes);
  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt=""
          srcset=""
        />
        <h5>
          {data.user.firstName}
          {data.user.lastName}
        </h5>
        <h6>Email - {data.user.email}</h6>
      </div>
      <h3>your quots</h3>
      {data.user.quotes.map((quo) => {
        return (
          <>
            <blockquote>
              <h6>{quo.name}</h6>
            </blockquote>
          </>
        );
      })}
    </div>
  );
};

export default OtherUserProfile;
