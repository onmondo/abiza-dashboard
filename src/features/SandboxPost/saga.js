import { call, put, takeEvery } from "redux-saga/effects";
import { getPosts } from "../../integrations/Sandbox";
import { LOADING_POSTS } from "./constants";
import { doFailedLoadPosts, doSuccessLoadPosts } from "./actions";

function* fetchPosts() {
    try {
        const posts = yield call(getPosts)
        yield put(doSuccessLoadPosts(posts))
    } catch(err) {
        yield put(doFailedLoadPosts(err.message))
    }
}

export function* postsSaga() {
    yield takeEvery(LOADING_POSTS, fetchPosts)
}