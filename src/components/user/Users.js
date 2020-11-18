import React, { Fragment, useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import './Users.css'
import NavBar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import {connect,useDispatch} from 'react-redux'
import { getAllUsers } from '../../redux/actions/userActions';
 

function Users({users,userError,currentUser,styleToggle}) {
    const  dispatch = useDispatch();

    const[error,setError]=useState(null);

    useEffect(()=>{
        if(userError && userError !== null){
            setError(userError);
          }
          dispatch(getAllUsers(currentUser &&currentUser.user.token));
    },[userError,currentUser,dispatch]);


    const showError =()=>{
        return error && <div className="alert alert-danger">{error}</div>
        }

    return (
        <>
        {
         styleToggle? <NavBar currentUser={currentUser}/>:<></>
        }
        <div className={styleToggle?"row":""}>
            <div className={styleToggle?"col-md-6 ms-4 offset-3 card__Allusers":""} >
            <div className="row">
                <div className="col-md-12 ms-6">
                    <div className="users__title">
                        <h6>Suggestions For You</h6>
                    </div>
                </div>
            </div>
            <div className="row">
                {showError()}
                {
                    users && users.map((user,i) =>(
                        
                        <Fragment key={i}>
                        {
                            !styleToggle && i>=4 ?(
                              <></>
                            ):(
                                <>
                                <Link to={`/${user._id}`} className="col col-md-8 users__content" >
                                    <div className="row">
                                        <div className={styleToggle?"col col-md-1 user_avatar":"col col-md-3 user_avatar"}>
                                          <Avatar src={`http://localhost:8888/api/user/photo/${user._id}`}/>
                                        </div>
                                         <div className="col col-md-8 user__name">
                                    <h6>@{user.UserName}</h6>
                                             <p>{user.name}</p>
                                         </div>
                                    </div>
                                </Link>
                               <div className="cepar__users" style={!styleToggle?{ width: "85%" }:{width: "95%"}}></div>
                               </>
                            )
                        }
               </Fragment>
              ))
                }
            </div>
            </div>
        </div>
            {
              !styleToggle?  <div className="row">
                  <Link to="/connect_people" className="col-md-12 p-2 ms-8 user__more">
                <div className="col-md-10 offset-3">
                    Show More
                </div></Link>
            </div>:<></>
            }
            
        </>
    )
}

const mapStateToProps = ({user : {users,userError,currentUser}})=>({
    users,
    userError,
    currentUser
})

export default connect(mapStateToProps,null)(Users);
