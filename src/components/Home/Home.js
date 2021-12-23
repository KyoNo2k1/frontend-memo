import React , { useState, useEffect } from 'react'
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input';

import Posts from '../Posts/Posts'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Pagination from '../Pagination.jsx'
import useStyles from './styles'
function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function Home() {
    const classes = useStyles()
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const query = useQuery()
    const page = query.get('page') || 1

    const searchQuery = query.get('searchQuery')

    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const searchPost = () => {
        if(search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))

            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }
        else {
            navigate('/')
        }
    }
    const handleKeyPress = (e) => {
        if(e.keyCode === 13 ) {
            searchPost()
        }
    }

    const handleAdd = (tag) => setTags([...tags , tag])

    const handleDelete = (tagDelete) => setTags(tags.filter((tag) => tag !== tagDelete))



    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress= {(e) => handleKeyPress(e)}
                            />
                            <ChipInput
                                style= {{margin : '10px 0'}}
                                value={tags}
                                onAdd= {handleAdd}
                                onDelete= {handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                        </AppBar>
                        <div>Music  ComingSoon</div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={9}>
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.paginationAround1}>
                                <Pagination page={page} className={classes.pagination}/>
                            </Paper>
                        )}
                        <Posts setCurrentId={setCurrentId}/>
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.paginationAround2}>
                                <Pagination page={page} className={classes.pagination}/>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
