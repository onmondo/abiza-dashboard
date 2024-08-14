import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga"
import createReducer from "./reducer";
import { postsSaga } from "./features/SandboxPost/saga";

const sagaMiddleware = createSagaMiddleware()
export default function configureStore(initialState = {}) {
    const store = createStore(
        createReducer(),
        applyMiddleware(sagaMiddleware),
        // initialState

    )

    sagaMiddleware.run(postsSaga)
    return store
}