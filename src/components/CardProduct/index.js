import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Fab, IconButton, Tooltip } from '@mui/material';
import { Add, Edit, Summarize } from '@mui/icons-material';

export default function CardProduct(props) {



     

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.item.pr_img}
          alt={props.item.pr_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.item.pr_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{"diplay":"flex","justifyContent":"flex-end","marginBottom":"10px"}}> 
          <Tooltip title="Ver Costos">
            <Fab color="warning" size='small' aria-label="add to favorites" onClick={()=>props.handleOpenDetail(props.item)}>
                <Summarize fontSize='small' />
            </Fab>
          </Tooltip>
            &nbsp;&nbsp;
          <Tooltip title="Editar Producto">
            <Fab color="primary" size="small" aria-label="add to favorites" onClick={()=>props.handleOpenEdit(props.item)}>
                <Edit fontSize='small' />
            </Fab>
          </Tooltip>
            &nbsp;&nbsp;
          <Tooltip title="Agregar Ingredientes">
            <Fab color="success" size="small" aria-label="add to favorites" onClick={()=>props.handleOpenAdd(props.item)}>
                <Add fontSize='small'/>
            </Fab>
          </Tooltip>
            
        </CardActions>
     
        </CardActionArea>
    </Card>
  );
}