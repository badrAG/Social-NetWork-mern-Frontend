import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import "../posts/Posts.css";
import {
  unLike,
  deletePost,
  addComment,
  Like,
} from "../../redux/actions/postAction";
import { isLogged } from "../../helpers/auth";
import { useDispatch } from "react-redux";
import Comments from "../comments/Comments";
import { Link } from "react-router-dom";
function Posts({ post }) {
  const userId = isLogged()?.user._id;
  const token = isLogged()?.token;
  const postId = post._id;
  const date = new Date(post.createdAt);
  const [liked, setLiked] = useState();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setComments(post?.comments);
    checkLike();
  }, [liked, post.likes,post.comments]);
 
  const toggeler = () => {
    setToggle((prev) => !prev);
  };

  const checkLike = () => {
    setLiked(false);
    post.likes.find((like) => {
      if (like === userId) {
        setLiked(true);
      }
    });
  };
   return (
    <div className="post__container w-full dark:bg-gray-700 shadow-md md:mx-auto mt-3 md:block md:w-1/2 rounded-md transition duration-500">
      <div className="flex justify-between items-center">
        <div className="mt-2.5 mx-3 flex justify-center items-center">
          <Avatar
            src={`http://localhost:8888/api/user/photo/${post.PostedBy._id}`}
          />
          <h4 className="pl-2 font-medium dark:text-gray-200">
            <Link className="no-underline" to={`/@${post.PostedBy._id}`}>
            {post.PostedBy.UserName}
            </Link>
            <p className="text-gray-400 font-normal text-xs pt-0.5">{date.toLocaleDateString()}</p>
          </h4>
        </div>
        {post.PostedBy._id === userId ? (
          <span
            className="p-1 rounded-full"
            onClick={toggeler}
            style={{ cursor: "pointer" }}
          >
            <MoreVertIcon className="dark:text-gray-200 transition duration-500" />
            <div className={toggle ? "delete__post absolute rounded-lg shadow-md p-2 flex dark:bg-gray-600 transition duration-500" : "hidden"}>
              <div
                className="conter_delete flex"
                onClick={() => {
                  dispatch(deletePost(postId, token));
                }}
              >
                <DeleteIcon />
                <p className="font-bold text-md mb-0 dark:text-gray-200 transition duration-500">Remove</p>
              </div>
            </div>
          </span>
        ) : (
          <></>
        )}
      </div>
        <div className="">
          <div className="mx-3 my-2 dark:text-white transition duration-500">{post.text}</div>
        </div>
        <div className="px-0 w-full ">
          {post.image && <img
          className="w-full h-full"
            src={post.image}
            alt="postimage"
          />
          }
          { post.video && 
          <iframe
          className="w-full h-80"
          src={post.video}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={post.video}
        ></iframe>}
      </div>
      <div className="flex items-center px-4 py-2">
        <div className="">
          {liked ? (
            <h5 className="flex items-center">
              <i
                className="fas fa-heart text-2xl text-red-500"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(unLike(userId, postId, token));
                  checkLike();
                }}
              ></i>
              <small className="font-bold ml-2 dark:text-gray-300">
                {post.likes.length}
              </small>
            </h5>
          ) : (
            <h5 className="flex items-center">
              <i
                className="far fa-heart text-2xl dark:text-gray-300 transition duration-500"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(Like(userId, postId, token));
                  checkLike();
                }}
              ></i>
              <small className="font-bold ml-2 dark:text-gray-300 transition duration-500">
                {post.likes.length}
              </small>
            </h5>
          )}
        </div>
        <div className="pl-4 flex items-center">
         <i className="far fa-comment-dots text-2xl dark:text-gray-300 transition duration-500"></i>
          <small className="font-weight-bold ml-2 dark:text-gray-300 transition duration-500">
            {post.comments.length}
          </small>
        </div>
      </div>
      <div className="px-3">
      <div className="flex justify-between pb-2 comment">
        <Avatar
          className="avatar_comment"
          src={`http://localhost:8888/api/user/photo/${userId}`}
        />
        <input
          type="text"
          name="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(addComment(text, userId, postId, token));
              setText("");
            }
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="border-none dark:bg-gray-500 dark:text-gray-100 bg-gray-300 rounded-xl w-full text-sm ml-1 py-1 pl-1 focus:outline-none transition duration-500"
        />
      </div>
      {
        comments?.map((comment,i) => (
          <Comments comment={comment && comment} key={i} postBy={post?.PostedBy._id} postId={postId}/>
        ))
      }
    </div>
      </div>
   );
}

export default Posts;
