import { LOADING_POSTS, SUCCESS_LOADING_POSTS } from "./constants";

const initialState = {
    posts: []
}

export const postProviderReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOADING_POSTS: {
            return {
                ...state, posts: []
            }
        }
        case SUCCESS_LOADING_POSTS: {
            return { ...state, posts: action.posts}
        }
        default: {
            return state
        }
    }
}
