import * as api from "../../api/index";
import { actionType } from "../../constants/ActionType";

// now we are creating the action creators 

export const getPost = () => async (dispatch) => {
    try {
        const response = await api.fetchPost();
        dispatch({
            type: actionType.FETCH_ALL,
            payload: response.data
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        console.log("here is the post from postAction", post)
        const { data } = await api.createPost(post)

        dispatch({
            type: actionType.CREATE,
            payload: data
        })
    } catch (error) {
        console.log(error.message)

    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const res = await api.updatePost(id, post);

        dispatch({
            type: actionType.UPDATE,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({
            type: actionType.DELETE,
            payload: id,
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const res = await api.likePost(id);

        dispatch({
            type: actionType.LIKE,
            payload: res.data,
        })
    } catch (error) {
        console.log(error)
    }
}