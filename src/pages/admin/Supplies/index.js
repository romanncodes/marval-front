import { Button, Card, Fab, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, tableCellClasses } from "@mui/material"
import { IconButton, Modal, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import "./index.css"
import { findProductByName, getProducts, toPesosCL } from "../../../api";
import { Add, ArrowCircleLeftRounded, ArrowCircleRightRounded, Article, Edit } from '@mui/icons-material';
import { NewSupply } from "./NewSupply";
import { EditSupply } from "./EditSupply";
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
export const Supplies = ()=>{


    const [name, setName] = React.useState("");
    const [products, setProducts] = React.useState([]);
    const [totalElements, setTotalElements] = React.useState(0);
    const pageNumber = useRef("")
    const [firstPage, setFirstPage] = React.useState(true);
    const [lastPage, setLastPage] = React.useState(false);
    const [totalPages, setTotalPages] = React.useState(0);


    //NEW SUPPLY MODAL
    const [openNew, setOpenNew] = React.useState(false);
    const handleOpenNew = () => {
        setOpenNew(true);
       
    }
    const handleCloseNew = () => setOpenNew(false);


    //EDIT SUPPLY MODAL
    const [productSelected, setProductSelected] = React.useState(null);
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = (product) => {
        setOpenEdit(true);
        setProductSelected(product)

    }
    const handleCloseEdit = () => setOpenEdit(false);

    useEffect(()=>{
        const fetch =  async ()=> {
          const res =  await getProducts(1);
          console.log(res)
          if(res===undefined){
            return
          }
          
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
    const generatePDF=()=>{
        window.open('https://rodev.cl/marval-recetas-backend/public/report-supply',"_blank","noreferrer")
    }


    return<Card sx={{padding:"10px"}}>
        <div className="header-inv">
            <h1>Mantenedor Insumos</h1>
            <div style={{display:"flex", alignItems:"flex-end",flexDirection:"column", gap:"5px"}}>
                <Button startIcon={<Add/>}
                onClick={()=>handleOpenNew()}
                        variant="contained">
                            Nuevo Insumo
                </Button>
                <Tooltip title="Descargar Catálogo">
                        <Fab
                            color="secondary"
                            size='small'
                            onClick={()=>generatePDF()}
                            sx={12}
                            variant="contained">
                                <Article fontSize='small'/>
                        </Fab>
                </Tooltip>
            </div>
        </div>
        <br/>
        <div className='modal-container'>
        
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
 
                    <Grid container spacing={2}>
            <Grid item xs={12} md={12} sm={12}>
                <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Nombre</StyledTableCell>
                                    <StyledTableCell>Unidad Medida</StyledTableCell>
                                    <StyledTableCell>Cantidad</StyledTableCell>
                                    <StyledTableCell>Precio</StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                    products.map((p, key)=>
                                    (
                                        <TableRow key={p.in_name}
                                                  hover
                                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{p.in_name}</TableCell>
                                            <TableCell>
                                                {p.in_unity} 
                                            </TableCell>
                                            <TableCell>
                                                {p.in_quantity}
                                            </TableCell>
                                            <TableCell>
                                            {toPesosCL(p.in_price+"")}
                                            </TableCell>
                                            <TableCell>
                                                <Fab 
                                                    onClick={()=>handleOpenEdit(p)}
                                                    size="small" 
                                                    color="primary"  
                                                    aria-label="delete">
                                                    <Edit fontSize="small"/>
                                                </Fab>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                               
                            </TableBody>
                        </Table>
                    </TableContainer>


                   
                </Grid>
            </Grid>
            </div>
        <Modal
            open={openNew}
            onClose={handleCloseNew}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
             <NewSupply 
                 closeModal={handleCloseNew}
                 setProducts={setProducts}
                 setTotalElements={setTotalElements}
                 //setFirstPage = {setFirstPage}
                 //setLastPage = {setLastPage}
                 //setTotalPages = {setTotalElements}
                // pageNumber={pageNumber}
             />
        </Modal>
        <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <EditSupply 
                    product={productSelected} 
                    closeModal={handleCloseEdit}
                    name={name}
                    pageNumber={pageNumber.value}
                    setProducts={setProducts}
                    setTotalElements={setTotalElements}
                    setFirstPage = {setFirstPage}
                    setLastPage={setLastPage}
                    setTotalPages={setTotalPages}/>
            </Modal>

    </Card>
}