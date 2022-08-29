import React from "react";
import {
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  Container,
} from "@material-ui/core";

import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import Paginate from "../pagination/Pagination";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getPost, getPostBySearch } from "../../redux/action/postAction";
import useStyle from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [tagSearch, setTagSearch] = React.useState([]);
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("search");

  console.log("Here is the Currentid from the app.js file", currentId);

  // commenting beacuse we are implementing pagination so we have to fecth post according to the page
  //   React.useEffect(() => {
  //     dispatch(getPost());
  //   }, [currentId, dispatch]);

  const handleAdd = (tag) => setTagSearch([...tagSearch, tag]);

  const handleDelete = (tagToDelete) =>
    setTagSearch(tagSearch.filter((tag) => tag !== tagToDelete));

  const handleKeyPress = (e) => {
    //Search logic goes here
    if (e.keyCode === 13) {
      //logic for search
    }
  };

  const handleSearchPost = () => {
    //if search term are there then we have to dispatch an action
    if (searchTerm.trim() || tagSearch) {
      //dispatch logic
      dispatch(getPostBySearch({ searchTerm, tagSearch: tagSearch.join(",") })); // this convert tags Array into an String so that we can pass that string to the backend very easily

      navigate(
        `/posts/search?searchTerm=${searchTerm || "none"}&tags=${tagSearch.join(
          ","
        )}`
      );
    } else {
      navigate("/");
    }
  };
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="strech"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={searchTerm}
                onKeyPress={handleKeyPress}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <ChipInput
                style={{ margin: "10px 0px" }}
                value={tagSearch}
                label="Search Tags"
                onAdd={handleAdd}
                onDelete={handleDelete}
                variant="outlined"
              />
              <Button
                onClick={handleSearchPost}
                color="primary"
                className={classes.searchButton}
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6} className={classes.pagination}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
