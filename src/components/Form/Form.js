import React from "react";

import useStyles from "./Style";

import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../redux/action/postAction";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const post = useSelector((state) =>
    currentId ? state?.posts.find((post) => post._id === currentId) : null
  );
  const dispatch = useDispatch();
  const [postData, setPostData] = React.useState({
    // creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const user = JSON.parse(localStorage.getItem("profile"));

  console.log("Currently Logged in user is ==>>>>", user);

  React.useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  console.log("here is currentId from the from.js File", currentId);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Here is the PostData from HandleSubmit function", postData);
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    handleClear();
    // setPostData({
    //     creator: "",
    //     title: "",
    //     message: "",
    //     tags: "",
    //     selectedFile: "",
    // })
  };
  console.log("Here is the Post data", postData);

  const handleClear = () => {
    setCurrentId(null);
    setPostData({
      // creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign in to Create Your Own memory OR Like others Memories
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        variant="outlined"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {" "}
          {currentId ? "Update" : "Create"} a Memory
        </Typography>
        {/* <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) =>
                        setPostData({ ...postData, creator: e.target.value })
                    }
                /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple="false"
            value={postData.selectedFile}
            onDone={([{ base64 }]) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          type="submit"
          variant="contained"
          size="lg"
          fullWidth
          color="primary"
        >
          Submit Post
        </Button>

        <Button
          variant="contained"
          style={{ marginTop: "10px" }}
          size="small"
          fullWidth
          color="secondary"
          onClick={handleClear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
