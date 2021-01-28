import postTypes from "../../types/postTypes";

const initialState = {
  posts: [],
  userPosts: [],
  userImages:[],
  userVideos:[],
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
      case postTypes.USER_IMAGES:
      return {
        ...state,
        userImages: action.payload,
      };
      case postTypes.USER_VIDEOS:
      return {
        ...state,
        userVideos: action.payload,
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
      let updateUserPosts = [];
      state.userPosts.length > 0 ?  updateUserPosts = state?.userPosts.filter(
        (post) => post._id !== action.payload._id
      ): [];
    
      return {
        ...state,
        posts: updatePosts,
        userPosts:updateUserPosts
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
      const updateUserImageLike = state.userImages?.filter((post) => {
        if (post._id === action.payload._id) {
          post.likes = action.payload.likes;
          return state.userImages;
        }
        return state.userImages;
      });
      const updateUserVideoLike = state.userVideos?.filter((post) => {
        if (post._id === action.payload._id) {
          post.likes = action.payload.likes;
          return state.userVideos;
        }
        return state.userVideos;
      });
      return {
        ...state,
        posts: updatePostLike,
        userPosts: updateUserPostLike,
        userImages: updateUserImageLike,
        userVideos: updateUserVideoLike,
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

      const updateImagePost = state.userImages?.filter((post) => {
        if (post._id === action.payload._id) {
          post.comments = action.payload.comments;
          return state.userImages;
        }
        return state.userImages;
      });
      const updateVideoPost = state.userVideos?.filter((post) => {
        if (post._id === action.payload._id) {
          post.comments = action.payload.comments;
          return state.userVideos;
        }
        return state.userVideos;
      });

      return {
        ...state,
        posts: updatePost,
        userposts: updateUserPost,
        userImages: updateImagePost,
        userVideos:updateVideoPost,
      };
      case "CLEAR_USERPOST":
        return {
          ...state,
          userPosts: [],
        };
        case "CLEAR_IMAGES":
        return {
          ...state,
          userImages: [],
        };
        case "CLEAR_VIDEOS":
        return {
          ...state,
          userVideos: [],
        };
      default: return {...state}   
  }
};
export default postReducer;
