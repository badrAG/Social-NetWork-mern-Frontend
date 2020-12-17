import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { authCheck } from "./redux/actions/userActions";
import Users from "./components/user/Users";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import Auth from "./pages/auth/Auth";

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
            component={() => <Users styleToggle={styleToggle} />}
          />
          <Route path="/@:userId" component={() => <Profile />} />
          <Route
            path="/edit/profile/:userId"
            component={() => <EditProfile />}
          />
          <Route path="/Signup" component={() => <Auth toggleLink={false} />} />
          <Route path="/Login" component={() => <Auth toggleLink={true} />} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(App);
