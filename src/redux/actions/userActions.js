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
        .get("https://api-social-network-mern.herokuapp.com/api/all/users",config)
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
        .post("https://api-social-network-mern.herokuapp.com/api/users/create",user)
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

const updateProfile = (user,token,userId)=>{
    const config = {
        headers:{
            Authorization : `Bearer ${token}`,
          }
        }
    return dispatch =>{
        axios
        .put(`https://api-social-network-mern.herokuapp.com/api/updateuser/${userId}`,user,config)
        .then(res=>{
            if(res.data.error){
                dispatch({
                    type : "USER_ERROR",
                    payload:res.data.error 
                });
            }else{
                dispatch({
                    type : userTypes.UPDATE,
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
        .post("https://api-social-network-mern.herokuapp.com/api/auth/login",user)
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
      const data= isLogged()? isLogged():null;
        dispatch({
             type : userTypes.CHECK_AUTH,
            payload:data
        });
    };
};
const getUser =(token,userId)=>{
    const config = {
        headers:{
            Authorization : `Bearer ${token}`,
          }
        }
            return  axios
         .get(`https://api-social-network-mern.herokuapp.com/api/${userId}`,config)
         .then(res=>{
            if(res.data.error){
               return {error : res.data.error}
            }else{
               return {data : res.data}
            }
        })
        .catch(err => console.log(err))
}
const Follow =(userId,followId,token)=>{
    const config = {
        headers:{
            Authorization : `Bearer ${token}`,
          }
        }
           return axios
            .put(`https://api-social-network-mern.herokuapp.com/api/user/add/follow/`,{userId,followId},config)
            .then(res=>{
                if(res.data.error){
                   return {error : res.data.error}
                }else{
                   return {data : res.data}
                }
            })
            .catch(err => console.log(err))
}

const unFollow =(userId,followId,token)=>{
    const config = {
        headers:{
            Authorization : `Bearer ${token}`,
          }
        }
           return axios
            .put(`https://api-social-network-mern.herokuapp.com/api/user/remove/unFollow`,{userId,followId},config)
            .then(res=>{
                if(res.data.error){
                   return {error : res.data.error}
                }else{
                   return {data : res.data}
                }
            })
            .catch(err => console.log(err))
}
const deleteProfil = (token,userId)=>{
    const config = {
        headers:{
            Authorization : `Bearer ${token}`,
          }
        }
    return dispatch =>{
        axios
        .delete(`https://api-social-network-mern.herokuapp.com/api/users/${userId}`,config)
        .then(res=>{
            if(res.data.error){
                dispatch({
                    type : "USER_ERROR",
                    payload:res.data.error 
                });
            }else{
                dispatch({
                    type : userTypes.DELETE,
                    payload : userId,
                });
            }
        })
        .catch(err => console.log(err))
    };
};
export {
    createUser,
    login,
    authCheck,
    getAllUsers,
    getUser,
    Follow,
    unFollow,
    updateProfile,
    deleteProfil
}