import React from "react";

import Post from "./Post/Post";
import { CircularProgress, Grid } from "@material-ui/core";

import useStyles from "./Style";
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  console.log("Here Is the posts from Posts.js file", posts);
  return (
    <>
      {!posts ? <h1>No Memories Found Please Create One</h1> : ""}
      {posts.length > 0 ? (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => {
            return (
              <Grid item key={post._id} xs={12} sm={6}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Posts;
