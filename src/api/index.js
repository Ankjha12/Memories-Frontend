import axios from "axios";

// THis Is the localhost URL
// const baseURL = "http://localhost:5000";

//This is the baseurl from Heroku
// const baseURL = "https://memoriesapplications.herokuapp.com/";

//This Again heroku instance
const baseURL = "https://memoriesappversion1.herokuapp.com/";

const Axios = axios.create({
  baseURL,
});

Axios.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPost = (id) => Axios.get(`/posts/${id}`);
export const fetchPosts = (page) => Axios.get(`/posts?page=${page}`);
export const fetchPostBySearch = (searchTerm) =>
  // console.log("here is SearchTerm", searchTerm);
  Axios.get(
    `/posts/search?searchTerm=${searchTerm.searchTerm || "none"}&tags=${
      searchTerm.tagSearch
    }`
  );
export const createPost = (newPost) => Axios.post(`/posts/create`, newPost);
export const updatePost = (id, updatedPost) =>
  Axios.patch(`posts/${id}`, updatedPost);
export const deletePost = (id) => Axios.delete(`/posts/${id}`);
export const likePost = (id) => Axios.patch(`/posts/${id}/likePost`);
export const commentPost = (finalComment, id) =>
  Axios.post(`posts/${id}/commentPost`, { finalComment });

export const signIn = (formData) => Axios.post("/users/signin", formData);
export const signUp = (formData) => Axios.post("/users/signup", formData);
