import { AppBar, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, tableCellClasses } from "@mui/material"
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import "./index.css"
import { findIngredientsById} from "../../../../api";
import { Close } from '@mui/icons-material';
import styled from "@emotion/styled";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#398f33",
      color: "#fff",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

export const DetailRecipe = (props)=>{

    
    const [ingredientsDB, setIngredientsDB] = React.useState([]);
    
   
    
    useEffect(()=>{
        const fetch =  async ()=> {
          const res2 = await findIngredientsById(props.product.pr_id);
          if( res2===undefined){
            return
          }
          setIngredientsDB(res2)
        }
        fetch();  
      }, [])



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
            
          </Toolbar>
        </AppBar>
     
        <div className='modal-container' style={{padding:"8px"}}>
            
            <Grid container spacing={2}>

                <Grid item xs={12} md={12} sm={12}>
                            
                            

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Nombre</StyledTableCell>
                                    <StyledTableCell>Cantidad</StyledTableCell>
                                    <StyledTableCell>Costo</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                    ingredientsDB.map((p, key)=>
                                    (
                                        <TableRow key={p.in_name}
                                                  hover
                                                  
                                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{p.in_name}</TableCell>
                                            <TableCell>
                                                {p.re_quantity} {p.in_unity}
                                            </TableCell>
                                            <TableCell align="right">
                                                {parseInt(p.in_price/p.in_quantity*p.re_quantity)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right">
                                    {ingredientsDB.reduce((suma,item) => suma + parseInt(item.in_price/item.in_quantity*item.re_quantity), 0)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <br/>
           
                        
    </div>
       

    
    
    </div>
}