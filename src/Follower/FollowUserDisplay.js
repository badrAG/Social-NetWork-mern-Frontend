import React from 'react'
import FollowOption from './FollowOption';
import "./Follow.css";
function FollowUserDisplay({Follow,data}) {
return (
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="relative modal__follow dark:bg-gray-700 flex flex-col w-full pointer-events-auto bg-clip-padding rounded-md outline-none">
      <div className="modal-header">
        <h5 className="modal-title dark:text-gray-50" id="exampleModalLabel">{Follow?"Followers":"Following"}</h5>
        <button type="button" className="  dark:text-gray-50 close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
           {data && data.length>0?
                 data.map((user)=>(
                    <div key={user._id} >
                     <FollowOption userId={user._id} />
                     <hr/>
                    </div>
                    )
                )
                :<h5>Empty{Follow?" Followers":" Following"}</h5>
            }
      </div>
    </div>
  </div>
</div>
           
        
    )
}

export default FollowUserDisplay
