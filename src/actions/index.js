import _ from 'lodash'
import jsonPlaceholder from '../apis/jsonPlaceholder'

//Invoking an action creator from an action creator
//fetchPostsAndUsers(): Doesn't include any network request, instead it keeps network requests in existing action creators(fetchPosts, fetchUsers) & invokes those action creators 
export const fetchPostsAndUsers = () => async (dispatch, getState)=> {
    await dispatch(fetchPosts());

    //Chaining multiple functions using lodash:
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value()   //required method: otherwise chained funcs will not execute
}

//Request to List of Posts
export const fetchPosts = () => async (dispatch) => {
    const response = await jsonPlaceholder.get('/posts')
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        })
};

//Request to Fetch Single User at a time
export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`)
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    })
}