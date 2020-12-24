import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getStories } from "../../redux/actions/storyAction";
import { isLogged } from "../../helpers/auth";

function Stories({ openStory }) {
  const token = isLogged() && isLogged().token;
  const userId = isLogged() && isLogged().user._id;
  const dispatch = useDispatch();
  const story = useSelector(state => state.story)
  useEffect(() => {
    dispatch(getStories(token, userId));
  }, [dispatch, token, userId]);

  return (
    <div className="dark:bg-gray-700 p-1 shadow-md mx-auto mt-3 md:block md:w-1/2 rounded-md transition duration-500">
      <div className="flex items-start space-x-2 overflow-x-auto">
        <Avatar
          className="cursor-pointer"
          src={`http://localhost:8888/api/user/photo/${userId && userId}`}
          onClick={() => openStory()}
        />
        {story.state.stories && story.state.stories?.map((item, i) => (
          <Link key={i} to={`/story/@${item.StoryBy.UserName}/${item._id}`}>
            <Avatar
              className="border-green-600 border-2 cursor-pointer"
              src={`http://localhost:8888/api/user/photo/${item?.StoryBy._id}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Stories;
