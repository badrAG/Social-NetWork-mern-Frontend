import Axios from "axios";
import postTypes from "../types/postTypes";

export const getAllPosts = (token, userId,count) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    Axios.get(`http://localhost:8888/api/all/posts/${userId}?skip=${count}`, config)
      .then((res) => {
        dispatch({
          type: postTypes.GET_ALL,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getMorePosts = (token, userId,count) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    Axios.get(`http://localhost:8888/api/all/posts/${userId}?skip=${count}`, config)
      .then((res) => {
        dispatch({
          type: "GET_MORE",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const getUserPosts = (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return Axios.get(`http://localhost:8888/api/posts/by/${userId}`, config)
    .then((res) => {
      if (res.data.error) {
        return { error: res.data.error };
      } else {
        return { data: res.data };
      }
    })
    .catch((err) => console.log(err));
};
export const addPost = (token, post, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    Axios.post(`http://localhost:8888/api/post/create/${userId}`, post, config)
      .then((res) => {
        dispatch({
          type: postTypes.ADD_POST,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const Like = (userId, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch)=>{
     Axios
    .put(`http://localhost:8888/api/post/like`, { userId, postId }, config)
    .then((res) => {
      dispatch({
        type: postTypes.LIKE_UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err)); 
  } 
};

export const unLike = (userId, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch)=>{
     Axios
    .put(`http://localhost:8888/api/post/unlike`, { userId, postId }, config)
    .then((res) => {
      dispatch({
        type: postTypes.LIKE_UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err)); 
  } 
};
export const addComment = (text,userId, postId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return (dispatch)=>{
       Axios
      .put(`http://localhost:8888/api/post/comment`,{ userId, postId,text }, config)
      .then((res) => {
        dispatch({
          type: postTypes.ADD_DELETE_COMMENT,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err)); 
    } 
  };
  export const removeComment = (commentId, postId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return (dispatch)=>{
       Axios
      .put(`http://localhost:8888/api/post/unComment`, { postId,commentId }, config)
      .then((res) => {
        dispatch({
          type: postTypes.ADD_DELETE_COMMENT,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err)); 
    } 
  };
export const deletePost = ( postId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return (dispatch)=>{
       Axios
      .delete(`http://localhost:8888/api/post/${postId}`, config)
      .then((res) => {
        dispatch({
          type: postTypes.REMOVE_POST,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err)); 
    } 
  };
