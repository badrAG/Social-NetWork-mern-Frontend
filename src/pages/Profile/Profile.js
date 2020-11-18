import { Avatar, Button } from '@material-ui/core'
import React from 'react'
import './Profile.css'
function Profile() {
    return (
        <div className="profle"> 
            <div className="profile__header">
                <div className="profile__info">
                    <div className="profile__followers">
                    <h5>Followers</h5>
                </div>
                <div className="prolile__img">
                   <Avatar/>
                </div>
                <div className="profile__following">
                    <h5>Following</h5>
                </div>
                </div>
            </div>
            <div className="profile__follow">
                <div className="btn__follow">
                <Button variant="contained" color="primary">
                    Follow
                </Button>
                </div>
        </div>
        <div className="profile__adout">
            <div className="adout__info">
                
            </div>
        </div>
        </div>
    )
}

export default Profile
