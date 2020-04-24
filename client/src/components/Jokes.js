import React, { useEffect, useState } from 'react';
import { getJokes } from '../crud/jokes';
// material-ui
import { Grid, Container, makeStyles } from '@material-ui/core';
// components
import Joke from './Joke';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '180px'
    }
  }));


const Jokes = () => {
    const classes = useStyles();
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await getJokes();
            console.log(res.data);
            setJokes(res.data);
        })();
    }, []);
    
    return (
        <Container className={classes.root}>
            <Grid justify='flex-start' container>
                { jokes.map(joke => (
                    <Joke id={joke.id} />
                )) }
            </Grid>
        </Container>
    )
}

export default Jokes;
