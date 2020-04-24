import React from 'react';
import { Card, CardContent, Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        minHeight: '150px'
    },
    itemTitle: {
        borderBottom: '2px inset'
    }
}))

const Joke = ({ joke }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card className={classes.root}>
                <CardContent style={{position: 'relative'}}>
                    <Grid container item xs={12} justify='center' alignItems='center'>
                        <Typography variant="body2">
                            {joke}
                        </Typography>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Joke;