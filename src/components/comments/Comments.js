import React from 'react'
import { Avatar } from '@material-ui/core'
import DeleteIcon from "@material-ui/icons/Delete";

function Comments({comment,postId}) {
    return (
        <div className="d-flex pb-2">
        <Avatar
          className="avatar_comment"
          src={`http://localhost:8888/api/user/photo/${comment?.commentedBy._id}`}
        />
        <div className="content__comment">
          <div className="userName__comment">
              {comment.commentedBy.UserName}<small>{" "}&bull;{" "}1h</small>
              <small className="delete__comment"><DeleteIcon className="float-right"/></small>
          </div>
          <div className="comment__text">{comment.text}</div>
        </div>
      </div>
    )
}
export default Comments
