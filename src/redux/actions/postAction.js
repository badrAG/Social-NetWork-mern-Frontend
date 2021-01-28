import Axios from "axios";
import postTypes from "../types/postTypes";

export const getAllPosts = (token, userId,count) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    Axios.get(`https://api-social-network-mern.herokuapp.com/api/all/posts/${userId}?skip=${count}`, config)
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
    Axios.get(`https://api-social-network-mern.herokuapp.com/api/all/posts/${userId}?skip=${count}`, config)
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
  return dispatch =>{
    Axios.get(`https://api-social-network-mern.herokuapp.com/api/posts/by/${userId}`, config)
      .then((res) => {
        dispatch({
          type: postTypes.USER_POSTS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getImagePosts = (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return dispatch =>{
    Axios.get(`https://api-social-network-mern.herokuapp.com/api/image/posts/${userId}`, config)
      .then((res) => {
        dispatch({
          type: postTypes.USER_IMAGES,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getVideoPosts = (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return dispatch =>{
    Axios.get(`https://api-social-network-mern.herokuapp.com/api/videos/posts/${userId}`, config)
      .then((res) => {
        dispatch({
          type: postTypes.USER_VIDEOS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (token, post, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    Axios.post(`https://api-social-network-mern.herokuapp.com/api/post/create/${userId}`, post, config)
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
    .put(`https://api-social-network-mern.herokuapp.com/api/post/like`, { userId, postId }, config)
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
    .put(`https://api-social-network-mern.herokuapp.com/api/post/unlike`, { userId, postId }, config)
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
      .put(`https://api-social-network-mern.herokuapp.com/api/post/comment`,{ userId, postId,text }, config)
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
      .put(`https://api-social-network-mern.herokuapp.com/api/post/unComment`, { postId,commentId }, config)
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
      .delete(`https://api-social-network-mern.herokuapp.com/api/post/${postId}`, config)
      .then((res) => {
        dispatch({
          type: postTypes.REMOVE_POST,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err)); 
    } 
  };
