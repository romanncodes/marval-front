
import React from "react"
import { Box, Button, TextField, Typography} from "@mui/material";
import { createProduct, editProduct, getProductsList } from "../../../../api";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "@emotion/styled";
import { errorDialog, successDialog } from "../../../../utils";
import {  green} from '@mui/material/colors';

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
  const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const ColorButton = styled(Button)(({ theme }) => ({
    //color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  }));

export const EditProduct=(props)=>{
    const [file, setFile] = React.useState(null);    
    const [name, setName] = React.useState(props.product.pr_name);
    const [unity, setUnity] = React.useState(props.product.pr_unity);
    const [price, setPrice] = React.useState(props.product.pr_price);    
    const [nameFile, setNameFile] = React.useState("");    

    const save = async()=>{
        if(unity==="" || isNaN(unity)){
            errorDialog("Verificar Unidad")
            return;
        }
        if(price==="" || isNaN(price)){
            errorDialog("Verificar Precio")
            return;
        }
        
        const formData = new FormData();
        formData.append("id", props.product.pr_id);
        formData.append("img", file);
        formData.append("unity", unity);
        formData.append("price", price);
        formData.append("name", name.substring(0,1).toUpperCase().concat(name.substring(1).toLowerCase()));

        const resp = await editProduct(formData)
        console.log(resp)
        props.closeModal();
        successDialog("Producto Actualizado!")
        const res =  await getProductsList(1);
        props.setProducts(res.data)
        props.setTotalElements(res.pagination.totalElements)
        props.setTotalPages(res.pagination.totalPages)
    }

    const onchangeFile=(e)=>{
        setFile(e.target.files[0]);
        setNameFile(e.target.files[0].name)

        
    }

    return <div>
        <Box sx={style}>
            <div className='modal-container'>
                <Typography id="modal-modal-title" variant="h5" component="h5">
                    <h4>Editar Producto</h4>
                    
                    <TextField  
                        focused
                        onChange={(e)=>{setName(e.target.value)} }
                        size="small" 
                        fullWidth
                        id="outlined-basic" 
                        label="Nombre del Producto" 
                        variant="outlined"
                        defaultValue={props.product.pr_name}
                        />
                        <br/><br/>
                    <TextField  
                        focused
                        onChange={(e)=>{setUnity(e.target.value)} }
                        size="small" 
                        fullWidth
                        id="outlined-basic2" 
                        label="Unidades" 
                        variant="outlined"
                        defaultValue={props.product.pr_unity}
                        />
                        <br/><br/>
                    <TextField  
                        focused
                        onChange={(e)=>{setPrice(e.target.value)} }
                        size="small" 
                        fullWidth
                        id="outlined-basic3" 
                        label="Precio Estimado" 
                        variant="outlined"
                        defaultValue={props.product.pr_price}
                        />
                        <br/><br/>
                    <ColorButton
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        href="#file-upload"
                        
                        >
                        Subir Imagen
                        <VisuallyHiddenInput type="file" onChange={onchangeFile}/>
                    </ColorButton>
                   &nbsp; <span style={{"font-size":"14px"}}>{nameFile}</span>
                    <br/><br/>
                    <Button fullWidth variant="contained" onClick={save}>Editar</Button>
                                
                    
                    
                </Typography>

            </div>
        </Box>       
       
    </div>
}