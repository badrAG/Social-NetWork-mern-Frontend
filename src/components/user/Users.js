import React, { Fragment, useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./Users.css";
import NavBar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/actions/userActions";

function Users({ users, userError, currentUser, styleToggle }) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userError && userError !== null) {
      setError(userError);
    }
    dispatch(getAllUsers(currentUser && currentUser.token));
  }, [userError, currentUser, dispatch]);

  const showError = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };

  return (
    <>
      {styleToggle ? <NavBar /> : <></>}
      <div className={styleToggle ? "row" : ""}>
        <div
          className={styleToggle ? "col-md-6 ms-4 offset-3 card__Allusers" : ""}
        >
          <div className="">
            <div className="">
              <div className="p-2 mb-2 border-gray-500 border-solid border-b-2 border-opacity-30">
                <h6 className="text-lg font-semibold">Suggestions For You</h6>
              </div>
            </div>
          </div>
          <div className="">
            {showError()}
            {users &&
              users.map((user, i) => (
                <Fragment key={i}>
                  {!styleToggle && i >= 4 ? (
                    <></>
                  ) : (
                    <>
                      <Link to={`/@${user._id}`} className="">
                        <div className="flex items-center px-3 py-1">
                          <div className={styleToggle ? "user_avatar" : ""}>
                            <Avatar
                              src={`http://localhost:8888/api/user/photo/${user._id}`}
                            />
                          </div>
                          <div className="pl-2">
                            <h6 className="m-0 text-sm font-semibold">
                              @{user.UserName}
                            </h6>
                            <p className="m-0 text-gray-400 text-sm ">
                              {user.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div className="flex items-center mt-2.5 mb-2 justify-center">
                        <div
                          className="bg-gray-300 h-px"
                          style={
                            !styleToggle ? { width: "85%" } : { width: "95%" }
                          }
                        ></div>
                      </div>
                    </>
                  )}
                </Fragment>
              ))}
          </div>
        </div>
      </div>
      {!styleToggle ? (
        <div className="">
          <Link to="/connect_people" className="flex items-center justify-center pb-1.5">
            <div className="text-green-600">Show More</div>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

const mapStateToProps = ({ user: { users, userError, currentUser } }) => ({
  users,
  userError,
  currentUser,
});

export default connect(mapStateToProps, null)(Users);
