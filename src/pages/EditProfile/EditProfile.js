import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {useHistory, useParams } from 'react-router-dom'
import NavBar from '../../components/navbar/Navbar';
import { checkAuth, isLogged } from '../../helpers/auth';
import { getUser } from '../../redux/actions/userActions';

function EditProfile({currentUser}) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory()
    const jwt = isLogged();
    const {userId} = useParams();
    const userData = new FormData();
    const [user, setUser] = useState({
        name:"",
        UserName:"",
        email:"",
        password:"",
        aboute:"",
        image:""
    });

    React.useEffect(() => {
        if(!checkAuth(userId)){
            history.push(`/i/${userId}`);
        }
        const getProfile=async()=>{  
            const userData = await getUser(jwt&&jwt.token,userId);
              if(userData.error) return setError(userData.error);
              setUser(userData.data);
          }
          getProfile();
      }, [userId,checkAuth()])

    const redirectUser=()=>{
        success && history.push(`/i/${userId}`);
    }
    const showError =()=>{
        return error && <div className="alert alert-danger">{error}</div>
        }
    const handleInputChange = (e) =>{
        const value = e.target.name ==="image"
        ?e.target.files[0]:e.target.value;
        setUser({...user,[e.target.name]:value});
    }
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        console.log(user);
    }
    return (
        <>
        <NavBar currentUser={currentUser}/>
        <div className="row">
            <div className="col-md-6 ms-4 offset-3 card__Allusers">
        <div className="row">
            <div className="col-md-12 ms-6">
                {showError()}
                <div className="users__title">
                    <h6>Edit Profile</h6>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col col-md-10">

        <form onSubmit={handleFormSubmit}>
       <div className="form-group">
            <input type="text" name="name" placeholder="Name" onChange={(e)=>handleInputChange(e)} value={user.name} className="form-control" />
        </div>
       <div className="form-group">
    <input type="text" name="UserName" placeholder="User Name" onChange={(e)=>handleInputChange(e)} value={user.UserName.split(" ").join("")} className="form-control" />
  </div>
  <div className="form-group">
    <textarea name="about" row='5' cols='21' placeholder='Bio' onChange={(e)=>handleInputChange(e)} value={user.aboute} className="form-control" />
  </div>
  <div className="form-group">
    <input type="email" name="email" placeholder="Email" onChange={(e)=>handleInputChange(e)} value={user.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <input type="password" name="password" placeholder="Password" onChange={(e)=>handleInputChange(e)} value={user.password} className="form-control" />
  </div>
  <button type="submit" className="btn btn-primary">Edit</button>
 </form> 
 </div>

        </div>
        </div>
    </div>
    </>
    )
}

export default EditProfile
