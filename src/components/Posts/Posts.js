import React from "react";

import Post from "./Post/Post";
import { CircularProgress, Grid } from "@material-ui/core";

import useStyles from "./Style";
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);

  console.log("Here Is the posts from Posts.js file", posts);
  return (
    <>
      {!posts.length && !isLoading ? (
        <h1>No Memories Found Please Create One</h1>
      ) : (
        ""
      )}
      {!isLoading ? (
        <Grid
          className={classes.mainContainer}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => {
            return (
              <Grid item key={post._id} xs={12} sm={12} md={9} lg={4}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <CircularProgress />
          <h5>Loading...</h5>
        </div>
      )}
    </>
  );
};

export default Posts;
