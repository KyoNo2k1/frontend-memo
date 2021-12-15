import  * as actionType from '../constants/actionType'
import * as api from '../api'


//Actions creators

export const getPost = (id) => async (dispatch) => {
    try {
        const actionLoading = { type: actionType.START_LOADING }
        dispatch(actionLoading)

        const { data } = await api.fetchPost(id)
        const action = {
            type: actionType.FETCH_POST,
            payload: data
        }
        dispatch(action)

        const actionEndLoading = {type: actionType.END_LOADING}
        dispatch(actionEndLoading)
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        const actionLoading = { type: actionType.START_LOADING }
        dispatch(actionLoading)

        const { data } = await api.fetchPosts(page)
        const action = {
            type: actionType.FETCH_ALL,
            payload: data
        }
        dispatch(action)

        const actionEndLoading = {type: actionType.END_LOADING}
        dispatch(actionEndLoading)
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const actionLoading = { type: actionType.START_LOADING }
        dispatch(actionLoading)

        const { data: {data} } = await api.fetchPostsBySearch(searchQuery)
        const action = {
            type: actionType.FETCH_BY_SEARCH,
            payload: data
        }
        dispatch(action)

        const actionEndLoading = {type: actionType.END_LOADING}
        dispatch(actionEndLoading)
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {

    try {
        const actionLoading = { type: actionType.START_LOADING }
        dispatch(actionLoading)

        const { data } = await api.createPost(post)
        const action = {
            type: actionType.CREATE,
            payload: data
        }
        dispatch(action)
        navigate(`/posts/${data._id}`)

        const actionEndLoading = {type: actionType.END_LOADING}
        dispatch(actionEndLoading)
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post)
        const action = {
            type: actionType.UPDATE,
            payload: data
        }
        dispatch(action)
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        const action = {
            type: actionType.DELETE,
            payload: id
        }
        dispatch(action)
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id)
        const action = {
            type: actionType.UPDATE,
            payload: data
        }
        dispatch(action)
    } catch (error) {
        console.log(error);
    }
}