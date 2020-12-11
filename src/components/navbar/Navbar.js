import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
import { isLogged, logout } from "../../helpers/auth";
import './NavBar.css'
import useDarkMode from '../../theme/DarkMode'
import { getUser } from "../../redux/actions/userActions";
import { ToggleButton } from "react-bootstrap";
function NavBar() {
  const [toggle, setToggle] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState();
  const history = useHistory();
 const userId = isLogged().user._id;
 const jwt = isLogged().token;
 const [colorTheme,setTheme] =useDarkMode();
const toggeler = () => {
    setToggle((prev) => !prev);
  };
useEffect(()=>{
  
   const getUserfunc = async ()=>{
    const userData = await getUser(jwt,userId);
      if(userData.error) return  console.log(userData.error);
        setUser(userData.data);
      }
      if(loading){
        getUserfunc();
      }
  return ()=>{
    setLoading(false);
  }
},[jwt,userId,loading])
  // Close the dropdown menu if the user clicks outside of it
  const reset = () => {
    window.onclick = function (event) {
      if (!event.target.matches(".dropbtn")) {
        if (toggle) {
          setToggle(false);
        }
      }
    };
  };
  // reset();
  return (
    <div className="sticky z-10  min-w-full py-1 px-2 inset-0 bg-white dark:bg-gray-800 flex items-center justify-around shadow-md ">
      <Link className="" to="/">
        <img
        className="object-cover h-7 md:h-10"
          src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo.png"
          alt="logo"
        />
      </Link>
      <div className="">
        <div className="flex py-1 px-2 ml-2 items-center bg-gray-100  rounded-md">
          <input type="text" className="border-none bg-transparent outline-none" placeholder="Search" />
          <SearchIcon />
        </div>
      </div>
      <div className="flex content-around">
        <div className="flex items-center md:mr-2 cursor-pointer pl-1 pr-2  hover:border-green-400 hover:border-2">
          <Link className=" text-gray-900 flex items-center" to={`/@${user && user._id}`}>
            <Avatar
            className="avater"
              src={`http://localhost:8888/api/user/photo/${
                user && user._id
              }`}
            />
            <h4 className="hidden md:ml-1 md:block md:font-semibold md:text-lg font-semibold">@{user && user.UserName}</h4>
          </Link>
        </div>
        <div className="relative inline-block">
          <IconButton onClick={toggeler} className="dropbtn text-gray-200 p-2 text-sm border-none cursor-pointer hover:focus:bg-gray-50 hover:focus:outline-none">
            <ExpandMoreIcon />
          </IconButton>
          <div
            id="myDropdown"
            className={toggle ? "absolute block bg-white rounded-sm min-w-8 shadow-md z-10 -right-1" : "hidden"}
          >
            <div onClick={()=>setTheme(colorTheme)}>
              Switch Mode
           { colorTheme == 'light' ? 
           <i className="fas fa-moon"></i>:
            <i className="far fa-sun"></i>
            }
            </div>
            <Link
              to="#"
              className="block w-20 text-black text-xs font-semibold px-3 py-2 hover:bg-gray-50 "
              onClick={() => {
                logout(() => {
                  history.push("/login");
                });
              }}
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
