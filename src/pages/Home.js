import React from 'react'
import { Link } from 'react-router-dom'
import Postler from '../components/divposter/Postler'
import NavBar from '../components/navbar/Navbar'
import Posts from '../components/posts/Posts'
import Users from '../components/user/Users'
import '../components/user/Users.css'
function Menu({currentUser}) {
  const styleToggel = false;
    return (
        <>
        { currentUser ?(
        <>
         <NavBar currentUser={currentUser}/>
        <div className="row">
        <div className="col col-md-2 card__users" style={styleToggel?{ margin:"0px" }:{marginLeft:"31px"}}>
        <Users styleToggel={styleToggel} />
        </div>
        <div className="col-md-6 ms-12">
            <Postler currentUser={currentUser.user._id}/>
           
          <Posts/>
          <Posts/>
          <Posts/>
          <Posts/>
        </div>
      </div>
      </>):(<>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login" >Log In</Link></>)
      }
        </>
    )
}

export default Menu
