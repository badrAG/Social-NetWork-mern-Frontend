import React from 'react'
import { Avatar } from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from 'react-router-dom';
import { isLogged } from '../../helpers/auth';
import { useDispatch } from 'react-redux';
import { removeComment } from '../../redux/actions/postAction';

function Comments({postBy,comment,postId}) {
  const jwt = isLogged();
  const dispatch = useDispatch();
    return (
        <div className="d-flex pb-2">
          <Link to={`/@${comment?.commentedBy._id}`}>
        <Avatar
          className="avatar_comment"
          src={`http://localhost:8888/api/user/photo/${comment?.commentedBy._id}`}
        /> </Link>
        <div className="bg-gray-300 pl-1.5 ml-2 mt-0.5 w-full rounded-r-lg rounded-b-lg ">
          <div className="font-bold">
            <Link to={`/@${comment?.commentedBy._id}`}>
            {comment.commentedBy.UserName}
            </Link>
              <small>{" "}&bull;{" "}1h</small>
              {postBy === jwt?.user._id || comment?.commentedBy._id === jwt?.user._id ?
              <small className="delete__comment cursor-pointer" 
              onClick={() => {
                dispatch(removeComment(comment?._id,postId, jwt.token));
              }}
              ><DeleteIcon className="float-right"/></small>
              :<></>}
          </div>
          <div className="pb-1.5 font-normal text-base">{comment.text}</div>
        </div>
      </div>
    )
}
export default Comments
