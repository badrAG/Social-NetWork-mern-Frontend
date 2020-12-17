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
import { getAllPosts } from "../redux/actions/postAction";
import PostsLoading from "../components/loading/PostsLoading";

function Menu({ posts, currentUser }) {
  const styleToggel = false;
  const token = isLogged().token;
  const userId = isLogged() && isLogged().user._id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(5);
   
  const loadMore =()=>{
    if(window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
      setLoading(true);
    }
  }
  useEffect(() => {
    if (loading) {
      dispatch(getAllPosts(token, userId,count));
      setLoading(false);
      setCount(count + 5);
    }
    window.addEventListener('scroll',loadMore);
    return () => {
    window.removeEventListener('scroll',loadMore);
    }
    
  }, [loading, dispatch, token,userId,count]);
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
              <Postler />
              {
                posts.posts ?
                posts.posts?.map((post,i)=>(
                  <Posts post={post && post} key={i}/>
                )):([1,2,3,4].map((item,i)=> <PostsLoading key={i}/>))
              }
              {loading && <div className="flex justify-center">
              <div className="rounded-full w-12 h-12 bg-gray-400 animate-pulse"></div>
              </div>}
            </div>
            <div className="md:w-2/6"></div>
          </div>
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
