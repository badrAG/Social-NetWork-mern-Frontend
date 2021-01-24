import postTypes from "../../types/postTypes";

const initialState = {
  posts: [],
  userPosts: [],
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case postTypes.GET_ALL:
      return {
        ...state,
        posts: action.payload,
      };
    case "GET_MORE":
      const moreData = state.posts.concat(action.payload);
      return {
        ...state,
        posts: moreData,
      };
    case postTypes.USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
      };
    case postTypes.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case postTypes.REMOVE_POST:
      const updatePosts = state?.posts.filter(
        (post) => post._id !== action.payload._id
      );
      return {
        ...state,
        posts: updatePosts,
      };
    case postTypes.LIKE_UNLIKE_POST:
      const updatePostLike = state.posts?.filter((post) => {
        if (post._id === action.payload._id) {
          post.likes = action.payload.likes;
          return state.posts;
        }
        return state.posts;
      });
      const updateUserPostLike = state.userPosts?.filter((post) => {
        if (post._id === action.payload._id) {
          post.likes = action.payload.likes;
          return state.userPosts;
        }
        return state.userPosts;
      });
      return {
        ...state,
        posts: updatePostLike,
        userPosts: updateUserPostLike,
      };

    case postTypes.ADD_DELETE_COMMENT:
      const updatePost = state.posts?.filter((post) => {
        if (post._id === action.payload._id) {
          post.comments = action.payload.comments;
          return state.posts;
        }
        return state.posts;
      });

      const updateUserPost = state.userPosts?.filter((post) => {
        if (post._id === action.payload._id) {
          post.comments = action.payload.comments;
          return state.userPosts;
        }
        return state.userPosts;
      });
      return {
        ...state,
        posts: updatePost,
        userposts: updateUserPost,
      };
      case "CLEAR_USERPOST":
        return {
          ...state,
          userPosts: [],
        };
      default: return {...state}   
  }
};
export default postReducer;
