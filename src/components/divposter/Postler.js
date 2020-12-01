import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import './Postler.css'
import { isLogged } from '../../helpers/auth';
import { useDispatch } from 'react-redux';
import { addPost } from '../../redux/actions/postAction';

function Postler() {

    const userId = isLogged().user._id;
    const token = isLogged().token;
    const [post, setPost] = useState({
        text:"",
    });
    const dispatch = useDispatch()
    const handleInputChange = (e) =>{
        setPost({...post,[e.target.name]:e.target.value});
    }
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        dispatch(addPost(token,post,userId));
    }
    return (
        <div className="container">
        <div className="row align-items-center p-2">
            <div className="col col-lg-2 user__post" >
                <div className="info__post ">
             <Avatar src={`http://localhost:8888/api/user/photo/${userId && userId}`}/>
         </div>
            </div>
            <div className="col col-md-6">
                <div className=" post__input ">
                 <input type="text" name="text" onChange={(e)=>{handleInputChange(e)}} placeholder='What on your mind...' />
                 <input type="submit" onClick={(e)=>handleFormSubmit(e)}/>
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

export default Postler
