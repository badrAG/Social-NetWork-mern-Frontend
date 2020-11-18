import React ,{useEffect} from 'react'
import './App.css';
import SignUp from './pages/SignUp/SignUp'
import Menu from './pages/Home';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import LogIn from './pages/login/LogIn';
import { connect, useDispatch } from 'react-redux';
import {authCheck} from './redux/actions/userActions'
import Users from './components/user/Users';
import Profile from './pages/Profile/Profile';
import NavBar from './components/navbar/Navbar';

function App({currentUser}) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch])

   const styleToggle= true;
  return (
    <div className="app">
      <Router>
        <NavBar currentUser={currentUser}/>
        <Switch>
         <Route path="/" exact component={()=><Menu currentUser={currentUser}/>}/>
         <Route path="/connect_people" component={()=><Users currentUser={currentUser} styleToggle={styleToggle}/>}/>
         <Route path="/:userId" component={Profile}/>
         
        </Switch>
       </Router>
       <Router>
         <Switch>
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
