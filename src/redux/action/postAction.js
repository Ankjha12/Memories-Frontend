import * as api from "../../api/index";
import { actionType } from "../../constants/ActionType";

// now we are creating the action creators

export const commentPost = (finalComment, id) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(finalComment, id);

    console.log("CommentCrated Data", data);

    dispatch({
      type: actionType.COMMENT_POST,
      payload: data,
    });
    return data.comments;
  } catch (error) {
    console.log("error in dispatching the action CommentPost");
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.START_LOADING });
    const { data } = await api.fetchPost(id);

    console.log("new data", data);

    dispatch({
      type: actionType.FETCH_POST,
      payload: data,
    });

    dispatch({ type: actionType.END_LOADING });
  } catch (error) {
    console.log("error in dispatching the action");
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: actionType.START_LOADING });
    const response = await api.fetchPosts(page);
    dispatch({
      type: actionType.FETCH_ALL,
      payload: response.data,
    });
    dispatch({ type: actionType.END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostBySearch = (searchTerm) => async (dispatch) => {
  console.log("Here is the search term from PostAction file", searchTerm);
  try {
    dispatch({ type: actionType.START_LOADING });
    const { data } = await api.fetchPostBySearch(searchTerm);

    dispatch({
      type: actionType.SEARCHPOST,
      payload: data.data,
    });

    dispatch({ type: actionType.END_LOADING });

    console.log("Here the searched data", data.data);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    console.log("here is the post from postAction", post);
    dispatch({ type: actionType.START_LOADING });
    const { data } = await api.createPost(post);

    navigate(`/posts/${data?._id}`);

    dispatch({
      type: actionType.CREATE,
      payload: data,
    });

    dispatch({ type: actionType.END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const res = await api.updatePost(id, post);

    dispatch({
      type: actionType.UPDATE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({
      type: actionType.DELETE,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const res = await api.likePost(id);

    dispatch({
      type: actionType.LIKE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
