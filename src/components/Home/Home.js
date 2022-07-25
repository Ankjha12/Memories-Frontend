import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

import Form from "../Form/Form";
import Posts from "../Posts/Posts"
import { useDispatch } from "react-redux";


import { getPost } from "../../redux/action/postAction";

const Home = () => {

    const dispatch = useDispatch();
    const [currentId, setCurrentId] = React.useState(null);

    console.log("Here is the Currentid from the app.js file", currentId)

    React.useEffect(() => {
        dispatch(getPost());
    }, [currentId, dispatch])
    return (
        <Grow in>
            <Grid container justify="space-between" alignItems="strech" spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>

            </Grid>

        </Grow>
    )
}

export default Home