import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import NavBar from "../../components/navbar/Navbar";
import { checkAuth, isLogged, logout } from "../../helpers/auth";
import {
  getUser,
  updateProfile,
  deleteProfil,
} from "../../redux/actions/userActions";
import "./EditProfile.css";

function EditProfile({ userSuccess, userError }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const jwt = isLogged();
  const { userId } = useParams();
  const userData = new FormData();
  const [userPicture, setUserPicture] = useState(null);
  const [userCapture, setUserCapture] = useState(null);
  const [user, setUser] = useState({
    name: "",
    UserName: "",
    email: "",
    password: "",
    about: "",
    image: "",
    capture: "",
  });

  React.useEffect(() => {
    const getProfile = async () => {
      const userData = await getUser(jwt && jwt.token, userId);
      if (userData.error) return setError(userData.error);
      setUser(userData.data);

      if (userSuccess) {
        dispatch({ type: "TOGGLE_SUCCESS" });
        history.push(`/@${userId}`);
      }
      if (userError) {
        setError(userError);
      }
    };
    if (!checkAuth(userId)) {
      history.push(`/@${userId}`);
    }
    if (loading) {
      getProfile();
    }
    return () => {
      setLoading(false);
    };
  }, [userId, userError, userSuccess, loading, jwt.token, dispatch, history]);

  const handleDelete = () => {
    dispatch(deleteProfil(jwt?.token, userId));
    logout(() => {
      return history.push(`/login`);
    });
  };
  
  const handleInputChange = (e) => {
    e.target.name === "image" && setUserPicture(URL.createObjectURL(e.target.files[0]))
    e.target.name === "capture" && setUserCapture(URL.createObjectURL(e.target.files[0]))
    const value =
      e.target.name === "image" || e.target.name === "capture" ? e.target.files[0] : e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    user.name && userData.append("name", user.name);
    user.UserName && userData.append("UserName", user.UserName);
    user.about && userData.append("about", user.about);
    user.email && userData.append("email", user.email);
    user.password && userData.append("password", user.password);
    user.image && userData.append("user_picture", user.image);
    user.capture && userData.append("user_capture", user.capture);
      dispatch(updateProfile(userData, jwt.token, userId));
  };
 
  return (
    <>
      <NavBar />
      <div className="flex md:justify-center">
        <div className="w-full md:w-1/2">
          <div className="w-full">
            <form onSubmit={handleFormSubmit} className="editProf dark:bg-gray-700  shadow-md rounded-md transition duration-500">
            <div className="relative mb-14">
              <img
            className="w-full h-60 object-cover"
            src={userCapture ? userCapture : jwt?.user.capture} alt="capture"/>
             <label className="absolute bottom-3 right-8 px-1 rounded-2xl text-gray-200 border-2 border-gray-200 hover:border-0 hover:bg-gray-400">
                  <EditIcon className="relative cursor-pointer" />
                  <input
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    name="capture"
                    onChange={(e) => {handleInputChange(e)}}
                  />
                </label>
            {/* avatar section */}
            <div className="absolute -bottom-14 left-1/2 right-1/2">
              <div className="relative flex justify-center items-center">
                <Avatar
                  src={userPicture ? userPicture : jwt.user.image}
                  style={{ width: "172px", height: "172px" }}
                  className="border-white border-solid border-4"
                />
                <label className="absolute -bottom-3 px-1 rounded-lg text-gray-200 bg-green-500">
                  <EditIcon className="relative cursor-pointer" />
                  <input
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    name="image"
                    onChange={(e) => {handleInputChange(e)}}
                  />
                </label>
              </div>
            </div>

            </div>
              <div className="p-3">
                <div className="h-12 border-gray-400 w-full pb-3 ">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => handleInputChange(e)}
                    value={user.name}
                    className="w-full dark:bg-gray-500 border-solid border-2 rounded-lg py-1 px-2 dark:text-gray-50"
                  />
                </div>
                <div className="h-12 border-gray-400 w-full mb-3">
                  <input
                    type="text"
                    name="UserName"
                    placeholder="User Name"
                    onChange={(e) => handleInputChange(e)}
                    value={user.UserName.split(" ").join("")}
                    className="w-full dark:bg-gray-500 border-solid border-2 rounded-lg py-1 px-2 dark:text-gray-50"
                  />
                </div>
                <div className="h-12 border-gray-400 w-full mb-6">
                  <textarea
                    name="about"
                    row="5"
                    cols="21"
                    placeholder="Bio"
                    onChange={(e) => handleInputChange(e)}
                    value={user.about}
                    className="w-full dark:bg-gray-500 border-solid border-2 rounded-lg py-1 px-2 dark:text-gray-50"
                  />
                </div>
                <div className="h-12 border-gray-400 w-full mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => handleInputChange(e)}
                    value={user.email}
                    className="w-full dark:bg-gray-500 border-solid border-2 rounded-lg py-1 px-2 dark:text-gray-50"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="h-12 border-gray-400 w-full mb-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => handleInputChange(e)}
                    value={user.password || ""}
                    className="w-full dark:bg-gray-500 border-solid border-2 rounded-lg py-1 px-2 dark:text-gray-50"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="btn bg-green-500 w-28 py-1 rounded-2xl  text-gray-50"
                  >
                    Confirm
                  </button>
                  <p
                    className="text-red-500 p-2 rounded-lg hover:bg-gray-200"
                    onClick={() => handleDelete()}
                    style={{ cursor: "pointer" }}
                  >
                    Delete Your Account
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = ({ user: { userError, userSuccess } }) => ({
  userError,
  userSuccess,
});
export default connect(mapStateToProps, null)(EditProfile);
