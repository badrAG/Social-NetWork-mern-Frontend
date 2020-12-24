import React, { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { useDispatch, useSelector } from "react-redux";
import { addStory, NewStory } from "../../redux/actions/storyAction";
import { isLogged } from "../../helpers/auth";

function AddStory({ openStory }) {
  const [storyPicture, setStoryPicture] = useState(null);
  const [file, setFile] = useState();
  const [disabled, setDisabled] = useState(true);
  const [switchDispatch, setSwitchDispatch] = useState();
  const dispatch = useDispatch();
  const token = isLogged().token;
  const userId = isLogged().user._id;
  const story = useSelector((state) => state.story);
  const [storyId, setStoryId] = useState("");

  const handlePictureChange = (e) => {
    setStoryPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setDisabled(false);
  };

  useEffect(() => {
    const filterStories = () => {
      if (story.state.stories === "undefined") {
        setSwitchDispatch(false);
      } else {
        story.state?.stories.map((story) => {
          if (story.StoryBy._id === userId) {
            setStoryId(story._id);
            setSwitchDispatch(true);
          } else {
            setSwitchDispatch(false);
          }
        });
      }
    };
    filterStories();
  }, [switchDispatch]);
  const handleClickAddStory = async (e) => {
    e.preventDefault();
    if (storyPicture) {
      const data = new FormData();
      data.append("storyId", storyId);
      if (file) data.append("file", file);
      if (switchDispatch) {
        await dispatch(NewStory(token, data, userId));
      } else {
        await dispatch(addStory(token, data, userId));
      }

      cancelPost();
      openStory();
    }
  };
  const cancelPost = () => {
    setStoryPicture("");
    setFile("");
    setDisabled(true);
  };
  return (
    <div className="flex justify-center w-full h-screen fixed top-0 z-20 bg-black bg-opacity-50">
      <div className="relative lg:w-2/5 h-44 w-8/12 sm:w-3/4 md:w-3/4 mt-12 p-2 rounded-xl bg-gray-800 shadow-lg">
        <div className="flex justify-between items-center pb-2 border-gray-400 border-b-2 mb-2">
          <h3 className="text-white font-semibold">Add Story</h3>
          <span
            onClick={openStory}
            className="flex items-center justify-center text-sm p-2 font-semibold text-white cursor-pointer w-4 h-4 rounded-full hover:bg-gray-500"
          >
            X
          </span>
        </div>
        <div className="flex">
          {!storyPicture && (
            <label className="bg-gray-500 bg-opacity-25 rounded-xl cursor-pointer p-2 m-0 relative flex items-center justify-center w-24 h-24 text-gray-700 border-gray-500 border-collapse border-2 hover:bg-opacity-70">
              <input
                type="file"
                onChange={(e) => {
                  handlePictureChange(e);
                }}
                name="image"
                className="absolute hidden overflow-hidden bottom-0"
                multiple
                accept="image/*"
                name="image"
              />
              <AddPhotoAlternateIcon className="file__icon dark:text-gray-300" />
            </label>
          )}
          {storyPicture && (
            <div className="rounded-xl cursor-pointer m-0 relative w-24 h-24 border-gray-500 border-collapse border-2">
              <img
                src={storyPicture}
                className=" w-full h-full object-cover"
                alt="storyPicture"
              />
              <div className="group absolute top-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-25 flex items-center justify-center">
                <div
                  className=" left-1/2 top-1/2 bg-white opacity-0 group-hover:opacity-100 flex items-center justify-center w-11 h-11 text-gray-600 hover:bg-gray-400 rounded-full cursor-pointer transition duration-500"
                  onClick={() => {
                    cancelPost();
                  }}
                >
                  <i className="far fa-trash-alt  float-right text-xs group-hover:line-through group-hover:text-red-500"></i>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end pb-3">
          <button
            onClick={(e) => handleClickAddStory(e)}
            disabled={disabled}
            className="disabled__button bg-green-600 ml-1 hover:bg-opacity-80 text-gray-50 font-medium text-sm rounded-xl px-2 py-1 "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStory;
