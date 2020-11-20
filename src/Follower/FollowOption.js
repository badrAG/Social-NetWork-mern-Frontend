import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { checkAuth, isLogged } from '../helpers/auth';
import { getUser } from '../redux/actions/userActions';
import FollowButton from './FollowButton'
import './Follow.css'
import { useHistory } from 'react-router-dom';

function FollowOption({userId}) {
    const jwt = isLogged();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const getProfile=async()=>{  
            const userData = await getUser(jwt&&jwt.token,userId);
            const myData = await getUser(jwt&&jwt.token,jwt && jwt.user._id);
              if(myData.error) return setError(myData.error);
             setFollowing(checkFollow(myData.data));
             setUser(userData.data);
          }
          getProfile();
 },[userId,jwt]);
 const history = useHistory();



 const [following, setFollowing] = useState(false);

 function handleButtonClick (user){
     setFollowing(!following);
 }
    const checkFollow = (data)=>{
     const match =data && data.following.find((follower)=>{
          return follower && follower._id === userId;
    });
        return match;
    }
    
    return (
        <div className="d-flex mb-2 align-items-center justify-content-between">
            {error}
            <div style={{ cursor:"pointer" }} 
        onClick={()=>history.push(`/i/${user._id}`)}
        data-dismiss="modal" aria-label="Close">
                <div className="d-flex align-items-center">
            <Avatar/>
            <h6 className="follow__name ml-2">{user && user.UserName}</h6>
        </div>
            </div>
        
        {!checkAuth(user && user._id)?
        <FollowButton
          following={following}
          handleButtonClick={handleButtonClick}
          token={jwt && jwt.token}
          followId={user && user._id}
          userId={jwt && jwt.user._id}
        />:<></>
        }
        </div>
        
    )
}

export default FollowOption
