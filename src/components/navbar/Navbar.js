import React from 'react'
import '../navbar/NavBar.css'
import {Link, useHistory} from 'react-router-dom'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, IconButton } from '@material-ui/core';
import { logout } from '../../helpers/auth';
function NavBar({currentUser}) {
  const [toggle, setToggle] = React.useState(false);
 const history = useHistory();

  const toggeler = () =>{
    setToggle((prev)=>!prev);
}
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        if (toggle) {
         setToggle(false)
        }
    }
  }
    return (
       <div className="header">
         <div className="header__left">
            <img src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo.png" alt="logo"/>
         </div>
         <div className="header__center">
           <Link className="header__option--active" to="/">
              <HomeIcon fontSize="large"/>
           </Link>
            <div className="header__input">
              
              <input type="text" placeholder="Search"/>
            <SearchIcon/>
            </div>
            
         </div>
         <div className="header__right">
            <div className="header_info">
              <Link to={`/user/${currentUser && currentUser.user._id}`}>
              <Avatar/>
            <h4>@{currentUser && currentUser.user.UserName}</h4>
            </Link>
            </div>
            <div className="dropdown">
  <IconButton onClick={toggeler} className="dropbtn">
    <ExpandMoreIcon />
    </IconButton>
  <div id="myDropdown" className={toggle?"dropdown-content-show":"dropdown-content"}>
    {
      !currentUser ?
     ( <>
      <Link to="/signup">Sign Up</Link>
    <Link to="/login" >Log In</Link>
    </>)
    :
    (<>
    <Link onClick={
      ()=>{logout(()=>{
      history.push("/login");
      })}
    }>Log Out</Link>
    </>)
    }
  </div>
</div>
         </div>
         </div>
    )
}

export default NavBar
