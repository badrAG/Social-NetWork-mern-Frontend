import React from 'react'
import { useDispatch,connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createUser, login } from '../../redux/actions/userActions';

function SignUp({userError,userSuccess}) {
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [user, setUser] = React.useState({
        name:"",
        UserName:"",
        email:"",
        password:""
    });

    React.useEffect(() => {
      if(userError && userError !== null){
        setError(userError);
      }
      if(userSuccess){
        setSuccess(userSuccess);
        dispatch({type:"TOGGLE_SUCCESS"});
      }
       success && dispatch(login(user));
    }, [userError,userSuccess])

    const showError =()=>{
    return error && <div className="alert alert-danger">{error}</div>
    }

    const redirectUser=()=>{
      return success && <Redirect to="/login" />
    }
    
    const dispatch = useDispatch()
    const handleInputChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        dispatch(createUser(user));
    }
    return (
      <div className="md:flex md:justify-center">
      <form onSubmit={handleFormSubmit} className="w-5/6 md:w-4/6">
        {showError()}
        {redirectUser()}
       <div className="form-group">
            <input type="text" name="name" placeholder="Name" onChange={(e)=>handleInputChange(e)} value={user.name} className="form-control bg-gray-100  rounded-full" />
        </div>
       <div className="form-group">
    <input type="text" name="UserName" placeholder="User Name" onChange={(e)=>handleInputChange(e)} value={user.UserName.split(" ").join("")} className="form-control bg-gray-100  rounded-full" />
  </div>
  <div className="form-group">
    <input type="email" name="email" placeholder="Email" onChange={(e)=>handleInputChange(e)} value={user.email} className="form-control bg-gray-100  rounded-full" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="form-group">
    <input type="password" name="password" placeholder="Password" onChange={(e)=>handleInputChange(e)} value={user.password} className="form-control bg-gray-100  rounded-full" />
  </div>
  <button type="submit" className="btn z-10 bg-gray-50 w-full rounded-full text-green-700 font-semibold">Sign In</button>
 </form> 
  </div>
    )
}
const mapStateToProps = ({user : {userError, userSuccess}})=>({
  userError,
  userSuccess
})
export default connect(mapStateToProps,null)(SignUp)
