import { Avatar } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { isLogged } from "../../helpers/auth";
import moment from 'moment';
import { deleteStory, getStory, removeImage } from "../../redux/actions/storyAction";
import "./ModalStory.css";
function ModalStory() {
  const dispatch = useDispatch();
  const { storyId } = useParams();
  const history = useHistory();
  const userId = isLogged().user._id;
  const token = isLogged().token;
  const story = useSelector((state) => state.story);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    dispatch(getStory(token, storyId));
    return ()=> {
      clearTimeout(timer)

    }
  }, [dispatch, token, storyId]);
  
  const length = story.story.Image?.length;
 const timer = setTimeout(() => {
    if (length - 1 > index) {
      setIndex(index + 1);
    } else if (length - 1 === index) {
      history.push("/");
    }
  }, 10000);
  const getClassProgress = (i)=>{
      if(i < index){
          return "progress-bar progress-bar-finished rounded-3xl"
      }else if(i === index){
        return "progress-bar progress-bar-active"
      }else{
          return "progress-bar"
      }
  }
const deleteImage =(index)=>{
  if(length === 1){
    dispatch(deleteStory(story.story?._id,token))
  }else{
    dispatch(removeImage(story.story?.Image[index]._id, story.story?._id, token))
  }
}
  return (
    <div className="flex justify-center w-full h-screen fixed top-0 z-20 bg-gray-900">
      <div
        onClick={() => history.goBack()}
        className="absolute cursor-pointer top-4 right-4"
      >
        <span className="w-20 h-20 rounded-full hover:bg-gray-400 text-xl text-white font-semibold">
          X
        </span>
      </div>
      <div className="relative flex items-center justify-center w-10/12 md:w-1/5 h-5/6 mt-12 rounded-xl bg-black shadow-lg">
        <div className="absolute top-0 inset-x-0 pl-2 pt-2 pb-3 header__story">
         <div className="flex mt-2">
            {
            story.story.Image?.map((item,i) => (
              <div key={i} style={{height:"2px"}} className="flex-1 mx-1 rounded-3xl bg-black bg-opacity-25">
                  <div style={{animationDuration:"10s"}} className={getClassProgress(i)}></div>
              </div>
            ))} </div> 
          <div className="flex items-center justify-between mt-2">
           <div className="flex items-center">
             <Avatar
              style={{ width: "27px", height: "27px" }}
              src={story.story.StoryBy?.image}
            />
            <div className="flex flex-col pl-2">
              <span className="text-sm text-white font-bold pr-1">
                {story.story.StoryBy?.UserName}
              </span>
              <small className="text-gray-300 text-xs font-light">{moment(story.story?.createdAt).fromNow(true)}</small>
            </div>
             </div> 
            { story.story.StoryBy?._id === userId &&
              <div onClick={()=>deleteImage(index)} className="text-white text-xs md:text-sm font-medium pr-2 cursor-pointer">
              &bull;
              &bull;
              &bull;
            </div>}
          </div>
        </div>
        <img
          className="paused object-cover"
          src={story.story.Image && story.story.Image[index]?.picture}
          alt={`story by ${story.story.StoryBy?.UserName}`}
        />
        {index < length - 1 && (
          <div
            className="absolute -right-6 top-1/2"
            onClick={() => {setIndex(index + 1);clearTimeout(timer)}}
          >
            <span className="text-gray-300 font-semibold p-1 rounded-full text-lg cursor-pointer bg-gray-800 hover:bg-gray-500">
              &gt;
            </span>
          </div>
        )}
        {index > 0 && (
          <div
            className="absolute -left-6 top-1/2"
            onClick={() => {setIndex(index - 1);clearTimeout(timer)}}
          >
            <span className="text-gray-300 font-semibold p-1 rounded-full text-lg cursor-pointer bg-gray-800 hover:bg-gray-500">
              &lt;
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalStory;
