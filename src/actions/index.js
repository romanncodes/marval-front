import { SET_FIND_PRODUCT_BAR, SET_PRODUCTS_API } from "./types";

export const setProductsApi = (payload)=>({
    type: SET_PRODUCTS_API,
    payload
})

export const setProduct = (payload)=>({
    type: SET_FIND_PRODUCT_BAR,
    payload
});
