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
    <div className="bg-white shadow-md mx-auto mt-3 md:block md:w-1/2 rounded-md">
      <div className="flex justify-between items-center">
        <div className="mt-2.5 mx-3 flex justify-center items-center">
          <Avatar
            src={`http://localhost:8888/api/user/photo/${post.PostedBy._id}`}
          />
          <h4 className="pl-2 font-medium">
            {post.PostedBy.UserName}
            <p className="text-gray-400 font-normal text-xs pt-0.5">{date.toLocaleDateString()}</p>
          </h4>
        </div>
        {post.PostedBy._id === userId ? (
          <span
            className="p-1 rounded-full"
            onClick={toggeler}
            style={{ cursor: "pointer" }}
          >
            <MoreVertIcon />
            <div className={toggle ? "delete__post bg-white" : "d-none"}>
              <div
                className="conter_delete flex"
                onClick={() => {
                  dispatch(deletePost(postId, token));
                }}
              >
                <DeleteIcon />
                <p className="font-bold text-md mb-0">Remove</p>
              </div>
            </div>
          </span>
        ) : (
          <></>
        )}
      </div>
        <div className="">
          <div className="mx-3 my-2">{post.text}</div>
        </div>
        <div className="px-0 w-full">
          <img
          className="w-full object-cover"
            src="https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png"
            alt="postimage"
          />
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
              <small className="font-bold ml-2">
                {post.likes.length}
              </small>
            </h5>
          ) : (
            <h5 className="flex items-center">
              <i
                className="far fa-heart text-2xl"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(Like(userId, postId, token));
                  checkLike();
                }}
              ></i>
              <small className="font-bold ml-2">
                {post.likes.length}
              </small>
            </h5>
          )}
        </div>
        <div className="pl-4 flex items-center">
         <i className="far fa-comment-dots text-2xl"></i>
          <small className="font-weight-bold ml-2">
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
          className="input_comment"
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
