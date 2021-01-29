import React from 'react'
import FollowOption from './FollowOption';
import "./Follow.css";
function FollowUserDisplay({openModalFollow,Follow,data}) {
return (
  <div className="flex justify-center w-full h-screen fixed inset-0 z-30 bg-black bg-opacity-50">
    <div className="relative lg:w-2/5 h-4/5 w-5/6 md:w-6/12 mt-12 p-2 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex justify-between items-center pb-2 px-2 border-gray-400 border-b-2 mb-2">
        <h3 className="dark:text-white font-semibold">{Follow?"Followers":"Following"}</h3>
        <span
          onClick={openModalFollow}
          className="flex items-center justify-center text-sm p-2 font-semibold dark:text-white cursor-pointer w-4 h-4 rounded-full hover:bg-gray-500"
        >
          X
        </span>
      </div>
      <div className="flex flex-col space-y-3 overflow-auto">
        {data && data.length > 0 ? (
          data.map((user) => (
            <div key={user._id}>
              <FollowOption userId={user._id} openModalFollow={openModalFollow} />
              <hr />
            </div>
          ))
        ) : (
          <h5 className="dark:text-white text-lg font-medium ">Empty{Follow ? " Followers" : " Following"}</h5>
        )}
      </div>
    </div>
    </div>
           
        
    )
}

export default FollowUserDisplay
