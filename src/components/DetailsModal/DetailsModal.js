import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { addComment, deletePost, Like, unLike } from "../../redux/actions/postAction";
import { isLogged } from "../../helpers/auth";
import Comments from "../comments/Comments";

const DetailsModal = ({ item, type , openModal }) => {
const user = isLogged().user
const [liked, setLiked] = useState();
const token = isLogged().token
const [comments, setComments] = useState([]);
const [text, setText] = useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    setComments(item?.comments);
    checkLike();
  }, [liked, item.likes,item.comments]);
  const checkLike = () => {
    setLiked(false);
    item.likes.find((like) => {
      if (like === user._id) {
        setLiked(true);
      }
    });
  };
  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50">
        <div className='flex items-center justify-end mr-4 mt-3'>
          <span
            onClick={openModal}
            className=" text-lg px-2 font-medium text-gray-50 cursor-pointer rounded-full hover:text-gray-800 hover:bg-gray-300"
          >
            X
          </span>
        </div>
        <div className="flex justify-center w-auto h-full">
      <div className="relative h-5/6 w-5/6 md:w-9/12 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex w-full h-full">
          <div className="flex-1">
          <div className="md:hidden pb-2 flex justify-between items-center">
              <div className="mt-2.5 mx-3 flex justify-center items-center">
                <Avatar src={item.PostedBy.image ? item.PostedBy.image : ""} />
                <h4 className="pl-2 font-medium dark:text-gray-200">
                  <Link className="no-underline" to={`/@${item.PostedBy._id}`}>
                    {item.PostedBy.UserName}
                  </Link>
                  <p className="text-gray-400 font-normal text-xs pt-0.5">
                    {moment(item.createdAt).fromNow(true)}
                  </p>
                </h4>
              </div>
            </div>
            <div className="w-full h-4/5 md:h-full  flex items-center">
              {type ? (
                <img
                  className="w-full h-full object-cover"
                  src={item.image}
                  alt="image"
                />
              ) : (
                <iframe
                  className="w-full h-2/3"
                  src={item.video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={item.video}
                ></iframe>
              )}
            </div>
            <div className="md:hidden flex items-center pl-3 py-2">
          {liked ? (
            <h5 className="flex items-center">
              <i
                className="fas fa-heart text-2xl text-red-500"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(unLike(user._id, item._id, token));
                  checkLike();
                }}
              ></i>
              <small className="font-bold ml-2 dark:text-gray-300">
                {item.likes.length}
              </small>
            </h5>
          ) : (
            <h5 className=" flex items-center">
              <i
                className="far fa-heart text-2xl dark:text-gray-300 transition duration-500"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(Like(user._id, item._id, token));
                  checkLike();
                }}
              ></i>
              <small className="font-bold ml-2 dark:text-gray-300 transition duration-500">
                {item.likes.length}
              </small>
            </h5>
          )}
          <div className="pl-4 flex items-center">
         <i className="far fa-comment-dots text-2xl dark:text-gray-300 transition duration-500"></i>
          <small className="font-bold ml-2 dark:text-gray-300 transition duration-500">
            {item.comments.length}
          </small>
        </div>
        </div>
          </div>
          <div className="md:flex-1 md:block hidden">
            <div className="flex justify-between items-center">
              <div className="mt-2.5 mx-3 flex justify-center items-center">
                <Avatar src={item.PostedBy.image ? item.PostedBy.image : ""} />
                <h4 className="pl-2 font-medium dark:text-gray-200">
                  <Link className="no-underline" to={`/@${item.PostedBy._id}`}>
                    {item.PostedBy.UserName}
                  </Link>
                  <p className="text-gray-400 font-normal text-xs pt-0.5">
                    {moment(item.createdAt).fromNow(true)}
                  </p>
                </h4>
              </div>
            </div>
            <div className="px-4 h-3/4 overflow-x-auto pt-4">
            {
        comments?.map((comment,i) => (
          <Comments comment={comment && comment} key={i} postBy={item?.PostedBy._id} postId={item._id}/>
        ))
      }
            </div>
            <div className="flex items-center px-4 py-2">
        <div className="">
          {liked ? (
            <h5 className="flex items-center">
              <i
                className="fas fa-heart text-2xl text-red-500"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(unLike(user._id, item._id, token));
                  checkLike();
                }}
              ></i>
              <small className="font-bold ml-2 dark:text-gray-300">
                {item.likes.length}
              </small>
            </h5>
          ) : (
            <h5 className="flex items-center">
              <i
                className="far fa-heart text-2xl dark:text-gray-300 transition duration-500"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(Like(user._id, item._id, token));
                  checkLike();
                }}
              ></i>
              <small className="font-bold ml-2 dark:text-gray-300 transition duration-500">
                {item.likes.length}
              </small>
            </h5>
          )}
        </div>
        <div className="pl-4 flex items-center">
         <i className="far fa-comment-dots text-2xl dark:text-gray-300 transition duration-500"></i>
          <small className="font-bold ml-2 dark:text-gray-300 transition duration-500">
            {item.comments.length}
          </small>
        </div>
      </div>
            <div className="flex justify-between pb-2 px-2 bottom-0 comment">
        <Avatar
          className="avatar_comment"
          src={user?.image}
        />
        <input
          type="text"
          name="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(addComment(text, user._id, item._id, token));
              setText("");
            }
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="border-none dark:bg-gray-500 dark:text-gray-100 bg-gray-300 rounded-xl w-full text-sm ml-1 py-1 pl-2 focus:outline-none transition duration-500"
        />
      </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
