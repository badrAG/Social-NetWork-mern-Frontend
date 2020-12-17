import React from 'react'
import { useDispatch,connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/actions/userActions';

function LogIn({userError,userSuccess}) {
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [user, setUser] = React.useState({
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
    }, [userError,userSuccess])

    const showError =()=>{
    return error && <div className="alert alert-danger">{error}</div>
    }

    const redirectUser=()=>{
      return success && <Redirect to="/" />
    }

    const dispatch = useDispatch()
    const handleInputChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(user));
    }
    return (
      
      <form onSubmit={handleFormSubmit} className="w-5/6">
        {showError()}
        {redirectUser()}
  <div className="form-group">
    <input type="email" name="email" placeholder="Email" onChange={(e)=>handleInputChange(e)} value={user.email} className="form-control bg-white  rounded-full" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="form-group">
    <input type="password" name="password" placeholder="Password" onChange={(e)=>handleInputChange(e)} value={user.password} className="form-control bg-white  rounded-full" />
  </div>
  <button type="submit" className="btn bg-green-600 w-full rounded-full text-pink-50 font-semibold">Log In</button>
 </form> 
    )
}
const mapStateToProps = ({user : {userError, userSuccess}})=>({
  userError,
  userSuccess
})
export default connect(mapStateToProps,null)(LogIn)
