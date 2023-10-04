import React, { useState } from "react";
import axios from "axios";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSnackbar } from "notistack";

const Login = () => {
  
  const { enqueueSnackbar } = useSnackbar();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      const results = data.data;
      localStorage.setItem("currentUser", JSON.stringify(results));
      if (results) {
        setName(" ");
        setPassword("");
        navigation("/");
      }
      enqueueSnackbar("user login seccessful", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.response.data, { variant: "error" });
      console.log("their is an error", error);
    }
  };

  return (
    <div className="from">
      <div>
        <label htmlFor="username">User Name</label>
        <br />
        <input
          type="text"
          name="username"
          value={username}
          placeholder="user name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
