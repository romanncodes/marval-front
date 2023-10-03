import * as React from 'react';
import Button from '@mui/material/Button';
import { Card, Dialog, Fab, Grid, IconButton, Modal, Slide, TextField, Tooltip } from '@mui/material';
import { Add, ArrowCircleLeftRounded, ArrowCircleRightRounded, ArtTrack, Article } from '@mui/icons-material';
import { NewProduct } from './NewProduct';
import { findProducListByName, getProductsList } from '../../../api';
import CardProduct from '../../../components/CardProduct';
import { AddSupply } from '../Recipes/AddSupply';
import { DetailRecipe } from '../Recipes/DetailRecipe';
import "./index.css"
import { EditProduct } from './EditProduct';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const Products = ()=>{
    const [name, setName] = React.useState("");
    const [products, setProducts] = React.useState([]);
    const [totalElements, setTotalElements] = React.useState(0);
    const pageNumber = React.useRef("")
    const [firstPage, setFirstPage] = React.useState(true);
    const [lastPage, setLastPage] = React.useState(false);
    const [totalPages, setTotalPages] = React.useState(0);
    const [productSelected, setProductSelected]=React.useState(null);

    //NEW PRODUCT MODAL
    const [openNew, setOpenNew] = React.useState(false);
    const handleOpenNew = () => {
        setOpenNew(true);
    }
    const handleCloseNew = () => setOpenNew(false);

    //EDIT PRODUCT MODAL
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = (product) => {
        setProductSelected(product)
        setOpenEdit(true);
    }
    const handleCloseEdit = () => setOpenEdit(false);

   //ADD RECIPES MODAL
   const [openAdd, setOpenAdd] = React.useState(false);

   const handleOpenAdd = (product) => {
       setProductSelected(product)
        setOpenAdd(true);
       //let navigate = useNavigate()
       //navigate('/admin/details-product/1', { replace : true})
   }
   const handleCloseAdd = () => setOpenAdd(false);

    //DETAIL RECIPE DETAIL MODAL
    const [openDetail, setOpenDetail] = React.useState(false);
   
   const handleOpenDetail = (product) => {
       setProductSelected(product)
        setOpenDetail(true);
       //let navigate = useNavigate()
       //navigate('/admin/details-product/1', { replace : true})
   }
   const handleCloseDetail = () => setOpenDetail(false);




    React.useEffect(()=>{
        const fetch =  async ()=> {
          const res =  await getProductsList(1);
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

      const nextPage =  async ()=>{
        pageNumber.value+=1;
        console.log("NEXT=>"+pageNumber.value)
        const list = await getProductsList( pageNumber.value);
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
        const list = await getProductsList(pageNumber.value);
        //console.log(list.data)
        setProducts(list.data)
        setTotalElements(list.pagination.totalElements)
        setFirstPage(list.pagination.firstPage)
        setLastPage(list.pagination.lastPage)
        setTotalPages(list.pagination.totalPages)
    }   
    const onChangeInput = async (e)=>{
        console.log(e.target.value)
        setName(e.target.value)
        const list = await findProducListByName(e.target.value, 1);
        setProducts(list.data)
        setTotalElements(list.pagination.totalElements)
        setFirstPage(list.pagination.firstPage)
        setLastPage(list.pagination.lastPage)
        setTotalPages(list.pagination.totalPages)
        pageNumber.value=1
    }

    const generatePDF=()=>{
        window.open('https://rodev.cl/marval-recetas-backend/public/report',"_blank","noreferrer")
    }
    const generatePDFDetail=()=>{
        window.open('https://rodev.cl/marval-recetas-backend/public/report-detail',"_blank","noreferrer")
    }

    return<Card sx={{padding:"10px"}}>
        <div className="header-inv">
            <h1>Mis Productos</h1>
            <div style={{display:"flex", alignItems:"flex-end",flexDirection:"column", gap:"5px"}}>
            <Button startIcon={<Add/>}
                    onClick={()=>handleOpenNew()}
                    sx={12}
                    variant="contained">
                        Nuevo Producto
            </Button>
            <div>
                <Tooltip title="Descargar Catálogo">
                    <Fab 
                        color="secondary"
                        size='small'
                        onClick={()=>generatePDF()}
                        sx={12}
                        variant="contained">
                            <ArtTrack fontSize='small'/>
                    </Fab>
                </Tooltip>
                &nbsp;&nbsp;
                <Tooltip title="Descargar Recetario">
                    <Fab 
                        color="secondary"
                        size='small'
                        onClick={()=>generatePDFDetail()}
                        sx={12}
                        variant="contained">
                            <Article fontSize='small'/>
                    </Fab>
                </Tooltip>
            </div>
            
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
 
                    <br/>
                    
                    <Grid container spacing={2}>
                            {
                                products.map((p, key)=>
                                (
                                    <Grid item xs={12} sm={6} md={4}>
                                        <CardProduct 
                                            key={key}
                                            item={p}
                                            handleOpenAdd={handleOpenAdd}
                                            handleOpenDetail={handleOpenDetail}
                                            handleOpenEdit={handleOpenEdit}

                                            
                                        />
                                    </Grid>
                                ))
                            }
                  </Grid>
                
            </div>

        
        <Modal
            open={openNew}
            onClose={handleCloseNew}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <NewProduct 
                 closeModal={handleCloseNew}
                 setProducts={setProducts}
                 setTotalElements={setTotalElements}
                 //setFirstPage = {setFirstPage}
                 //setLastPage = {setLastPage}
                 setTotalPages = {setTotalElements}
                // pageNumber={pageNumber}
             />
        </Modal>

        <Modal
            open={openEdit}
            onClose={handleCloseEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <EditProduct
                 closeModal={handleCloseEdit}
                 setProducts={setProducts}
                 product={productSelected}
                 setTotalElements={setTotalElements}
                 //setFirstPage = {setFirstPage}
                 //setLastPage = {setLastPage}
                 setTotalPages = {setTotalElements}
                // pageNumber={pageNumber}
             />
        </Modal>

        <Dialog
            fullScreen
            open={openAdd}
            onClose={handleCloseAdd}
            TransitionComponent={Transition}
        >
            <AddSupply 
                 closeModal={handleCloseAdd}
                 product={productSelected}
                 
             />
        </Dialog>

        <Dialog
            fullScreen
            open={openDetail}
            onClose={handleCloseDetail}
            TransitionComponent={Transition}
        >
            <DetailRecipe 
                 closeModal={handleCloseDetail}
                 product={productSelected}
                 
             />
        </Dialog>
    </Card>
}