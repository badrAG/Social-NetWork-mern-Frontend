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
  const [postPicture, setPostPicture] = useState(null);
  const [user, setUser] = useState({
    name: "",
    UserName: "",
    email: "",
    password: "",
    about: "",
    image: "",
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

  const showError = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };
  const handleInputChange = (e) => {
    e.target.name === "image" ? setPostPicture(URL.createObjectURL(e.target.files[0])): null;
    const value =
      e.target.name === "image" ? e.target.files[0] : e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    user.name && userData.append("name", user.name);
    user.UserName && userData.append("UserName", user.UserName);
    user.about && userData.append("about", user.about);
    user.email && userData.append("email", user.email);
    user.password && userData.append("password", user.password);
    user.image && userData.append("image", user.image);
    dispatch(updateProfile(userData, jwt.token, userId));
  };
 
  return (
    <>
      <NavBar />
      <div className="flex md:justify-center">
        <div className="w-full md:w-1/2">
          <div className="">{showError()}</div>
          <div className="w-full">
            <form onSubmit={handleFormSubmit} className="editProf dark:bg-gray-700 mt-3 pt-3 shadow-md rounded-md transition duration-500">
              <div className="relative flex justify-center items-center">
                <Avatar
                  src={postPicture ? postPicture : `http://localhost:8888/api/user/photo/${userId}`}
                  style={{ width: "172px", height: "172px" }}
                  className=""
                />
                <label className="absolute -bottom-3 px-1 rounded-lg text-gray-200 bg-green-500">
                  <EditIcon className="relative cursor-pointer" />
                  <input
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    required
                    name="image"
                    onChange={(e) => {handleInputChange(e)}}
                  />
                </label>
              </div>
              <div className="p-3">
                <div className="form-group ">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => handleInputChange(e)}
                    value={user.name}
                    className="form-control dark:bg-gray-500 dark:text-gray-50"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="UserName"
                    placeholder="User Name"
                    onChange={(e) => handleInputChange(e)}
                    value={user.UserName.split(" ").join("")}
                    className="form-control dark:bg-gray-500 dark:text-gray-50"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="about"
                    row="5"
                    cols="21"
                    placeholder="Bio"
                    onChange={(e) => handleInputChange(e)}
                    value={user.about}
                    className="form-control dark:bg-gray-500 dark:text-gray-50"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => handleInputChange(e)}
                    value={user.email}
                    className="form-control dark:bg-gray-500 dark:text-gray-50"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <small id="emailHelp" className="form-text text-muted dark:text-gray-200">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => handleInputChange(e)}
                    value={user.password || ""}
                    className="form-control dark:bg-gray-500 dark:text-gray-50"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="btn bg-green-500 text-gray-50"
                  >
                    Edit
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
