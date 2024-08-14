import { LOADING_POSTS, LOADING_POSTS_FAILED, SUCCESS_LOADING_POSTS } from "./constants"

export const doLoadPosts = () => {
    return {
        type: LOADING_POSTS
    }
}

export const doSuccessLoadPosts = (posts) => {
    return {
        type: SUCCESS_LOADING_POSTS,
        posts
    }
}

export const doFailedLoadPosts = (message) => {
    return {
        type: LOADING_POSTS_FAILED,
        message
    }
}