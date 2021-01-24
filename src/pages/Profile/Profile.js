import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/Navbar";
import SettingsIcon from "@material-ui/icons/Settings";
import "./Profile.css";
import { useParams, Link, useHistory } from "react-router-dom";
import { checkAuth, isLogged } from "../../helpers/auth";
import { getUser } from "../../redux/actions/userActions";
import FollowButton from "../../Follower/FollowButton";
import FollowUserDisplay from "../../Follower/FollowUserDisplay";
import Posts from "../../components/posts/Posts";
import { getUserPosts } from "../../redux/actions/postAction";
import { connect, useDispatch } from "react-redux";
import PostsLoading from "../../components/loading/PostsLoading";

function Profile({userPosts,posts}) {
  const { userId } = useParams();
  const [error, setError] = useState("");
  const [user, setUser] = useState();
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lentFollower, setLentFollower] = useState(null);
  const [lentFollowing, setLentFollowing] = useState(null);
  const jwt = isLogged();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkFollow = (user) => {
      const match = user?.followers.find((follower) => {
        return follower._id === jwt.user._id;
      });
      return match;
    };
    const getDataProfile = async () => {
      const userData = await getUser(jwt && jwt.token, userId);
      if (userData.error) return setError(userData.error);
      setUser(userData.data);
      setFollowing(checkFollow(userData.data));
      await dispatch(getUserPosts(jwt && jwt.token, userId));
      await setLoading(true);
    };
      
    if(isLogged()){
      getDataProfile();
    }else {history.push("/login")};
    return ()=>{
      setLoading(false);
      dispatch({type:"CLEAR_USERPOST"});
      setUser(null);
    }
  }, [dispatch,jwt.token,userId]);

  useEffect(() => {
    setLentFollower(user?.followers.length);
    setLentFollowing(user?.following.length);
  }, [userId, user?.followers.length, user?.following.length]);

  function handleButtonClick(user) {
    setUser(user);
    setFollowing(!following);
  }

  const showError = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };
  const [Follow, setFollow] = useState(null);
  const handleFollowModal = () => {
    setFollow(true);
  };
  const handleFollowingModal = () => {
    setFollow(false);
  };
  return (
    <>
      <NavBar />
      <div className="">
        <div className="profle dark:bg-gray-700 mx-auto px-3 py-4 md:block md:w-1/2 rounded-md transition duration-500">
          {error ? (
            showError()
          ) : (
            <>
              <div className="flex items-center justify-center">
                <div className="flex w-1/2 items-center justify-around mb-1">
                  <div
                    className="flex justify-center"
                    onClick={() => handleFollowModal()}
                    style={{ cursor: "pointer" }}
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <h5 className=" text-gray-600 dark:text-gray-100 font-semibold">
                      {lentFollower}
                    </h5>
                    <h6 className="mx-2  text-gray-600 dark:text-gray-100 font-medium">
                      Followers
                    </h6>
                  </div>
                  <div className="relative mb-2">
                    <div className="prolile__img">
                      <Avatar
                        src={`https://api-social-network-mern.herokuapp.com/api/user/photo/${userId}`}
                      />
                    </div>
                    {checkAuth(userId) ? (
                      <div className="absolute bg-gray-100 left-9 -bottom-2 pr-1 pl-1  rounded-2xl border-green-500 border-2">
                        <Link to={`/edit/profile/${userId}`}>
                          <SettingsIcon className="text-green-500 text-md" />
                        </Link>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div
                    className="flex justify-center"
                    onClick={() => handleFollowingModal()}
                    style={{ cursor: "pointer" }}
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <h5 className="ml-2  text-gray-600 dark:text-gray-100 font-semibold">
                      {lentFollowing}
                    </h5>
                    <h6 className="ml-2 text-gray-600 dark:text-gray-100 font-medium">
                      Following
                    </h6>
                  </div>
                </div>
              </div>
              {user ? (<><div className="flex justify-center">
                <h4 className="text-gray-700 dark:text-white font-bold text-lg">
                  @{user && user.UserName}
                </h4>
              </div>
              <div className="flex justify-center">
                <p className="text-gray-700 dark:text-gray-50 font-medium text-ms">
                  {user && user.about}
                </p>
              </div></>) : (
              <><div className="flex justify-center">
              <h4 className="bg-gray-400 w-16 dark:bg-gray-400 h-2 rounded-full">
              </h4>
            </div>
            <div className="flex justify-center mt-1">
              <p className="bg-gray-400 w-28 h-2 rounded-full">
              </p>
            </div></>)
              }
              {!checkAuth(userId) ? (
                <div className="flex justify-center">
                  <div className="btn__follow">
                    <FollowButton
                      following={following}
                      handleButtonClick={handleButtonClick}
                      token={jwt && jwt.token}
                      followId={userId && userId}
                      userId={jwt && jwt.user._id}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}

              <>
                {Follow ? (
                  <FollowUserDisplay
                    jwt={jwt}
                    Follow={Follow}
                    data={user && user.followers}
                  />
                ) : (
                  <FollowUserDisplay
                    Follow={Follow}
                    data={user && user.following}
                  />
                )}
              </>
            </>
          )}
        </div>
        {loading && userPosts?.length === 0 ? (
                <div className="flex justify-center font-semibold dark:text-gray-200">Add first post</div>
              ) : (
               loading ?
                userPosts?.map((post) => (
                    <Posts post={post} key={post._id} />
                )):([1,2,3,4].map((item,i)=> <PostsLoading key={i}/>))
              )}
      </div>
    </>
  );
}
const mapStateToProps = ({ post: { posts, userPosts} }) => ({
  posts,
  userPosts,
});
export default connect(mapStateToProps, null)(Profile);
