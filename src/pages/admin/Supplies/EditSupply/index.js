import React from "react"
import { Box, Button, TextField, Typography,MenuItem, InputLabel, FormControl} from "@mui/material";
import Select from '@mui/material/Select';
import { errorDialog, successDialog } from "../../../../utils";
import { editSupply, findProductByName } from "../../../../api";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    border: '1px solid grey',
    boxShadow: 24,
    p: 4,
  };

export const EditSupply=(props)=>{

    const [nameSupply, setNameSupply] = React.useState(props.product.in_name);
    const [quantity, setQuantity] = React.useState(props.product.in_quantity);
    const [unity, setUnity] = React.useState(props.product.in_unity);
    const [price, setPrice] = React.useState(props.product.in_price);

    const save = async ()=>{
        if(nameSupply === ""){
            errorDialog("Falta Nombre")
            return;
        }
        if(unity===""){
            errorDialog(" Seleccione Unidad")
            return;
        }
        if(quantity==="" || isNaN(quantity)){
            errorDialog("Falta  Cantidad")
            return;
        }else if(quantity < 0 ){
            errorDialog("Cantidad no puede ser negativa")
            return;
        }
        if(price==="" || isNaN(price)){
            errorDialog("Verificar Precio")
            return;
        }else if(price < 0){
            errorDialog("Precio no puede ser negativo")
            return;    
        }
        const data = new FormData();
        data.append("name",nameSupply.substring(0,1).toUpperCase().concat(nameSupply.substring(1).toLowerCase()));
        data.append("unity",unity);
        data.append("quantity",quantity);
        data.append("price",price);
        data.append("id", props.product.in_id)
        const resp = editSupply(data);
        if(resp===undefined){
            return
        }
        setNameSupply("")
        setQuantity("")
        setUnity("")
        setPrice("")
        props.closeModal();

        const list = await findProductByName(props.name, props.pageNumber)
        props.setProducts(list.data)
        props.setTotalElements(list.pagination.totalElements)
        props.setFirstPage(list.pagination.firstPage)
        props.setLastPage(list.pagination.lastPage)
        props.setTotalPages(list.pagination.totalPages)

        successDialog("Insumo Actualizado!")




   }


    return <div>
        <Box sx={style}>
            <div className='modal-container'>
                <Typography id="modal-modal-title" variant="h5" component="h5">
                    <h4>Editar Insumo</h4>
                    
                    <TextField  
                        fullWidth
                        onChange={(e)=>{setNameSupply(e.target.value)}}
                        size="small" 
                        id="name" 
                        label="Nombre" 
                        defaultValue={props.product.in_name}
                        variant="outlined" />

                    <br/><br/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Unidad</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={props.product.in_unity}
                            label="Unidad"
                            size="small"
                            fullWidth
                            onChange={(e)=>{setUnity(e.target.value)}}
                            
                        >
                            <MenuItem value="CC" >CC</MenuItem>
                            <MenuItem value="GR">GR</MenuItem>
                            <MenuItem value="MIN">MIN</MenuItem>
                            <MenuItem value="UNIDAD">UNIDAD</MenuItem>
                        </Select>
                    </FormControl>
                    <br/><br/>
                    <TextField  
                        fullWidth
                        onChange={(e)=>{setQuantity(e.target.value)}}
                        size="small" 
                        id="quantity" 
                        label="Cantidad" 
                        variant="outlined" 
                        defaultValue={props.product.in_quantity}
                        />

                    <br/>
                    <br/>
                    <TextField  
                        fullWidth
                        onChange={(e)=>{setPrice(e.target.value)}}
                        size="small" 
                        id="price" 
                        label="Precio" 
                        variant="outlined" 
                        defaultValue={props.product.in_price}
                       />

                    <br/>
                    <br/>


                    <Button onClick={save} fullWidth variant="contained">Editar</Button>
                    <br/><br/>
                   
                    
                    
                    
                </Typography>

            </div>
        </Box>       
       
    </div>
}