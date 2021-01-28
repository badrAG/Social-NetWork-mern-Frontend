import { Avatar } from "@material-ui/core";
import React from "react";

const PostsLoading = () => {
  return (
    <div className="post__container w-full dark:bg-gray-700 shadow-md md:mx-auto mt-3 md:block md:w-5/6 rounded-md transition duration-500">
      <div className="mt-3 mx-3 pt-3 flex items-center ">
        <div className="w-12 h-12 rounded-full bg-gray-400 animate-pulse"></div>
        <div className="pl-2 animate-pulse">
          <p className="bg-gray-400 font-normal h-2 w-16 rounded-full pt-0.5"></p>
          <p className="bg-gray-400 font-normal h-2 w-14 mt-1.5 rounded-full pt-0.5"></p>
        </div>
      </div>
      <div className="bg-gray-400 ml-3.5 h-2 w-48 mt-2.5 rounded-full pt-0.5 animate-pulse"></div>
      <div className="bg-gray-400 ml-3.5 h-2 w-32 mt-1.5 rounded-full pt-0.5 animate-pulse"></div>
      <div className="h-60"></div>
      <div className="mt-3 mx-3 flex items-center pb-4 animate-pulse">
          <p className="bg-gray-400 font-normal h-2 w-16 rounded-full pt-0.5"></p>
          <p className="bg-gray-400 font-normal h-2 w-16 ml-3 rounded-full pt-0.5"></p>
      </div>
    </div>
    
  );
};

export default PostsLoading;
