import React, { useState } from "react";
import "./Register.scss";
import { useSnackbar } from "notistack";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
    phone: "",
  });

  const handlevalues = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.checked };
    });
  };

  const uploadImge = (event) => {
    const files = event.target.files[0];
    Resizer.imageFileResizer(
      files,
      300,
      300,
      "png",
      100,
      0,
      (uri) => {
        setFile(uri);
      },
      "base64"
    );
  };

  const handleRegister = async () => {
    try {
      const data = await axios.post(
        "http://localhost:8000/api/auth/register",
        { ...user, img: file },
        { withCredentials: true }
      );
      enqueueSnackbar(data.data, { variant: "success" });
      navigate("/login");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("please file the valid data", { variant: "error" });
    }
  };

  return (
    <>
      <div>
        <main className="main-div">
          <div className="right-div">
            <h1>create a new account</h1>
            <div>
              <label htmlFor="name">User Name</label>
              <br />
              <input
                type="text"
                id="name"
                name="username"
                placeholder=" username"
                onChange={handlevalues}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                onChange={handlevalues}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                onChange={handlevalues}
              />
            </div>
            <div>
              <label htmlFor="file">Profile Picture</label>
              <br />
              <input
                type="file"
                id="file"
                name="img"
                accept="image/*"
                onChange={uploadImge}
              />
            </div>
            <div>
              <label htmlFor="Country">Country</label>
              <br />
              <input
                type="text"
                id="Country"
                name="country"
                placeholder="usa"
                onChange={handlevalues}
              />
            </div>
          </div>
          <div className="left-div">
            <h1>i wont to become a seller</h1>
            <div>
              <label htmlFor="">Activate the seller account</label>
              <input
                type="checkBox"
                name="isSeller"
                style={{ width: "120px" }}
                onChange={handleSeller}
              />
            </div>
            <div>
              <label htmlFor="">Phone Number</label>
              <br />
              <input
                type="number"
                name="phone"
                placeholder="phone number"
                onChange={handlevalues}
              />
            </div>
            <div>
              <label htmlFor="textarea">Description</label> <br />
              <textarea
                name="desc"
                id="textarea"
                cols="30"
                rows="10"
                placeholder="description"
                onChange={handlevalues}
              ></textarea>
            </div>
            <button className="btnregister" onClick={handleRegister}>
              register
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Register;
