import { SET_FIND_PRODUCT_BAR } from "../actions/types"

const initialState={
    product:{}
}

export const productFindCodeBarReducer = (state=initialState, action)=>{
    switch(action.type){
        case SET_FIND_PRODUCT_BAR:
            return {...state, product:action.payload};
        default:
            return state;
    }
}