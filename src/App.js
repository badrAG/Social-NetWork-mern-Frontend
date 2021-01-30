import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { authCheck } from "./redux/actions/userActions";
import Users from "./components/user/Users";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import Auth from "./pages/auth/Auth";
import ModalStory from "./components/Modal/ModalStory";

function App({ currentUser }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  const styleToggle = true;
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Home currentUser={currentUser} />}
          />
          <Route
            path="/connect_people"
            exact
            component={() => <Users styleToggle={styleToggle} />}
          />
          <Route path="/@:userId" component={() => <Profile />} />
          <Route
            path="/edit/profile/:userId"
            exact
            component={() => <EditProfile />}
          />
          <Route
            path="/story/@:UserName/:storyId"
            exact
            component={() => <ModalStory />}
          />
          <Route path="/Signup"
          exact
          component={() => <Auth toggleLink={false} />} />
          <Route path="/Login"
          exact
          component={() => <Auth toggleLink={true} />} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(App);
