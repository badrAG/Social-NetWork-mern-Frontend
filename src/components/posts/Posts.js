import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import "../posts/Posts.css";
import {
  unLike,
  deletePost,
  addComment,
  removeComment,
  Like,
} from "../../redux/actions/postAction";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
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
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div className="info__post">
          <Avatar
            src={`http://localhost:8888/api/user/photo/${post.PostedBy._id}`}
          />
          <h4 className="user__name">
            {post.PostedBy.UserName}
            <p className="timestimp__post">{date.toLocaleDateString()}</p>
          </h4>
        </div>
        {post.PostedBy._id === userId ? (
          <span
            className="option__post"
            onClick={toggeler}
            style={{ cursor: "pointer" }}
          >
            <MoreVertIcon />
            <div className={toggle ? "delete__post bg-white" : "d-none"}>
              <div
                className="conter_delete d-flex"
                onClick={() => {
                  dispatch(deletePost(postId, token));
                }}
              >
                <DeleteIcon />
                <p className="delete mb-0">Remove</p>
              </div>
            </div>
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="row">
        <div className="col col-md-12">
          <div className="description m-2">{post.text}</div>
        </div>
      </div>
      <div className="row">
        <div className="post__image col-12">
          <img
            src="https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png"
            alt="postimage"
          />
        </div>
      </div>
      <div className="d-flex justify-content-around reaction">
        <div className="">
          {liked ? (
            <h5>
              <i
                className="fas fa-heart text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(unLike(userId, postId, token));
                  checkLike();
                }}
              ></i>
              <small className="font-weight-bold ml-2">
                {post.likes.length}
              </small>
            </h5>
          ) : (
            <h5>
              <i
                className="far fa-heart"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(Like(userId, postId, token));
                  checkLike();
                }}
              ></i>
              <small className="font-weight-bold ml-2">
                {post.likes.length}
              </small>
            </h5>
          )}
        </div>
        <div className="comments">
          <ChatBubbleOutlineIcon />
          <small className="font-weight-bold ml-2">
            {post.comments.length}
          </small>
        </div>
      </div>
      <div className="d-flex justify-content-between pb-2 comment">
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
          <Comments comment={comment && comment} key={i} postId={postId}/>
        ))
      }
    </div>
  );
}

export default Posts;
