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
import {
  getImagePosts,
  getUserPosts,
  getVideoPosts,
} from "../../redux/actions/postAction";
import { connect, useDispatch } from "react-redux";
import GridComponent from "../../components/GridComponent/GridComponent";

function Profile({ userPosts, userImages, userVideos }) {
  const { userId } = useParams();
  const [error, setError] = useState("");
  const [user, setUser] = useState();
  const [switchOption, setSwitchOption] = useState(0);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nav, setNav] = useState(true);
  const [lentFollower, setLentFollower] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [lentFollowing, setLentFollowing] = useState(null);
  const jwt = isLogged();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkFollow = (user) => {
      const match = user?.followers.find((follower) => {
        return follower._id === jwt?.user._id;
      });
      return match;
    };
    const getDataProfile = async () => {
      const userData = await getUser(jwt && jwt.token, userId);
      if (userData.error) return setError(userData.error);
      setUser(userData.data);
      setFollowing(checkFollow(userData.data));
      await dispatch(getUserPosts(jwt && jwt.token, userId));
      await dispatch(getImagePosts(jwt && jwt.token, userId));
      await dispatch(getVideoPosts(jwt && jwt.token, userId));
      await setLoading(true);
    };
    if (isLogged()) {
      getDataProfile();
    } else {
      history.push("/login");
    }
    return () => {
      setLoading(false);
      dispatch({ type: "CLEAR_USERPOST" });
      setUser(null);
    };
  }, [dispatch, jwt.token, userId]);
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
    openModalFollow();
  };
  const handleFollowingModal = () => {
    setFollow(false);
    openModalFollow();
  };
  function resize() {
    if(window.innerWidth > 767){
      setNav(true)
    }
  }
const openModalFollow = ()=>{
  setOpenModal(!openModal);
}
  const myFunction = () => {
    if (
      document.body.scrollTop > 303 ||
      document.documentElement.scrollTop > 303 && window.innerWidth < 767
      ) {
        setNav(false)
      } else {
        setNav(true)
      }
    };
    window.onscroll = () => {
      myFunction();
    };
  window.onresize = resize;
  return (
    <>
      <NavBar styleprofile={nav} />
      <div className="relative pb-4">
        {error ? (
          showError()
        ) : (
          <>
            <div className="sticky -top-2/3 md:-top-32 z-10">
              <img
                className="w-full h-80 object-cover"
                src={user && user.capture}
                alt="capture"
              />
              <div className="profle relative dark:bg-gray-700 px-3 pt-2 rounded-md transition duration-500">
                <div className="flex flex-col md:flex-row justify-around  items-center">
                  <div className="relative flex flex-col md:h-full md:w-auto w-full order-1 mb-10 items-center justify-center md:pr-5 pb-8 md:pb-0 space-y-8">
                    <div className={nav ?" w-32 h-32 lg:w-48 lg:h-48 absolute -top-16 md:-top-28 lg:-top-36 ":"w-32 h-32 absolute -top-24"}>
                      <div className="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer border-white border-4">
                        <span className="hidden group-hover:table-cell text-white font-bold align-middle">
                          KR
                        </span>
                        <img
                          src={
                            user && user.image
                          }
                          alt="lovely avatar"
                          className="object-cover object-center w-full h-full visible group-hover:hidden"
                        />
                      </div>
                    </div>
                  </div>
                  {user ? (
                      <>
                        <div className="md:hidden flex order-2 md:order-none flex-col items-center w-48 pb-2">
                          <h4 className="text-gray-700 dark:text-white font-bold text-lg">
                            @{user && user.UserName}
                          </h4>
                          <p className="text-gray-700 dark:text-gray-50 font-medium text-ms">
                            {user && user.about}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="md:hidden flex flex-col">
                        <div className="flex justify-center">
                          <h4 className="bg-gray-400 w-16 dark:bg-gray-400 h-2 rounded-full"></h4>
                        </div>
                        <div className="flex justify-center mt-1">
                          <p className="bg-gray-400 w-28 h-2 rounded-full"></p>
                        </div>
                      </div>
                    )}
                  <div className="flex items-center space-x-3 md:order-2 order-4">
                    <div
                      className="flex flex-col items-center justify-center"
                      onClick={() => handleFollowModal()}
                      style={{ cursor: "pointer" }}
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      <h5 className=" text-gray-600 dark:text-gray-100 font-semibold">
                        {lentFollower}
                      </h5>
                      <h6 className="mx-2 text-gray-400 pb-2 dark:text-gray-100 text-sm font-normal">
                        Followers
                      </h6>
                    </div>
                    <div
                      className="flex flex-col items-center justify-center"
                      onClick={() => handleFollowingModal()}
                      style={{ cursor: "pointer" }}
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      <h5 className="ml-2  text-gray-600 dark:text-gray-100 font-semibold">
                        {lentFollowing}
                      </h5>
                      <h6 className="ml-2 text-gray-400 pb-2 dark:text-gray-100 text-sm font-normal">
                        Following
                      </h6>
                    </div>
                    <div
                      className="flex flex-col items-center cursor-pointer justify-center"
                      onClick={() => setSwitchOption(0)}
                    >
                      <h5 className={switchOption === 0 ?"ml-2 text-green-500 font-semibold" :"ml-2 text-gray-600 dark:text-gray-100 font-semibold"}>
                        {userPosts?.length}
                      </h5>
                      <h6
                        className={
                          switchOption === 0
                            ? "ml-2 text-green-500 pb-2 border-b-2 border-green-500 text-base font-semibold"
                            : "ml-2 text-gray-400 pb-2 dark:text-gray-100 text-sm font-semibold"
                        }
                      >
                        Posts
                      </h6>
                    </div>
                    <div
                      className="flex flex-col items-center cursor-pointer justify-center"
                      onClick={() => setSwitchOption(1)}
                    >
                       <h5 className={switchOption === 1 ?"ml-2 text-green-500 font-semibold" :"ml-2 text-gray-600 dark:text-gray-100 font-semibold"}>
                        {userImages?.length}
                      </h5>
                      <h6
                        className={
                          switchOption === 1
                            ? "ml-2 text-green-500 pb-2 border-b-2 border-green-500 text-base font-semibold"
                            : "ml-2 text-gray-400 pb-2 dark:text-gray-100 text-sm font-normal"
                        }
                      >
                        Photos
                      </h6>
                    </div>
                    <div
                      className="flex flex-col items-center cursor-pointer justify-center"
                      onClick={() => setSwitchOption(2)}
                    >
                     <h5 className={switchOption === 2 ?"ml-2 text-green-500 font-semibold" :"ml-2 text-gray-600 dark:text-gray-100 font-semibold"}>
                        {userVideos?.length}
                      </h5>
                      <h6
                        className={
                          switchOption === 2
                            ? "ml-2 text-green-500 pb-2 border-b-2 border-green-500 text-base font-semibold"
                            : "ml-2 text-gray-400 pb-2 dark:text-gray-100 text-sm font-normal"
                        }
                      >
                        Videos
                      </h6>
                    </div>
                  </div>
                  {checkAuth(userId) && (
                    <div className=" bg-gray-100 pr-1 pl-1 order-3 mb-3 rounded-2xl border-green-500 border-2">
                      <Link to={`/edit/profile/${userId}`}>
                        <SettingsIcon className="text-green-500 text-md" />
                      </Link>
                    </div>
                  )}
                  {!checkAuth(userId) && (
                    <div className="order-3 pb-3">
                      <div className="">
                        <FollowButton
                          styleprofile={true}
                          following={following}
                          handleButtonClick={handleButtonClick}
                          token={jwt && jwt.token}
                          followId={userId && userId}
                          userId={jwt && jwt.user._id}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <>
                  {openModal && (
                  Follow ? (
                    <FollowUserDisplay
                    openModalFollow={openModalFollow}
                      jwt={jwt}
                      Follow={Follow}
                      data={user && user.followers}
                    />
                  ) : (
                    <FollowUserDisplay
                    openModalFollow={openModalFollow}
                      Follow={Follow}
                      data={user && user.following}
                    />
                  ))}
                </>
              </div>
            </div>
          </>
        )}
        {loading && userPosts?.length === 0 ? (
          <div className="flex justify-center font-semibold dark:text-gray-200">
            Add first post
          </div>
        ) : (
          <div className="flex justify-center pt-6">
            {user ? (
              <>
                <div className=" hidden md:flex flex-col w-48">
                  <h4 className="text-gray-700 dark:text-white font-bold text-lg">
                    @{user && user.UserName}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-50 font-medium text-ms">
                    {user && user.about}
                  </p>
                </div>
              </>
            ) : (
              <div className="hidden md:flex flex-col">
                <div className="flex justify-center">
                  <h4 className="bg-gray-400 w-16 dark:bg-gray-400 h-2 rounded-full"></h4>
                </div>
                <div className="flex justify-center mt-1">
                  <p className="bg-gray-400 w-28 h-2 rounded-full"></p>
                </div>
              </div>
            )}
            <div className="flex flex-col w-full md:w-3/4">
              {switchOption === 0 &&
                userPosts?.map((post) => <Posts post={post} key={post._id} />)}
              {switchOption === 1 && (
                <GridComponent data={userImages} type={true} />
              )}
              {switchOption === 2 && (
                <GridComponent data={userVideos} type={false} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
const mapStateToProps = ({ post: { userVideos, userPosts, userImages } }) => ({
  userVideos,
  userPosts,
  userImages,
});
export default connect(mapStateToProps, null)(Profile);
