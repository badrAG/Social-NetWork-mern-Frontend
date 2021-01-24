import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Postler from "../components/divposter/Postler";
import NavBar from "../components/navbar/Navbar";
import Posts from "../components/posts/Posts";
import Users from "../components/user/Users";
import "../components/user/Users.css";
import Auth from './auth/Auth'
import { isLogged } from "../helpers/auth";
import { getAllPosts,getMorePosts } from "../redux/actions/postAction";
import PostsLoading from "../components/loading/PostsLoading";
import Stories from "../components/Stories/Stories";
import AddStory from "../components/Modal/AddStory";
import Chat from "../components/Chat/Chat";

function Menu({ posts, currentUser }) {
  const styleToggel = false;
  const token = isLogged()?.token;
  const userId = isLogged() && isLogged().user._id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(5);
  const loadMore =()=>{
    if(window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
      setLoading(true);
    }
  }
  useEffect(() => {
    if (loading) {
      if(count === 5){
        dispatch(getAllPosts(token, userId,count));
      }else{
        dispatch(getMorePosts(token, userId,count));
      }
      setLoading(false);
      setCount(count + 5);
    }
    window.addEventListener('scroll',loadMore);
    return () => {
    window.removeEventListener('scroll',loadMore);
    }
    
  }, [loading, dispatch, token,userId,count]);
  useEffect(() => {
    dispatch({
      type : "CLEAR_STORY",
  });
  }, [dispatch])
const openStory = ()=>{
  setOpen(!open);
}
  return (
    <>
      {currentUser ? (
        <>
          <NavBar />
          <div className="flex justify-between">
            <div
              className="users_contener dark:bg-gray-700 hidden md:block rounded-xl shadow-md md:w-2/5 mt-3 md:h-full transition duration-500"
              style={styleToggel ? { marginTop: "0px"} : { marginLeft: "31px"}}
            >
              <Users styleToggel={styleToggel} />
            </div>
            <div className="w-full">
              <Stories openStory={openStory} />
              <Postler />
              {
                posts.posts && !posts.posts.error && !loading ?
               posts.posts && posts.posts.map((post,i)=>(
                  <Posts post={post && post} key={i}/>
                )):([1,2,3,4].map((item,i)=> <PostsLoading key={i}/>))
              }

            </div>
            <div className="md:w-2/6"></div>
          </div>
          {/* <Chat/> */}
         {open && <AddStory openStory={openStory}/>}
        </>
      ) : (
        <Auth toggleLink={true}/>
      )}
    </>
  );
}

const mapStateToProps = ({ post: posts }) => ({
  posts,
});
export default connect(mapStateToProps, null)(Menu);
