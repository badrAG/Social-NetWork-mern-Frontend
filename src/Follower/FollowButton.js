import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Button } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Follow,unFollow } from '../redux/actions/userActions';
import '../pages/Profile/Profile.css'

function FollowButton({following,
handleButtonClick,
userId,
token,
followId,
styleprofile
}) {

    const followUser =async ()=>{
        const userData = await Follow(userId,followId,token);
        if(userData.error) return console.log(userData.error);
        handleButtonClick(userData.data);
    }

    const unFollowUser = async()=>{
        const userData = await unFollow(userId,followId,token);
        if(userData.error) return console.log(userData.error);
        handleButtonClick(userData.data);
    }

    return (
        <>
        {
            !following ?
            <Button variant="contained"
            className ={styleprofile ? "btn__Follow w-28":"btn__Follow w-52"}
            startIcon={<FavoriteIcon />}
            onClick={()=> followUser()}
            >
                Follow
            </Button>:
            <Button variant="contained"
            className={styleprofile ? "btn__unFollow w-32":"btn__unFollow w-52"}
            startIcon={<FavoriteBorderIcon />}
            onClick={()=> unFollowUser()}
            >
                UnFollow
            </Button>
        }
        </>
    )
}

export default FollowButton
