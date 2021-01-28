import React, { useState } from "react";
import DetailsModal from "../DetailsModal/DetailsModal";
const PhotoPosts = ({ data,type }) => {
const [showItem, setShowItem] = useState();
const [open, setOpen] = useState(false);
const openModal = ()=>{
  setOpen(!open);
}
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
      {data.map((item, i) => (
        <div className="relative cursor-pointer" key={i}>
         {type ? <img
            className="w-full h-full object-cover"
            src={item.image}
            alt="image"
          />:
          <iframe
          className="w-full h-full"
          src={item.video}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={item.video}
        ></iframe>
          }
          <div onClick={()=> {setShowItem(item);openModal()}} className="absolute inset-0 bg-black opacity-0 hover:opacity-70 flex items-center space-x-3 justify-center">
            <span className="flex text-white font-medium text-lg items-center"><i className="far fa-heart text-xl text-white font-semibold pr-1"></i>{item.likes.length}</span>
            <span className="flex text-white font-medium text-lg items-center"> <i className="far fa-comment-dots text-xl text-white font-semibold pr-1"></i>{item.comments.length}</span>
          </div>
        </div>
      ))}
    </div>
    {open && <DetailsModal item={showItem} openModal={openModal} type={type}/>}
    </>
  );
};

export default PhotoPosts;
