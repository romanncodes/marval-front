import { AppBar, Box, Button, Grid, Step, StepLabel, Stepper, Toolbar, Typography } from "@mui/material"
import { IconButton, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import "./index.css"
import { createRecipes, deleteRecipeDB, findIngredientsById, findProductByName, getProducts } from "../../../../api";
import { Add, ArrowCircleLeftRounded, ArrowCircleRightRounded, Close, Delete } from '@mui/icons-material';
import { successDialog } from "../../../../utils";


export const AddSupply = (props)=>{

    const [name, setName] = React.useState("");
    const [products, setProducts] = React.useState([]);
    const [ingredients, setIngredients] = React.useState([]);
    const [ingredientsDB, setIngredientsDB] = React.useState([]);
    const [totalElements, setTotalElements] = React.useState(0);
    const pageNumber = useRef("")
    const [firstPage, setFirstPage] = React.useState(true);
    const [lastPage, setLastPage] = React.useState(false);
    const [totalPages, setTotalPages] = React.useState(0);


    
    //EDIT SUPPLY MODAL
    const addIngredient = (product) => {
        if(ingredients.some(p => p.in_id == product.in_id)){
            return
        }else if(ingredientsDB.some(p => p.re_supply == product.in_id)){
            return
        }
        setIngredients(current => [...current, product])
        console.log(ingredients)
    }

    const deleteIngredient=(product)=>{
        const array = ingredients.filter(p => p.in_id != product.in_id);
        setIngredients(array)
    }

    const deleteRecipe=async(item)=>{
        const formData = new FormData();
        formData.append("id", item.re_id)
        const res = await deleteRecipeDB(formData);
        const res2 = await findIngredientsById(props.product.pr_id);
        console.log(res)
        setIngredientsDB(res2)
    }

    const save= async()=>{
        console.log(ingredients)
        const data = new FormData();
        for(let i=0; i<ingredients.length;i++){
            data.append("product", props.product.pr_id)
            data.append("supply", ingredients[i].in_id)
            data.append("quantity", ingredients[i].quantity)
            let resp = await createRecipes(data)
            successDialog("Ingredientes agregados")
        }
        const res2 = await findIngredientsById(props.product.pr_id);
        setIngredientsDB(res2)
        setIngredients([])
    }

    useEffect(()=>{
        const fetch =  async ()=> {
          const res =  await getProducts(1);
          const res2 = await findIngredientsById(props.product.pr_id);
          console.log(res)
          
          console.log(res2)
          if(res===undefined || res2===undefined){
            return
          }
          setIngredientsDB(res2)
          setProducts(res.data)
          setTotalElements(res.pagination.totalElements)
          setFirstPage(res.pagination.firstPage)
          setLastPage(res.pagination.lastPage)
          setTotalPages(res.pagination.totalPages)
          pageNumber.value=1
        }
        fetch();  
      }, [])

     


    const onChangeInput = async (e)=>{
        console.log(e.target.value)
        setName(e.target.value)
        const list = await findProductByName(e.target.value, 1);
        setProducts(list.data)
        setTotalElements(list.pagination.totalElements)
        setFirstPage(list.pagination.firstPage)
        setLastPage(list.pagination.lastPage)
        setTotalPages(list.pagination.totalPages)
        pageNumber.value=1
    }

    const nextPage =  async ()=>{
        pageNumber.value+=1;
        console.log("NEXT=>"+pageNumber.value)
        const list = await getProducts( pageNumber.value);
        //console.log(list.data)
        setProducts(list.data)
        setTotalElements(list.pagination.totalElements)
        setFirstPage(list.pagination.firstPage)
        setLastPage(list.pagination.lastPage)
        setTotalPages(list.pagination.totalPages)
    }
    const previusPage =  async ()=>{
        pageNumber.value-=1
        console.log("BACK=>"+pageNumber.value)
        const list = await getProducts(pageNumber.value);
        //console.log(list.data)
        setProducts(list.data)
        setTotalElements(list.pagination.totalElements)
        setFirstPage(list.pagination.firstPage)
        setLastPage(list.pagination.lastPage)
        setTotalPages(list.pagination.totalPages)
    }   


    return<div>
        
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.closeModal}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            <h4>Receta: {props.product.pr_name} Unidades: {props.product.pr_unity}</h4>
            </Typography>
            <Button autoFocus color="inherit" onClick={save}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
     
        <div className='modal-container' style={{padding:"8px"}}>
            <br/>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={0} alternativeLabel>
        
                    <Step key="1" active>
                        <StepLabel>Seleccionar Insumos</StepLabel>
                    </Step>
                    <Step key="2" active>
                        <StepLabel>Ingresar Cantidades y Guardar</StepLabel>
                    </Step>
                    <Step key="3" active>
                        <StepLabel>Verfificar Receta</StepLabel>
                    </Step>
                </Stepper>
            </Box>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} sm={4}>
                    <div className='find-product'>
                        <TextField  
                        focused
                        onChange={onChangeInput} 
                        size="small" 
                        id="outlined-basic" 
                        label="Nombre del Producto" 
                        variant="outlined" />
                    </div>
                     <table className="border-down">
                        <tbody>
                            <tr>
                                <td>
                                    {pageNumber.value > 1 && products.length!==0?
                                    <IconButton color="success" onClick={previusPage} aria-label="delete">
                                        <ArrowCircleLeftRounded />
                                    </IconButton>:<IconButton  disabled color="success" onClick={previusPage} aria-label="delete">
                                        <ArrowCircleLeftRounded />
                                    </IconButton>}
                                </td>
                                <td width="80%" align="center">
                                    {
                                        products.length!==0?
                                        <span className="size-10">
                                            Total de elementos: {totalElements}<br/>
                                            Página {pageNumber.value} de {totalPages}
                                        </span>:""
                                    }
                                </td>
                                <td>
                                    { products.length!==0 && !lastPage?
                                    <IconButton color="success" onClick={nextPage} aria-label="delete">
                                        <ArrowCircleRightRounded />
                                    </IconButton>:<IconButton  disabled color="success" onClick={previusPage} aria-label="delete">
                                        <ArrowCircleRightRounded />
                                    </IconButton>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
 

                    <table id="table-product" cellpadding="0" cellspacing="0" border="0">
                        <thead id="product-head">
                            <tr>
                                <th align="left" width="80%">Nombre</th>
                                 <th align="left">Medida</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="product-detail">
                            {
                            products.map((p, key)=>
                            (
                                <tr key={key} >
                                    <td>{p.in_name}</td>
                                    <td className="text-left">{p.in_unity}</td>
                                     <td width="5%">
                                        <IconButton 
                                            onClick={()=>addIngredient(p)}
                                            size="small" 
                                            color="primary"  
                                            aria-label="delete">
                                            <Add size="small"/>
                                        </IconButton>
                                    </td>           
                                </tr>
                            ))
                            }
                                    
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={12} md={4} sm={4}>
                            
                    <table id="table-ingredient" cellpadding="0" cellspacing="0" border="0">
                        <thead id="ingredient-head">
                            <tr>
                                <th align="left" width="50%">Nombre</th>
                                <th>Cantidad</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="ingredient-detail">
                        {
                            ingredients.map((p, key)=>
                            (
                                <tr>
                                    <td>{p.in_name} ({p.in_unity})</td>
                                    <td>
                                        <input type="text" onChange={(e)=>{p.quantity=e.target.value}}/>
                                    </td>
                                    <td>
                                        <IconButton 
                                            onClick={()=>deleteIngredient(p)}
                                            size="small" 
                                            color="error"  
                                            aria-label="delete">
                                            <Delete size="small"/>
                                        </IconButton>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={12} md={4} sm={4}>
                            
                            <table id="table-ingredient-db" cellpadding="0" cellspacing="0" border="0">
                                <thead id="ingredient-head-db">
                                    <tr>
                                        <th align="left" width="50%">Nombre</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="ingredient-detail-db">
                                {
                                    ingredientsDB.map((p, key)=>
                                    (
                                        <tr>
                                            <td>{p.in_name}</td>
                                            <td>
                                                {p.re_quantity}
                                            </td>
                                            <td>
                                                <IconButton 
                                                    onClick={()=>deleteRecipe(p)}
                                                    size="small" 
                                                    color="error"  
                                                    aria-label="delete">
                                                    <Delete size="small"/>
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                                        
                        </Grid>


                       
            </Grid>
            <br/>
           
                        
    </div>
       

    
    
    </div>
}