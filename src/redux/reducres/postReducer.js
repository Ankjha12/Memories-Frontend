import { actionType } from "../../constants/ActionType";

export const postReducer = (posts = [], action) => {
    switch (action.type) {
        case actionType.CREATE:
            return [...posts, action.payload];

        case actionType.FETCH_ALL:
            return action.payload;

        case actionType.UPDATE:
            return posts.map((item) => item._id === action.payload._id ? action.payload : item);

        case actionType.DELETE:
            return posts.filter((post) => post._id !== action.payload);

        case actionType.LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        default:
            return posts

    }
}