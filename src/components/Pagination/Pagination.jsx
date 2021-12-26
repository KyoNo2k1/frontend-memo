import React , { useEffect } from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from '../styles.js'
import { getPosts } from '../../actions/posts'

function Paginate({page}) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { numberOfPages } = useSelector((store) => store.posts)
    useEffect(() => {
        if (page) dispatch(getPosts(page))
    },[page])

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem= { (item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${item.page}`}
                />
            )}
        />
    )
}

export default Paginate
