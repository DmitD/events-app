import React from 'react';
import Post from "./post/Post";
import {useSelector} from "react-redux";
import {selectPosts} from "../../redux/posts/selectors";
import {CircularProgress, Grid} from "@mui/material";
import {useStyles} from "./styles";

type PostsProps = {
    setCurrentId: (id: null | number) => void
}

const Posts: React.FC<PostsProps> = ({setCurrentId}) => {
    const { classes } = useStyles()
    const posts = useSelector(selectPosts)

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;