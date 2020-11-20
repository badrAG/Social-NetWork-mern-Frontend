import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import FollowOption from './FollowOption';

function FollowUserDisplay({Follow,data}) {
return (
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{Follow?"Followers":"Following"}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
           {data && data.length>0?
                 data.map((user)=>(
                   <>
                    <div key={user._id} >
                    </div>
                     <FollowOption userId={user._id} />
                     <hr/>
                     </>
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
