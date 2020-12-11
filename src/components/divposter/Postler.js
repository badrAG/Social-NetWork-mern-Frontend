import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import "./Postler.css";
import { isLogged } from "../../helpers/auth";
import { useDispatch } from "react-redux";
import { addPost, getAllPosts } from "../../redux/actions/postAction";

function Postler() {
  const userId = isLogged().user._id;
  const token = isLogged().token;
  const [post, setPost] = useState({
    text: "",
  });
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="postele dark:bg-gray-700 p-1 shadow-md mx-auto mt-3 md:block md:w-1/2 rounded-md transition duration-500">
      <div className="flex items-center justify-around p-2">
            <Avatar
              src={`http://localhost:8888/api/user/photo/${userId && userId}`}
            />
          <div className=" bg-gray-200 dark:bg-gray-500 rounded-2xl mx-1 w-full transition duration-500">
            <input
            className="border-none bg-transparent dark:text-gray-50 p-2 w-full outline-none"
              type="text"
              name="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(addPost(token, post, userId));
                  dispatch(getAllPosts(token, userId));
                  e.target.value = "";
                }
              }}
              onChange={(e) => {
                handleInputChange(e);
              }}
              placeholder="What on your mind..."
            />
          </div>
          <label className="bg-gray-200 dark:bg-gray-500 rounded-2xl cursor-pointer p-2 m-0 relative flex items-center w-20 text-gray-700 transition duration-500">
            <input type="file" className="absolute hidden overflow-hidden bottom-0" multiple accept="image/*" name="image" />
            <AddPhotoAlternateIcon className="file__icon dark:text-gray-300" />
            <h6 className="m-0 dark:text-gray-300">Photo</h6>
          </label>
        </div>
    </div>
  );
}

export default Postler;
