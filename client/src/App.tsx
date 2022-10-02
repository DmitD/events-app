import React from 'react';
import {Container, AppBar, Typography, Grow, Grid} from "@mui/material";
import events from './images/events.png'
import Form from "./components/form/Form";
import Posts from "./components/posts/Posts";
import {useStyles} from "./styles";
import {useAppDispatch} from "./redux/store";
import {getPosts} from "./redux/posts/asyncActions";


function App() {
    const { classes } = useStyles()
    const dispatch = useAppDispatch()
    const [currentId, setCurrentId] = React.useState<null | number>(null)

    React.useEffect(() => {
        dispatch(getPosts())
    }, [])

    return (
        <Container maxWidth='lg'>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography className={classes.heading} variant='h2' align='center'>
                    Events
                </Typography>
                <img className={classes.image} src={events} alt='events' height='60'/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justifyContent='space-between' alignItems='stretch'>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid className={classes.btMarg} item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;
