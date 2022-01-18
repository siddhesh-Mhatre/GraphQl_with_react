import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP_USER } from "../gqloperation/muations";
const Signup = () => {
  const [formData, setformData] = useState({});
  const [signupUser,{data,loading,error}]= useMutation(SIGNUP_USER);
  if (loading) return <h1>Loading</h1>;
  if (error) {
    console.log(error.message);
  }



  const handelChange=(e)=>{
      setformData({
   ...formData,
    [e.target.name]:e.target.value
      })
  }
 

  const handelSubmit = (e) => {
    e.preventDefault();
    signupUser({
      variables:{
        userNew:formData
      }
    });
 
  };
  return (
    <div className="container my-container">

    {
      error  && 
      <div className="red card-panel">{error.message}</div>
    }

    {
      data && data.user && <div className="green card-panel">{data.user.firstName} is Signup You can login Now</div>
    }
      <h5>Signup!!</h5>
      <form onSubmit={(e) => handelSubmit(e)}>
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          onChange={handelChange}
          required
        />
        <input
          type="text"
          placeholder="last name"
          name="lastName"
          onChange={handelChange}
          required
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handelChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          email="password"
          name="password"
          onChange={handelChange}
          required
        />

<Link to="/login"> <p>All ready have an account</p></Link>  

        <button className="btn #4a148c purple darken-4" type="submit">
          Signin
        </button>
      </form>
    </div>
  );
};

export default Signup;












 