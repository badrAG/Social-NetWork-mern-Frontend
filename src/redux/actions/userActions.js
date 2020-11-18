import axios from 'axios'
import userTypes from '../types/userTypes'
import {isLogged, saveUserToLocalStorage} from '../../helpers/auth'

const getAllUsers = (token)=>{
    const config = {
    headers:{
        Authorization : `Bearer ${token}`,
      }
    }
    return dispatch =>{
        axios
        .get("http://localhost:8888/api/all/users",config)
        .then(res=>{
            if(res.data.error){
                dispatch({
                    type : "USER_ERROR",
                    payload:res.data.error 
                });
            }else{
                dispatch({
                    type : userTypes.GET_USERS,
                    payload : res.data,
                });
            }
        })
        .catch(err => console.log(err))
    };
}

const createUser = (user)=>{
    return dispatch =>{
        axios
        .post("http://localhost:8888/api/users/create",user)
        .then(res=>{
            if(res.data.error){
                dispatch({
                    type : "USER_ERROR",
                    payload:res.data.error 
                });
            }else{
                dispatch({
                    type : userTypes.REGISTER,
                    payload : res.data,
                });
            }
        })
        .catch(err => console.log(err))
    };
};

const login = (user)=>{
    return dispatch =>{
        axios
        .post("http://localhost:8888/api/auth/login",user)
        .then(res=>{
            if(res.data.error){
                dispatch({
                    type : "USER_ERROR",
                    payload:res.data.error 
                });
            }else{
                saveUserToLocalStorage(res.data);
                dispatch({
                    type : userTypes.AUTH,
                    payload : res.data,
                });
            }
        })
        .catch(err => console.log(err))
    };
}

const authCheck = ()=>{
    return (dispatch) => {
        dispatch({
             type : userTypes.CHECK_AUTH,
            payload:isLogged()?{user : isLogged()}:null,
        });
    };
};
export {
    createUser,
    login,
    authCheck,
    getAllUsers
}