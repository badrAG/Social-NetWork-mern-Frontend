import storyTypes from "../../types/storyType";

const initialState = {
  stories: [],
  story: [],
  userStories: [],
};
const storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case storyTypes.GET_ALL_STORY:
      return {
        ...state,
        stories: action.payload,
      };
    case storyTypes.GET_STORY:
      return {
        ...state,
        story: action.payload,
      };
    case storyTypes.ADD_STORY:
      return {
        ...state,
        stories: [...state.stories, action.payload],
      };
    case storyTypes.NEW_STORY:
      const newStory = state?.stories.filter((addNewStory) => {
        if (addNewStory._id === action.payload._id) {
          addNewStory = action.payload;
        }
        return state.stories;
      });
      return {
        ...state,
        stories: newStory,
      };
    case storyTypes.DELETE_IMAGE:
      const updateImageStory = state?.stories.filter((story) => {
        if (story._id === action.payload._id) {
          story.image = action.payload.image;
        return state.stories;
        }
        return state.stories;
      });
      
      return {
        ...state,
        stories: updateImageStory,
      };
    case storyTypes.REMOVE_STORY:
      const updateStories = state?.stories.filter(
        (story) => story._id !== action.payload._id
      );
      return {
        ...state,
        stories: updateStories,
      };
      case 'CLEAR_STORY':
            return {
              ...state,
              story: [],
            };
            
    default: return {...state}  
  }
};
export default storyReducer;
