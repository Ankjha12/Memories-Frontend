import { actionType } from "../../constants/ActionType";

export const postReducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case actionType.CREATE:
      return { ...state, posts: [...state, action.payload] };

    case actionType.FETCH_ALL:
      return {
        ...state,
        posts: action.payload.posts,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case actionType.UPDATE:
      return {
        ...state,
        posts: state.posts.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };

    case actionType.DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case actionType.LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case actionType.COMMENT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          // Change the post that receive a comment
          if (post._id === action.payload._id) {
            return action.payload;
          }

          // return all the other Posts normally
          return post;
        }),
      };

    case actionType.SEARCHPOST:
      return {
        ...state,
        posts: action.payload,
      };
    case actionType.FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };
    case actionType.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionType.END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
