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
    const handleFormSubmit = async (e)=>{
        e.preventDefault();
       await dispatch(createUser(user));
       await dispatch(login(user));
    }
    return (
      <div className="md:flex md:justify-center">
      <form onSubmit={handleFormSubmit} className="w-5/6 md:w-4/6">
        {showError()}
        {redirectUser()}
       <div className="w-full">
            <input type="text" name="name" placeholder="Name" required onChange={(e)=>handleInputChange(e)} value={user.name} className="w-full py-1 px-2 outline-none mb-3 bg-gray- dark:bg-gray-500 dark:text-gray-50  rounded-full" />
        </div>
       <div className="w-full">
    <input type="text" name="UserName" placeholder="User Name" required onChange={(e)=>handleInputChange(e)} value={user.UserName.split(" ").join("")} className="w-full py-1 px-2 outline-none mb-3 bg-gray- dark:bg-gray-500 dark:text-gray-50  rounded-full" />
  </div>
  <div className="w-full">
    <input type="email" name="email" placeholder="Email" onChange={(e)=>handleInputChange(e)} value={user.email} className="w-full py-1 px-2 outline-none mb-3 bg-gray- dark:bg-gray-500 dark:text-gray-50  rounded-full" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="w-full">
    <input type="password" name="password" placeholder="Password" required onChange={(e)=>handleInputChange(e)} value={user.password} className="w-full py-1 px-2 outline-none mb-3 bg-gray- dark:bg-gray-500 dark:text-gray-50  rounded-full" />
  </div>
  <button type="submit" className="btn z-10 bg-gray-50 py-2 w-full rounded-full text-green-700 font-semibold">Sign In</button>
 </form> 
  </div>
    )
}
const mapStateToProps = ({user : {userError, userSuccess}})=>({
  userError,
  userSuccess
})
export default connect(mapStateToProps,null)(SignUp)
