import * as actionType from '../constants/actionType'

export default (state = { isLoading: true, posts: []}, action) => {
    switch (action.type) {
        case actionType.START_LOADING:
            return { ...state, isLoading: true }
        case actionType.END_LOADING:
            return { ...state, isLoading: false }
        case actionType.FETCH_POST:
            return { ...state, post: action.payload}
        case actionType.FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case actionType.LIKE:
            return { ...state,posts: state.posts.map(post => (post._id === action.payload._id ? action.payload : post))};
        case actionType.CREATE:
            return { ...state,posts: [...state.posts, action.payload]}
        case actionType.UPDATE:
            return { ...state,posts: state.posts.map(post => (post._id === action.payload._id ? action.payload : post))};
        case actionType.DELETE:
            return { ...state,posts: state.posts.filter((post) => post._id !== action.payload)}
        case actionType.FETCH_BY_SEARCH:
            return { ...state, posts: action.payload}
        default:
            return state
    }
}