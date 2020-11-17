import React ,{useEffect} from 'react'
import './App.css';

import NavBar from './components/navbar/Navbar'
import SignUp from './pages/SignUp/SignUp'
import Menu from './pages/Home';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import LogIn from './pages/login/LogIn';
import { connect, useDispatch } from 'react-redux';
import {authCheck} from './redux/actions/userActions'
function App({currentUser}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch])
  return (
    <div className="app">
      <Router>
        { currentUser &&
         <NavBar currentUser={currentUser}/>
        }
        <Switch>
         <Route path="/" exact component={Menu}/>
         <Route path="/signup" component={SignUp}/>
         <Route path="/login" component={LogIn}/>
        </Switch>
       </Router>
    </div>
  );
};

const mapStateToProps = ({user : {currentUser}})=>({
currentUser
});

export default connect(mapStateToProps)(App);
