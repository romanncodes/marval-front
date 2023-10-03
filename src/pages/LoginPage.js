
import React, { useState } from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken"
import AuthConsumer from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/images/logo.png";
import { Alert, Button, Card, CardActions, CardContent, Grid, TextField } from "@mui/material";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const  [authed, dispatch] = AuthConsumer();
    let navigate = useNavigate()

    console.log(authed)

    const loginAction = ()=>{
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        axios({
            url:"https://rodev.cl/marval-recetas-backend/public/login",
            method:"post",
            data: formData
        },)
       // axios.post("http://192.168.0.8:8085/login",payload)
            .then(response => {
            //get token from response
            const token = response.data.token;
            console.log(response.data);
            //set JWT token to local
            localStorage.setItem("token", token);
            localStorage.setItem("username",response.data.username)
           // localStorage.setItem("email",response.data.email)


            //set token to axios common header
            setAuthToken(token);
            dispatch({ type: "login"})
            //if(response.data.type==="VENDEDOR"){
            //    navigate('/sales-point', { replace : true})
            //}else{
                navigate('/admin', { replace : true})
            //}
            //redirect user to home page
            //window.location.href = '/sales-point'

      })
      .catch(err => {
        setError(true);
        
    });
    }


  return <div style={{backgroundColor:"#42a5f5", display:"flex",alignItems:"center", padding:"0px", height:"100vh"}}>
    
        <Grid 
            container 
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Grid item xs={12} md={4}  sm={4} >
             
            <Card sx={{ minWidth: 375 }}>


                <CardContent>
                    {error?
                        <Alert severity="error">Error, datos no válidos!</Alert>
                        :""}
                    <div style={{display:"flex", "justifyContent":"center"}}>
                        <img height="150" src={logo} alt="logo"/>
                    </div>
                   
                    <TextField size="small" fullWidth id="email" label="Email" variant="outlined" onChange={(evt)=>{setEmail(evt.target.value)}} />   
                    
                    <br/>
                    <br/>
                    <TextField size="small" fullWidth id="pass" label="Password" type="password" variant="outlined" onChange={(evt)=>{setPassword(evt.target.value)}} />   
                </CardContent>
                <CardActions className="card-actions-login">
                    
                    <Button fullWidth onClick={loginAction} variant="contained">Entrar</Button>

                </CardActions>
            </Card>
            </Grid>
        </Grid>
    </div>
  
}
export default LoginPage;
