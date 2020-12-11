import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Postler from "../components/divposter/Postler";
import NavBar from "../components/navbar/Navbar";
import Posts from "../components/posts/Posts";
import Users from "../components/user/Users";
import "../components/user/Users.css";
import { isLogged } from "../helpers/auth";
import { getAllPosts } from "../redux/actions/postAction";

function Menu({ posts, currentUser }) {
  const styleToggel = false;
  const token = isLogged().token;
  const userId = isLogged() && isLogged().user._id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      dispatch(getAllPosts(token, userId));
    }
    return () => {
      setLoading(false);
    };
  }, [loading, dispatch, token,userId]);
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
            <div className="">
              <Postler />
              {
                posts.posts?.map((post,i)=>(
                  <Posts post={post && post} key={i}/>
                ))
              }
            </div>
            <div className="md:w-2/6"></div>
          </div>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </>
      )}
    </>
  );
}

const mapStateToProps = ({ post: posts }) => ({
  posts,
});
export default connect(mapStateToProps, null)(Menu);
