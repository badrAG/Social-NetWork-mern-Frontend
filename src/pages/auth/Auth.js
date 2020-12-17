import React, { useState } from "react";
import LogIn from "../login/LogIn";
import SignUp from "../SignUp/SignUp";
import logo from "../../asset/logo.png";
import image from "../../asset/image.png";
import "./Auth.css";
function Auth({toggleLink}) {
  const [toggle, setToggle] = useState(toggleLink);
  const toggeler = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div className="ralative h-screen">
      <div
        className={
          toggle
            ? "flex items-center justify-center bg-gradient-to-b from-green-600 via-green-500 to-yellow-200 rounded-b-full w-screen shadow-md h-2/5"
            : "flex items-center justify-center h-1/4"
        }
      >
        <div>
          {toggle ? (
            <img src={image} className="h-20" alt="logo" />
          ) : (
            <img src={logo} className="h-20" alt="logo" />
          )}
          <div>
            {toggle ? (
              <p className="text-3xl font-mono pt-3 text-gray-100 font-bold">
                LogIn
              </p>
            ) : (
              <p className="text-3xl font-mono pt-3 text-green-600 font-bold">
                SignUp
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          toggle
            ? "flex items-center justify-center h-1/2 z-40"
            : "flex items-center justify-center bg-gradient-to-t from-green-600 via-green-500 to-yellow-200 h-3/4 z-40  shadow-xl rounded-t-full"
        }
      >
        <div className="w-full ml-16">
          {toggle ? <LogIn /> : <SignUp />}{" "}
          <div onClick={() => toggeler()} className="cursor-pointer">
            {toggle ? (
              <p className="pl-1 pt-2 hover:text-green-400">
                create new account
              </p>
            ) : (
              <p className="pl-1 pt-2 text-white text-center hover:text-green-400 bg-green-700 w-10/12 pb-1.5 mt-2.5 rounded-full">
                LogIn
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          toggle
            ? "absolute w-36 h-36 rounded-full bg-green-600 -bottom-12 -right-12 shadow-lg"
            : "absolute w-36 h-36 rounded-full bg-gray-100 -bottom-12 -right-12 shadow-lg"
        }
      ></div>
      <div
        className={
          toggle
            ? ""
            : "absolute w-44 h-44 rounded-full bg-gray-100 top-2/3 -left-32 shadow-lg"
        }
      ></div>
      <div
      style={{zIndex:"-1"}}
        className={toggle ?"absolute z-10 w-52 h-52 rounded-full bg-green-600 top-1/3 -left-32 shadow-lg":""}
      ></div>
      <div
        className={
          toggle
            ? "absolute w-52 h-52 rounded-full bg-green-600 top-1/3 -left-32 shadow-lg"
            : "absolute w-28 h-28 rounded-full bg-gradient-to-r from-green-600 via-green-500 to-yellow-200 top-16 -left-16 shadow-lg"
        }
      ></div>
    </div>
  );
}

export default Auth;
