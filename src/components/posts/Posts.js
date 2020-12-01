import { Avatar } from '@material-ui/core'
import React from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import '../posts/Posts.css'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
function Posts({post}) {
const date = new Date(post.createdAt);
    return (
      <div className="container">
             <div className="d-flex justify-content-between align-items-center">
              <div className="info__post">
                  <Avatar src={`http://localhost:8888/api/user/photo/${post.PostedBy._id}`}/>
                        <h4 className="user__name">
                        {post.PostedBy.UserName}
                        <p className="timestimp__post">
                    {date.toLocaleDateString()}
                  </p>
                  </h4>
                  
              </div>
                  <span className="option__post"><MoreVertIcon/></span>
          </div>
          <div className="row">
              <div className="col col-md-12">
                  <div className="description m-2">
                      {post.text}
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="post__image col-12">
                  <img src="https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png" alt=""/>
              </div>
          </div>
          <div className="d-flex justify-content-around reaction">
              <div className="">
               {/*  <i class="fas fa-heart"></i>
               <i className="fas fa-heart-broken"></i>*/}  
              <i className="far fa-heart">{post.likes.length}</i>
              </div>
              <div className="">
                 <ChatBubbleOutlineIcon/>
                 {post.comments.length}
              </div>
          </div>
      </div>
    )
}

export default Posts
