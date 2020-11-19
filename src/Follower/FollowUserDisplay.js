import { Avatar } from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router-dom'

function FollowUserDisplay({Follow,data}) {
    const history = useHistory();
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
           {data &&
               data.length>0?
                 data.map((user)=>(
                    <div key={user._id} style={{ cursor:"pointer" }} 
                    onClick={()=>history.push(`/i/${user._id}`)}
                    data-dismiss="modal" aria-label="Close">
                    <div className="d-flex mb-2 align-items-center">
                    <Avatar/>
                    <div className="follow__name ml-2">
                        <h6>{user.UserName}</h6>
                    </div>
                    </div>
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
