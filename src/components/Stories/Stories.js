import React, { useEffect } from "react";
import { connect, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { getStories } from "../../redux/actions/storyAction";
import { isLogged } from "../../helpers/auth";

function Stories({ stories,openStory }) {
  const token = isLogged() && isLogged().token;
  const userId = isLogged() && isLogged().user._id;
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getStories(token, userId));
  }, [dispatch, token, userId]);
  return (
    <div className="dark:bg-gray-700 bg-gray-50 py-2 pl-3 shadow-md mx-auto mt-3 md:block md:w-1/2 rounded-md transition duration-500">
      <div className="flex items-start space-x-2 overflow-x-auto">
        <Avatar
          className="cursor-pointer"
          src={`https://api-social-network-mern.herokuapp.com/api/user/photo/${userId && userId}`}
          onClick={() => openStory()}
        />
        {stories.stories?.map((item, i) => (
          <Link key={i} to={`/story/@${item.StoryBy?.UserName}/${item?._id}`}>
            <Avatar
              className="border-green-600 border-2 cursor-pointer"
              src={`https://api-social-network-mern.herokuapp.com/api/user/photo/${item.StoryBy?._id}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = ({ story: stories }) => ({
  stories,
});
export default connect(mapStateToProps, null)(Stories);
