import { SET_PRODUCTS_API } from "../actions/types"

const initialState={
    productsApi:[]
}

export const productReducer = (state=initialState, action)=>{
    switch(action.type){
        case SET_PRODUCTS_API:
            return {...state, productsApi:action.payload};
        default:
            return state;
    }
}