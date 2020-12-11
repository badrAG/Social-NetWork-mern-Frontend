import userTypes from '../../types/userTypes'

const initialState = {
    currentUser:null,
    users:[],
    userError:null,
    userSuccess:false
}
const userReducer = (state = initialState,action)=>{
    switch(action.type){
        case userTypes.GET_USERS:
            return{
                ...state,
                users:action.payload
            }
            case userTypes.GET_USER:
            return{
                ...state,
                currentUser:action.payload
            }
        case userTypes.AUTH:
                return{
                    ...state,
                    currentUser:action.payload,
                    userError:null,
                    userSuccess:!state.userSuccess
                }
        case userTypes.CHECK_AUTH:
                return{
                     ...state,
                 currentUser:action.payload
                    }
         case userTypes.SIGNOUT:
                return{
                    ...state,
                    currentUser:action.payload
                        }
        case userTypes.REGISTER:
                return{
                    ...state,
                    userError:null,
                    userSuccess:!state.userSuccess,
                        }
        case userTypes.UPDATE:
            const jwt = JSON.parse(localStorage.getItem("jwt"));
            const newJwt = {...jwt,user:action.payload};
            localStorage.setItem("jwt",JSON.stringify(newJwt));
                return{
                    ...state,
                    currentUser:{...state.currentUser,user:action.payload},
                    userSuccess:!state.userSuccess,
                    }
        case userTypes.DELETE:
            const updateUsers = state.users.filter((user)=> user._id !==action.payload.userId);
                 return{
                  ...state,
                  users:updateUsers,
                  currentUser:null,
              }
        case userTypes.FOLLOW:
                  return{
                      state,
                  }    
        case userTypes.UNFOLLOW:
                    return{
                        state,
                      } 
        case 'USER_ERROR':
            return {
                ...state,
                userError:action.payload
            } 
            case 'TOGGLE_SUCCESS':
                return {
                    ...state,
                    userSuccess:!state.userSuccess
                } 
        default :return {...state}                       
    }
}
export default userReducer