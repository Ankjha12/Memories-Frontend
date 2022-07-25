import axios from "axios";

// THis Is the localhost URL
// const baseURL = "http://localhost:5000/posts";
//This is the baseurl from Heroku
const baseURL = "https://memoriesapplications.herokuapp.com/";

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

//Below Is the heroku deployed url;
// const url = "https://memoriesapplications.herokuapp.com/posts";

export const fetchPost = () => Axios.get("/posts");
export const createPost = (newPost) => Axios.post(`/posts/create`, newPost);
export const updatePost = (id, updatedPost) =>
  Axios.patch(`posts/${id}`, updatedPost);
export const deletePost = (id) => Axios.delete(`/posts/${id}`);
export const likePost = (id) => Axios.patch(`posts/${id}/likePost`);

export const signIn = (formData) => Axios.post("/users/signin", formData);
export const signUp = (formData) => Axios.post("/users/signup", formData);
