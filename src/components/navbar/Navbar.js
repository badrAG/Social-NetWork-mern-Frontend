import React, { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
import { isLogged, logout } from "../../helpers/auth";
import "./NavBar.css";
import logo from "../../asset/logo.png";
import useDarkMode from "../../theme/DarkMode";
import { useSelector } from "react-redux";
function NavBar({styleprofile}) {
  const [toggle, setToggle] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [userFound, setUserFound] = React.useState();
  const [users, setUsers] = React.useState();
  const history = useHistory();
  const [colorTheme, setTheme] = useDarkMode();
  const toggeler = () => {
    setToggle((prev) => !prev);
  };
  const user = isLogged()?.user
  const userData = useSelector((state) => state.user);
  useEffect(() => {
    setUsers(userData?.users);
    return ()=>{
      setUsers(null)
    }
  }, [user]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    const searchQuery = search.toLowerCase();
    const userFond = users?.filter((user) => {
      return (
        user.UserName.toLowerCase().includes(searchQuery) ||
        user.name.toLowerCase().includes(searchQuery)
      );
    });
    if (e.target.value == "") {
      setUserFound(null);
    } else {
      setUserFound(userFond);
    }
  };

  // Close the dropdown menu if the user clicks outside of it
  const reset = () => {
    window.onclick = function (event) {
      if (!event.target.matches(".search")) {
        if (userFound) {
          setUserFound(null);
        }
      }
      if (!event.target.matches(".dropbtn")) {
        if (toggle) {
          setToggle(false);
        }
      }
    };
  };
  reset();
  return (
    <div className={styleprofile?"bg-transparent fixed z-30  min-w-full py-1 px-2 top-0 right-0 left-0 flex items-center justify-around transition duration-500":"navBar sticky z-30  min-w-full py-1 px-2 inset-0  dark:bg-gray-700 flex items-center justify-around shadow-md transition duration-500"}>
      <Link className="no-underline" to="/">
        <img
          className="object-cover h-6 md:h-8 focus:outline-none"
          src={logo}
          alt="logo"
        />
      </Link>
      <div className="relative">
        <div className={styleprofile?"flex py-1 px-2 md:w-64 w-40 h-7 ml-2 border-2 border-gray-300 items-center justify-between bg-gray-50 bg-opacity-60 transition duration-500  rounded-md":"flex py-1 px-2 md:w-64 w-40 h-7 ml-2 items-center justify-between bg-gray-100 dark:bg-gray-500 transition duration-500  rounded-md"}>
          <input
            type="text"
            className={styleprofile?"border-none w-28 md:w-52 bg-transparent text-gray-600 outline-none":"border-none w-28 md:w-52 bg-transparent dark:text-gray-50 outline-none"}
            placeholder="Search"
            onChange={(e) => handleSearchChange(e)}
          />
          <SearchIcon className="dark:text-gray-100 text-gray-400" />
        </div>
        <div className=" search rounded-lg shadow-sm dropdown mt-1.5 dark:bg-gray-600 absolute w-full">
          {userFound ? (
            userFound.map((user, i) => (
              <div className="mt-1.5 py-1" key={i}>
                <Link className="no-underline" to={`/@${user?._id}`}>
                  <div className="flex items-center py-1 px-2 cursor-pointer hover:bg-gray-500">
                    {user && <Avatar
                      className="avater "
                      src={user?.image}
                    />}
                    <p className="text-lg font-semibold ml-1 dark:text-gray-100">
                      @{user?.UserName}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="hidden"></div>
          )}
        </div>
      </div>
      <div className="flex content-around">
        <div className="flex items-center md:mr-2  pl-1 pr-2 ">
          <Link
            className=" text-gray-900 flex dark:text-gray-50 cursor-pointer items-center no-underline"
            to={`/@${user && user._id}`}
          >
            <Avatar
              className="avater"
              src={user?.image}
            />
            <h4 className={styleprofile ? "hidden md:ml-1 md:block text-white md:font-semibold md:text-lg font-semibold":"hidden md:ml-1 md:block md:font-semibold md:text-lg font-semibold"}>
              @{user && user.UserName}
            </h4>
          </Link>
        </div>
        <div className="relative inline-block ">
          <IconButton
            onClick={toggeler}
            className="dropbtn text-gray-200 dark:text-gray-50  p-2 text-sm border-none cursor-pointer hover:focus:bg-gray-50 hover:focus:outline-none transition duration-500"
          >
            <ExpandMoreIcon className={styleprofile ? "text-gray-50" :""}/>
          </IconButton>
          <div
            id="myDropdown"
            className={
              toggle
                ? "dropdown absolute block dark:bg-gray-700 rounded-sm min-w-8 shadow-md z-10 -right-1 transition duration-500"
                : "hidden"
            }
          >
            <div
              className="flex items-center justify-around pr-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-500"
              onClick={() => setTheme(colorTheme)}
            >
              <p className="w-max text-black dark:text-gray-50 text-xs font-semibold px-3 py-2">
                {colorTheme == "light" ? <>Light</> : <>Dark</>} Mode
              </p>
              {colorTheme == "light" ? (
                <i className="far fa-sun text-yellow-400"></i>
              ) : (
                <i className="fas fa-moon "></i>
              )}
            </div>
            <div className="flex items-center justify-start pr-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-500">
              <Link
                to="#"
                className="w-max text-black dark:text-gray-50 text-xs font-semibold px-3 py-2 no-underline"
                onClick={() => {
                  logout(() => {
                    history.push("/Login");
                  });
                }}
              >
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
