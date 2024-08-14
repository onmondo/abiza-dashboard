import { combineReducers } from "redux";
import { postProviderReducer } from "./features/SandboxPost/reducer";

export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        earnings: postProviderReducer
    })

    return rootReducer
}