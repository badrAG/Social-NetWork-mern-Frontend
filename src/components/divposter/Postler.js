import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import "./Postler.css";
import { isLogged } from "../../helpers/auth";
import { useDispatch } from "react-redux";
import { addPost, getAllPosts } from "../../redux/actions/postAction";

function Postler() {
  const userId = isLogged()?.user._id;
  const token = isLogged()?.token;
  const [file, setFile] = useState();
  const [video, setVideo] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  
  const handlePictureChange = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo('');
  };
  const handlePost = async (e) => {
    if (e.key === "Enter"){
      if (text || postPicture || video) {
        const data = new FormData();
        data.append('text', text);
        if (file) data.append("file", file);
        data.append('video', video);
        
        await dispatch(addPost(token,data,userId));
        await dispatch(getAllPosts(token, userId));
        cancelPost();
      } else {
        alert("Veuillez entrer un message")
      }
    }
  };
  const handleClickPost = async (e) => {
      e.preventDefault();
      if (text || postPicture || video) {
        const data = new FormData();
        data.append('text', text);
        if (file) data.append("file", file);
        data.append('video', video);
  
        await dispatch(addPost(token,data,userId));
        await dispatch(getAllPosts(token, userId));
        cancelPost();
      }
  };
  const cancelPost = () => {
    setText("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };
  useEffect(() => {

    const handleVideo = () => {
      let findLink = text.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setText(findLink.join(" "));
          setPostPicture('');
        }
      }
    };
    handleVideo();
  }, [text, video]);
  return (
    <div className="postele dark:bg-gray-700 p-1 shadow-md mx-auto mt-3 md:block md:w-1/2 rounded-md transition duration-500">
      <div className="flex items-center justify-around p-2">
        <Avatar
          src={`https://api-social-network-mern.herokuapp.com/api/user/photo/${userId && userId}`}
        />
        <div className=" bg-gray-200 dark:bg-gray-500 rounded-2xl mx-1 w-full transition duration-500">
          <input
            className="border-none bg-transparent dark:text-gray-50 p-2 w-full outline-none"
            type="text"
            name="text"
            value={text}
            onKeyDown={(e) => handlePost(e)}
            onChange={(e) => 
              setText(e.target.value)
            }
            placeholder="What on your mind..."
          />
        </div>
        {!video && (<label className="bg-gray-200 dark:bg-gray-500 rounded-2xl cursor-pointer p-2 m-0 relative flex items-center w-20 text-gray-700 transition duration-500">
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
          <h6 className="m-0 dark:text-gray-300 font-medium">Photo</h6>
        </label>)}
      </div>
      {postPicture || video.length >20 ? (
           <div className="px-2">
           <p className="dark:text-white font-semibold ">{text}</p>
           {postPicture && <img src={postPicture} 
          className="w-full h-full py-2"
          alt="picture" />}
           {video && (
             <div>
               <iframe
                 src={video}
                 className="w-full h-56"
                 frameBorder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
                 title={video}
               ></iframe>
             </div>
           )}
           <div className="flex justify-end py-2">
           {
                video && 
                <button onClick={()=>setVideo("")} className="ml-1 border-green-600 border-solid border-2 text-green-500 font-medium text-sm rounded-xl px-2 py-1">Clear Video</button>
              }
             {postPicture || video.length > 20 ? (
                <button className="bg-green-600 ml-1 text-gray-50 font-medium text-sm rounded-xl px-2 py-1" onClick={(e)=>handleClickPost(e)}>
                    Send
                  </button>
                ) :null
              }
           {text || postPicture || video.length > 20 ? (
             <button className="bg-gray-500 ml-1 text-gray-50 font-medium text-sm rounded-xl px-2 py-1" onClick={cancelPost}>
                    Cancel
                  </button>
                ) :null
              }
              
              </div>
         </div>
        ): null}
    </div>
    
  );
}

export default Postler;
