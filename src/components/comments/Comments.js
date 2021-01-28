import React from 'react'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { isLogged } from '../../helpers/auth';
import { useDispatch } from 'react-redux';
import { removeComment } from '../../redux/actions/postAction';
import moment from 'moment'

function Comments({postBy,comment,postId}) {
  const jwt = isLogged();
  const dispatch = useDispatch();
    return (
        <div className="d-flex pb-2">
          <Link className="no-underline" to={`/@${comment?.commentedBy._id}`}>
        <Avatar
          className="avatar_comment"
          src={comment?.commentedBy.image}
        /> </Link>
        <div className="bg-gray-300 dark:bg-gray-500 pl-1.5 ml-2 mt-0.5 w-full rounded-r-lg rounded-b-lg transition duration-500">
          <div className="flex items-center justify-between">
            <Link className="font-bold dark:text-gray-50 no-underline" to={`/@${comment?.commentedBy._id}`}>
            {comment.commentedBy.UserName}
            <small className="dark:text-gray-200">{" "}&bull;{" "}{moment(comment.created).fromNow(true)}</small>
            </Link>
              
              {postBy === jwt?.user._id || comment?.commentedBy._id === jwt?.user._id ?
              <div className="group flex items-center justify-center w-5 h-5 p-1 text-gray-600 hover:bg-gray-400 rounded-full dark:text-gray-300 cursor-pointer transition duration-500" 
              onClick={() => {
                dispatch(removeComment(comment?._id,postId, jwt.token));
              }}
              >
                <i className="far fa-trash-alt  float-right text-xs group-hover:line-through group-hover:text-red-500"></i>
                </div>
              :<></>}
          </div>
          <div className="pb-1.5 font-normal  text-base dark:text-gray-50">{comment.text}</div>
        </div>
      </div>
    )
}
export default Comments
