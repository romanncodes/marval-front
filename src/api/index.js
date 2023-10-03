import axios from "axios";
import AuthConsumer from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../helpers/setAuthToken";
import { errorDialog } from "../utils";

const URL_BASE="https://rodev.cl/marval-recetas-backend/public/";



export const toPesosCL = (value)=>{
    value = Math.round(value).toString();
    var num = value.replace(/\./g,'');
    if(!isNaN(num)){
      num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
      num = num.split('').reverse().join('').replace(/^[\.]/,'');
      return num;
    }else{
      //alert('Solo se permiten numeros');
    }
  }

  export const EndSession=()=>{
    const  [authen,dispatcher] = AuthConsumer();
    let navigate = useNavigate();
    dispatcher({ type: "logout"})
    navigate('/', { replace : true})
    setAuthToken(null)
  }

//===================== SUPPLIES ========================================

export const getProducts=(page)=>{
    return axios({
      url:`${URL_BASE}supply-list?page=${page}`,
      headers: { 'Content-Type': 'application/json', },
      method:"GET"
    })
    .then(res => {
      console.log("res");
      return res.data})
    .catch( err => {
      errorDialog("Sesión expirada!") 
    });
}

export const findProductByName=(name, page)=>{
    return axios(
      {
        url:`${URL_BASE}supply-list-name?name=${name}&page=${page}&size=3`,
        headers: { 'Content-Type': 'application/json', },
        method:"GET"
    })
    .then(res => {return res.data})
    .catch( err => { errorDialog("Sesión expirada!") });
}

export const saveSupply=(data)=>{
  return axios.post(`${URL_BASE}supply-save`, data)
    .then(res => {return res.data})
    .catch( err => { errorDialog("Sesión expirada!") });
}

export const editSupply=(data)=>{
  return axios.post(`${URL_BASE}supply-edit`, data)
    .then(res => {return res.data})
    .catch( err => { errorDialog("Sesión expirada!") });
}

//===================== PRODUCTS ========================================

export const createProduct=(data)=>{
  return axios.post(`${URL_BASE}product-save`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
  })
    .then(res => {return res.data})
    .catch( err => { errorDialog("Sesión expirada!") });
}

export const editProduct=(data)=>{
  return axios.post(`${URL_BASE}product-edit`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
  })
    .then(res => {return res.data})
    .catch( err => { errorDialog("Sesión expirada!") });
}

export const getProductsList=(page)=>{
  return axios({
    url:`${URL_BASE}product-list?page=${page}`,
    headers: { 'Content-Type': 'application/json', },
    method:"GET"
  })
  .then(res => {
    console.log("res");
    return res.data})
  .catch( err => {
    errorDialog("Sesión expirada!") 
  });
}

export const findProducListByName=(name, page)=>{
  return axios(
    {
      url:`${URL_BASE}product-list-name?name=${name}&page=${page}&size=6`,
      headers: { 'Content-Type': 'application/json', },
      method:"GET"
  })
  .then(res => {return res.data})
  .catch( err => { errorDialog("Sesión expirada!") });
}

//===================== RECIPES ========================================
export const createRecipes=(data)=>{
  return axios({
    url:`${URL_BASE}recipe-save`,
    data:data,
    method:"POST"
  })
    .then(res => {return res.data})
    .catch( err => { errorDialog("Sesión expirada!") });
}
export const findIngredientsById=(id)=>{
  return axios(
    {
      url:`${URL_BASE}recipe-list?id-product=${id}`,
      headers: { 'Content-Type': 'application/json', },
      method:"GET"
  })
  .then(res => {return res.data})
  .catch( err => { errorDialog("Sesión expirada!") });
}

export const deleteRecipeDB=(data)=>{
  return axios.post(`${URL_BASE}recipe-delete`, data)
    .then(res => {return res.data})
    .catch( err => { errorDialog("Sesión expirada!") });
}


//===================== LOGS ========================================

export const createLog=(data)=>{
  return axios.post(`${URL_BASE}logs/`, data)
    .then(res => {return res.data})
    .catch( err => { console.log(err);throw JSON.parse('{"error":"404"}');});
}

//===================== USERS ========================================

export const findUserByEmail=(email)=>{
  return axios.get(`${URL_BASE}users/${email}`)
    .then(res => {return res.data})
    .catch( err => { console.log(err);throw JSON.parse('{"error":"404"}');});
}

//===================== TURNS  - USERS========================================
export const updateTurn=(data)=>{
  return axios.post(`${URL_BASE}users/update`, data)
    .then(res => {return res.data})
    .catch( err => { console.log(err);throw JSON.parse('{"error":"404"}');});
}

//===================== MOVEMENTS ========================================
export const createMovement=(data)=>{
  return axios.post(`${URL_BASE}mov/create`, data)
    .then(res => {return res.data})
    .catch( err => { console.log(err);throw JSON.parse('{"error":"404"}');});
}
