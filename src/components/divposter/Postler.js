import { Avatar } from '@material-ui/core'
import React from 'react'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import './Postler.css'

function postler({currentUser}) {
    return (
        <div className="container">
        <div className="row align-items-center p-2">
            <div className="col col-lg-2 user__post" >
                <div className="info__post ">
             <Avatar src={`http://localhost:8888/api/user/photo/${currentUser && currentUser}`}/>
         </div>
            </div>
            <div className="col col-md-6">
                <div className=" post__input ">
                 <input type="text" placeholder='What on your mind...' />
                </div>
         </div>
            <div className="col col-md-4 ">
                <label className="file__input">
             <input type="file" multiple  accept="image/*" name="image"/>
             <AddPhotoAlternateIcon className="file__icon"/>
             <h6>Photo</h6>
         </label>
            </div>
         
     </div>
     
 </div>
    )
}

export default postler
