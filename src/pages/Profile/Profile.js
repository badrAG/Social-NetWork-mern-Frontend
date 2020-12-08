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
import Posts from '../../components/posts/Posts';
import { getUserPosts } from '../../redux/actions/postAction';

function Profile({currentUser}) {
    const {userId}=useParams();
    const [error, setError] = useState("")
    const [user,setUser]=useState(null);
    const [userPost,setUserPost]=useState(null);
    const [following,setFollowing]=useState(false);
    const [lentFollower,setLentFollower]=useState(null);
    const [lentFollowing,setLentFollowing]=useState(null);
    const [loading,setLoading]=useState(true);
    const jwt = isLogged();
    useEffect(()=>{
         const checkFollow = (user)=>{
        const match = user.followers.find((follower)=>{
            return follower._id === jwt.user._id;
        });
        return match;
        }
        const getProfile=async()=>{  
          const userData = await getUser(jwt&&jwt.token,userId);
           const postData = await getUserPosts(jwt && jwt.token,userId);
             if(userData.error) return setError(userData.error);
             if(postData.error) return setError(postData.error);
            setUser(userData.data);
             setUserPost(postData.data);
           setFollowing(checkFollow(userData.data));
        }
        if (loading){
          getProfile();
        }
        return ()=>{
            setLoading(false);
        };
    },[userId,loading,jwt]);

    useEffect(()=>{
        setLentFollower(user?.followers.length);
        setLentFollowing(user?.following.length);
    },[userId,user?.followers.length,user?.following.length])

    function handleButtonClick (user){
        setUser(user);
        setFollowing(!following);
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
        <div className="profile bg-white col-md-8 offset-2">
            {error ? showError():<>
             <div className="profile__header">
                <div className="profile__info">
                    <div className="profile__followers" onClick={()=>handleFollowModal()} style={{ cursor:"pointer" }} data-toggle="modal" data-target="#exampleModal">
                    <h5>{lentFollower}</h5><h6>Followers</h6>
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
                    <h5>{lentFollowing}</h5><h6>Following</h6>
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
               userPost?.length === 0 ?(<div>add first post</div>)
                :
               (userPost?.map(post =>(
                <Posts post={post} key={post._id}/>
              )
              )
              )
           } 
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
        
        </div>
        </>
    )
}
export default Profile
