import postTypes from '../../types/postTypes'

const initialState = {
    posts:[],
    userPosts:[],
}
const postReducer = (state = initialState,action)=>{
    switch(action.type){
        case postTypes.GET_ALL:
            return{
                ...state,
                posts:action.payload
            }
            case postTypes.USER_POSTS:
                return{
                    ...state,
                    userPosts:action.payload
                }
        case postTypes.ADD_POST:
                return{
                     ...state,
                 posts:[action.payload,...state.posts]
                    }
        case postTypes.REMOVE_POST:
            const updatePosts = state.posts.filter((post)=> post._id !==action.payload._id);
                 return{
                  ...state,
                  posts:updatePosts,
              }
              case postTypes.LIKE_UNLIKE_POST:
            const updateLike = state.posts.filter( post => {
                if(post._id ===action.payload._id){
                    post.likes = action.payload.likes;
                    return state.posts;
            }});
                 return{
                  ...state,
                  posts:updateLike,
              }
        default :return {state}                       
    }
}
export default postReducer