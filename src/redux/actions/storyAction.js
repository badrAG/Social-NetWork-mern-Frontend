import Axios from "axios";
import storyType from "../types/storyType";

export const getStories = (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    Axios.get(`http://localhost:8888/api/all/storeis/${userId}`, config)
      .then((res) => {
        dispatch({
          type: storyType.GET_ALL_STORY,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getStory = (token, storyId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    Axios.get(`http://localhost:8888/api/story/${storyId}`, config)
      .then((res) => {
        dispatch({
          type: storyType.GET_STORY,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const addStory = (token,data, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    Axios.post(`http://localhost:8888/api/story/create/${userId}`,data, config)
      .then((res) => {
        dispatch({
          type: storyType.ADD_STORY,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const NewStory = (token,data, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    Axios.put(`http://localhost:8888/api/new/story/${userId}`,data, config)
      .then((res) => {
        dispatch({
          type: storyType.NEW_STORY,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const removeImage = (imageId, storyId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch)=>{
     Axios
    .put(`http://localhost:8888/api/story/remove`, { storyId,imageId }, config)
    .then((res) => {
      dispatch({
        type: storyType.DELETE_IMAGE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err)); 
  } 
};

export const deleteStory = (storyId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch)=>{
     Axios
    .delete(`http://localhost:8888/api/story/delete/${storyId}`, config)
    .then((res) => {
      dispatch({
        type: storyType.REMOVE_STORY,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err)); 
  } 
};