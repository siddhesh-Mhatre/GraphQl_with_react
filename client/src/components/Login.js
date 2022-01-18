import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqloperation/muations";
import Loading from "./Loading";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const [signinUser, { error, loading, data }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.user.token);
      navigate("/");
    },
  });

  if (loading)
    return (
      <Loading/>
    );

  const handelChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    signinUser({
      variables: {
        usersignin: formData,
      },
    });
  };
  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      <h5>Login</h5>
      <form onSubmit={(e) => handelSubmit(e)}>
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
        <Link to="/signup">
          {" "}
          <p>Dont have an account</p>
        </Link>
        <button className="btn #4a148c purple darken-4" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
