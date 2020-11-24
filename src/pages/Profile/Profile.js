import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/Navbar'
import SettingsIcon from '@material-ui/icons/Settings';
import './Profile.css'
import { useParams,Link } from 'react-router-dom';
import { checkAuth, isLogged } from '../../helpers/auth';
import { getUser } from '../../redux/actions/userActions';
import FollowButton from '../../Follower/FollowButton';
import FollowUserDisplay from '../../Follower/FollowUserDisplay';

function Profile({currentUser}) {
    const {userId}=useParams();
    const [error, setError] = useState("")
    const [user,setUser]=useState(null);
    const [following,setFollowing]=useState(false);
    const jwt = isLogged();

    useEffect(()=>{
        getProfile();
    },[userId]);

const getProfile=async()=>{  
          const userData = await getUser(jwt&&jwt.token,userId);
            if(userData.error) return setError(userData.error);
            setUser(userData.data);
           setFollowing(checkFollow(userData.data));
        }
    function handleButtonClick (user){
        setUser(user);
        setFollowing(!following);
    }
    const checkFollow = (user)=>{
        const match = user.followers.find((follower)=>{
            return follower._id === jwt.user._id;
        });
        return match;
    }
    const showError = ()=>{
    return error && <div className="alert alert-danger">{error}</div>
    }
    const [Follow, setFollow] = useState(null);
    const handleFollowModal = ()=>{
        setFollow(true);
    }
    const handleFollowingModal = ()=>{
        setFollow(false);
    }
    return (
        <>
        <NavBar currentUser={currentUser}/>
        <div className="profle"> 
            {error ? showError():<>
             <div className="profile__header">
                <div className="profile__info">
                    <div className="profile__followers" onClick={()=>handleFollowModal()} style={{ cursor:"pointer" }} data-toggle="modal" data-target="#exampleModal">
                    <h5>{user && user.followers.length}</h5><h6>Followers</h6>
                </div>
                <div className="profile__edpeo">
                    <div className="prolile__img">
                    <Avatar src={`http://localhost:8888/api/user/photo/${userId}`}/>
                </div>
                {
                    checkAuth(userId)?
                    <div className="profile__Sitting">
                    <Link to={`/edit/profile/${userId}`} ><SettingsIcon />
                    </Link>
                    </div>:<></>
                   }
                </div>
                
                <div className="profile__following" onClick={()=>handleFollowingModal()} style={{ cursor:"pointer" }} data-toggle="modal" data-target="#exampleModal">
                    <h5>{user && user.following.length}</h5><h6>Following</h6>
                </div>
                </div>
            </div>
            <div className="profile__adout">
                <div className="user__name">
                    <h4>@{user && user.UserName}</h4>
                </div>
            </div>
            <div className="adout__info">
                <div className="about">
                <p>{user && user.about}</p>
                </div>
           </div>
            {
                !checkAuth(userId)?
                    <div className="profile__follow">
                <div className="btn__follow">
               <FollowButton
               following={following}
               handleButtonClick={handleButtonClick}
               token={jwt && jwt.token}
               followId={userId && userId}
               userId={jwt && jwt.user._id}
               />
                </div>
                </div>
                :(<></>)
            }
            <>
            {
            Follow?
            <FollowUserDisplay jwt={jwt}  Follow={Follow} data={user && user.followers}/>:
            <FollowUserDisplay Follow={Follow}  data={user && user.following}/>
            
        }
        </>
        </>
        }
        
        </div>
        </>
    )
}

export default Profile
