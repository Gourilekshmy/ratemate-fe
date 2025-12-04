import React, { useContext, useState } from "react";
import { faHouse, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { createUser, googleLogin, loginUser } from "../services/AllApi";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Auth = ({ insideRegister }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const registerUser = async () => {
    try {
      let apiResponse = await createUser(formData);
      if (apiResponse.status == 201) {
        toast("Successfully Registered!");
      } else {
        toast(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setFormData({
      userName: "",
      password: "",
      email: "",
    });
  };

  const login = async () => {
    try {
      let apiResponse = await loginUser(formData);
      if (apiResponse.status == 200) {
        toast("Login Successfull");

        localStorage.setItem("token", apiResponse.data.token);
        localStorage.setItem("user", JSON.stringify(apiResponse.data.user));
        if (apiResponse.data.user.email == "admin@gmail.com") {
          //navigate to admin home
          navigate("/admin-home");
        } else {
          //navigate to home
          navigate("/");
        }
      }
      console.log(apiResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-green-800 fixed w-full flex justify-between items-center px-4 lg:px-12 py-2 z-50">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img
            className="w-16"
            src="./src/assets/golden-star_259293-2443-removebg-preview.png"
            alt="RateMate Logo"
          />
          <h2 className="name text-2xl  font-bold ">RateMate</h2>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="text-white text-2xl lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>

        {/* Nav Links */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row gap-5 items-center absolute lg:static top-16 left-0 w-full lg:w-auto bg-green-800 lg:bg-transparent px-6 py-4 lg:p-0`}
        >
          <ul className="flex flex-col lg:flex-row gap-6 lg:gap-10 text-white">
            <li>
              <Link to={"/review"} onClick={() => setIsOpen(false)}>
                Write a Review
              </Link>
            </li>
            <li>
              <Link to={"/categories"} onClick={() => setIsOpen(false)}>
                Categories
              </Link>
            </li>
            <li>
              <Link to={"/"} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faHouse} />
              </Link>
            </li>
          </ul>

          <Link
            to={"/help"}
            className="text-white mt-2 lg:mt-0"
            onClick={() => setIsOpen(false)}
          >
            Help
          </Link>

          {!insideRegister?<div className="mt-2 lg:mt-0">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                handleGAuthDecode(credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>:<div className="me-10"></div>}
        </div>
      </div>

      <div id="auth" className="grid grid-cols-[3fr_2fr_3fr] py-50 ">
        <div></div>
        <div className=" rounded-2xl shadow-xl/30 p-8 bg-white">
          {insideRegister ? (
            <h1 className="text-center text-3xl font-bold mb-3">Register</h1>
          ) : (
            <h1 className="text-center text-3xl font-bold mb-3">Login</h1>
          )}{" "}
          <div>
            {insideRegister ? (
              <input
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                value={formData.userName}
                className=" rounded-xl p-2 bg-gray-100 mt-8"
                style={{ width: "320px" }}
                type="text"
                placeholder="  Enter UserName "
              />
            ) : (
              ""
            )}
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              className=" rounded-xl p-2 bg-gray-100 mt-5"
              style={{ width: "320px" }}
              type="text"
              placeholder="  Enter your email Address"
            />
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              className=" rounded-xl p-2 bg-gray-100 mt-5"
              style={{ width: "320px" }}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          {insideRegister ? (
            <button
              onClick={registerUser}
              className="rounded-xl text-white font-bold p-2 bg-green-500 mt-6"
              style={{ width: "320px" }}
            >
              Register
            </button>
          ) : (
            <button
              onClick={login}
              className="rounded-xl p-2 font-bold text-white bg-green-500 mt-6"
              style={{ width: "320px" }}
            >
              LogIn
            </button>
          )}
          {insideRegister ? (
            <h1 className="text-center mt-10 text-xl text-gray-400">
              Already a User?
              <Link to={"/login"} className="text-blue-500">
                LogIn
              </Link>
            </h1>
          ) : (
            <h1 className="text-center mt-10 text-xl text-gray-400">
              Not a User?
              <Link to={"/register"} className="text-blue-500">
                Register
              </Link>
            </h1>
          )}
        </div>

        <div></div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Auth;
