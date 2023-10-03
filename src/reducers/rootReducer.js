import { combineReducers } from "redux-immutable";
import { productReducer } from "./products";
import { productFindCodeBarReducer } from "./productFindCodeBar";

const rootReducer = combineReducers({
    productReducer,
    productFindCodeBarReducer
})

export default rootReducer;