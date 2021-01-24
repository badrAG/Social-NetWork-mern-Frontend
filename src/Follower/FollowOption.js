import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { checkAuth, isLogged } from "../helpers/auth";
import { getUser } from "../redux/actions/userActions";
import FollowButton from "./FollowButton";
import "./Follow.css";
import { useHistory } from "react-router-dom";

function FollowOption({ userId }) {
  const jwt = isLogged();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkFollow = (data) => {
      const match =
        data &&
        data.following.find((follower) => {
          return follower && follower._id === userId;
        });
      return match;
    };
    const getProfile = async () => {
      const userData = await getUser(jwt && jwt.token, userId);
      const myData = await getUser(jwt && jwt.token, jwt && jwt.user._id);
      if (myData.error) return setError(myData.error);
      setFollowing(checkFollow(myData.data));
      setUser(userData.data);
    };
    if (loading) {
      getProfile();
    }
    return () => {
      setLoading(false);
    };
  }, [jwt, userId, loading]);
  const history = useHistory();

  function handleButtonClick(user) {
    setFollowing(!following);
  }

  return (
    <div className="flex mb-2 items-center justify-between">
      {error}
      <div
        style={{ cursor: "pointer" }}
        onClick={() => history.push(`/@${user._id}`)}
        data-dismiss="modal"
        aria-label="Close"
      >
        <div className="flex items-center">
          <Avatar
            src={`http://localhost:8888/api/user/photo/${user && user._id}`}
          />
          <h6 className="follow__name ml-2 dark:text-gray-50">
            {user && user.UserName}
            <small className="follow__name ml-2 dark:text-gray-50">
              {user && user.about}
            </small>
          </h6>
        </div>
      </div>

      {!checkAuth(user && user._id) ? (
        <FollowButton
          following={following}
          handleButtonClick={handleButtonClick}
          token={jwt && jwt.token}
          followId={user && user._id}
          userId={jwt && jwt.user._id}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default FollowOption;
