import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import myHost from "../../../config";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${myHost}/user/login`,
        { ...user },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      if (err) {
        console.log(err.response.data.msg);
        console.log(err);
      }
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />

        <input
          type="password"
          name="password"
          required
          autoComplete="on"
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />

        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
