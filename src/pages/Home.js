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
  }, [posts, loading, dispatch, token, userId]);
  return (
    <>
      {token ? (
        <>
          <NavBar currentUser={currentUser && currentUser} />
          <div className="row">
            <div
              className="col col-md-2 card__users"
              style={styleToggel ? { margin: "0px" } : { marginLeft: "31px" }}
            >
              <Users styleToggel={styleToggel} />
            </div>
            <div className="col-md-6 ms-12">
              <Postler />
              {posts.posts &&
                posts.posts.map(post => <Posts post={post} key={post._id} />)}
            </div>
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
