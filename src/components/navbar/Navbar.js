import React, { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
import { isLogged, logout } from "../../helpers/auth";
import "./NavBar.css";
import logo from "../../asset/logo.png";
import useDarkMode from "../../theme/DarkMode";
import { connect, useDispatch, useSelector } from "react-redux";
function NavBar() {
  const [toggle, setToggle] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [userFound, setUserFound] = React.useState();
  const [users, setUsers] = React.useState();
  const [user, setUser] = React.useState();
  const history = useHistory();
  const [colorTheme, setTheme] = useDarkMode();
  const toggeler = () => {
    setToggle((prev) => !prev);
  };
  const userData = useSelector((state) => state.user);
  useEffect(() => {
    setUser(userData?.currentUser.user);
    setUsers(userData?.users);
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
    <div className="navBar sticky z-10  min-w-full py-1 px-2 inset-0  dark:bg-gray-700 flex items-center justify-around shadow-md transition duration-500">
      <Link className="no-underline" to="/">
        <img
          className="object-cover h-6 md:h-8 focus:outline-none"
          src={logo}
          alt="logo"
        />
      </Link>
      <div className="relative">
        <div className="flex py-1 px-2 md:w-64 w-40 h-7 ml-2 items-center justify-between bg-gray-100 dark:bg-gray-500 transition duration-500  rounded-md">
          <input
            type="text"
            className="border-none w-28 md:w-52 bg-transparent dark:text-gray-50 outline-none"
            placeholder="Search"
            onChange={(e) => handleSearchChange(e)}
          />
          <SearchIcon className="dark:text-gray-100 text-gray-400" />
        </div>
        <div className=" search rounded-lg shadow-sm dropdown mt-1.5 dark:bg-gray-600 absolute w-full">
          {userFound ? (
            userFound.map((user, i) => (
              <div className="mt-1.5 py-1" key={i}>
                <Link className="no-underline" to={`/@${user._id}`}>
                  <div className="flex items-center py-1 px-2 cursor-pointer hover:bg-gray-500">
                    <Avatar
                      className="avater "
                      src={`http://localhost:8888/api/user/photo/${
                        user && user._id
                      }`}
                    />
                    <p className="text-lg font-semibold ml-1 dark:text-gray-100">
                      @{user.UserName}
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
              src={`http://localhost:8888/api/user/photo/${user && user._id}`}
            />
            <h4 className="hidden md:ml-1 md:block md:font-semibold md:text-lg font-semibold">
              @{user && user.UserName}
            </h4>
          </Link>
        </div>
        <div className="relative inline-block">
          <IconButton
            onClick={toggeler}
            className="dropbtn text-gray-200 dark:text-gray-50  p-2 text-sm border-none cursor-pointer hover:focus:bg-gray-50 hover:focus:outline-none transition duration-500"
          >
            <ExpandMoreIcon />
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
