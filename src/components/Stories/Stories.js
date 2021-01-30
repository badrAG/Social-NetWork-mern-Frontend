import React, { useEffect } from "react";
import { connect, useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { getStories } from "../../redux/actions/storyAction";
import { isLogged } from "../../helpers/auth";

function Stories({ stories,openStory }) {
  const token = isLogged() && isLogged().token;
  const user = isLogged() && isLogged().user;
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getStories(token, user._id));
  }, [dispatch, token, user._id]);
  return (
    <div className="dark:bg-gray-700 bg-gray-50 py-2 pl-3 shadow-md mx-auto mt-3 md:block md:w-4/5 rounded-md transition duration-500">
      <div className="flex items-start space-x-2 overflow-x-auto overflow-y-hidden">
        <div onClick={() => openStory()} className="relative mr-1 cursor-pointer">
        <Avatar
          className="cursor-pointer"
          src={user?.image}
        />
          <span className="absolute text-lg bottom-0 font-semibold -right-1 w-4 h-4 flex items-center justify-center text-white rounded-full bg-green-500">+</span>
        </div>
        {
        stories &&
        stories?.stories.map((item, i) => (
          <Link key={i} to={`/story/@${item.StoryBy?.UserName}/${item?._id}`}>
            <Avatar
              className="border-green-600 border-2 cursor-pointer"
              src={item.StoryBy?.image}
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
