import React from 'react'
import '../navbar/NavBar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, IconButton } from '@material-ui/core';
function NavBar() {
  const [toggle, setToggle] = React.useState(false);

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
           <div className="header__option--active">
              <HomeIcon fontSize="large"/>
           </div>
            <div className="header__input">
              
              <input type="text" placeholder="Search"/>
            <SearchIcon/>
            </div>
            
         </div>
         <div className="header__right">
            <div className="header_info">
              <Avatar/>
              <h4>BadrAG</h4>
            </div>
            <div className="dropdown">
  <IconButton onClick={toggeler} className="dropbtn">
    <ExpandMoreIcon />
    </IconButton>
  <div id="myDropdown" className={toggle?"dropdown-content-show":"dropdown-content"}>
    <a href="/">Link 1</a>
    <a href="/">Link 2</a>
    <a href="/">Link 3</a>
  </div>
</div>
         </div>
         </div>
    )
}

export default NavBar
