import Axios from 'axios';
import postTypes from '../types/postTypes'

export const getAllPosts = (token,userId)=>{
    const config = {
    headers:{
        Authorization : `Bearer ${token}`,
      }
    }
    return dispatch =>{
        Axios
        .get(`http://localhost:8888/api/all/posts/${userId}`,config)
        .then(res=>{
                dispatch({
                    type : postTypes.GET_ALL,
                    payload : res.data,
                });
        })
        .catch(err => console.log(err))
    };
}

export const getUserPosts = (token,userId)=>{
    const config = {
    headers:{
        Authorization : `Bearer ${token}`,
      }
    }
      return  Axios
        .get(`http://localhost:8888/api/posts/by/${userId}`,config)
        .then(res=>{
            if(res.data.error){
                return {error : res.data.error}
             }else{
                return {data : res.data}
             }
        })
        .catch(err => console.log(err))
}
export const addPost = (token,post,userId)=>{
    const config = {
        headers:{
            Authorization : `Bearer ${token}`,
          }
        }
    return dispatch =>{
        Axios
        .post(`http://localhost:8888/api/post/create/${userId}`,post,config)
        .then(res=>{
                dispatch({
                    type : postTypes.ADD_POST,
                    payload : res.data,
                });
        })
        .catch(err => console.log(err))
    };
};