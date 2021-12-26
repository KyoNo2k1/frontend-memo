import React from 'react'
import {Grid, CircularProgress ,Paper} from '@material-ui/core'
import { useSelector } from 'react-redux'

import Post from './Post/Post'

import useStyles from './styles'

const Posts = ({setCurrentId}) => {
    const {posts , isLoading} = useSelector((store) => {
        return store.posts  // []  -> {isLoading, { ...,...,posts: []}
    })

    const classes = useStyles()

    if (!posts.length && !isLoading) return 'No posts!'

    return(
        isLoading ?
                <Paper elevation={0} className={classes.circularProgress}>
                    <CircularProgress className={classes.circularProgressIcon} color="secondary" />
                </Paper>
            : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map(post => (
                        <Grid key={post.id} item xs={12} sm={6} lg={6}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts