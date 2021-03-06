    import Avatar from "@mui/material/Avatar";
    import Button from "@mui/material/Button";
    import CssBaseline from "@mui/material/CssBaseline";
    import TextField from "@mui/material/TextField";
    import Link from "@mui/material/Link";
    import Paper from "@mui/material/Paper";
    import Box from "@mui/material/Box";
    import Grid from "@mui/material/Grid";
    import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
    import Typography from "@mui/material/Typography";
    import { createTheme, ThemeProvider } from "@mui/material/styles";
    import React, {useState} from 'react';
    import Axios from 'axios';
    import Swal from 'sweetalert2'

    function Copyright(props) {
    return (
        <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
        >
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/KATAZUL331">
        Athenea Proyects
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
        </Typography>
    );
    }

    const theme = createTheme();

    export default function SignInSide() {

        const [correo, setCorreo] = useState('')
        const [contrasena, setContrasena] = useState('')

        const login=async(e)=>{ 
            e.preventDefault();
            const Admin={correo,contrasena}
            const respuesta = await Axios.post('/admin/login/',Admin);
            console.log (respuesta)
            const mensaje= respuesta.data.mensaje

/*             if (mensaje !=='BIENVENID@, HAS INICIADO SESION'){

                Swal.fire({
                    icon: 'error',
                    title: mensaje,
                    showConfirmButton: false,
                    timer: 4000
                })
            } */

            if (mensaje ==='BIENVENID@, HAS INICIADO SESION')
            {
                const token = respuesta.data.token
                const nombre = respuesta.data.nombre
                const idUsuario = respuesta.data.id
        
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('nombre', nombre)
                sessionStorage.setItem('idUsuario', idUsuario)
        
                Swal.fire({
                    icon: 'success',
                    title: mensaje,
                    showConfirmButton: false,
                    timer: 4000
                })
                window.location.href='/Index'
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'DATOS INCORRECTOS, VERIFICAR',
                    showConfirmButton: false,
                    timer: 4000
                })
            }
        }

        return (
            <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: "url(https://source.unsplash.com/random)",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                    t.palette.mode === "light"
                        ? t.palette.grey[50]
                        : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <VpnKeyOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    MASTER SYSTEM
                    </Typography>
                    <Box
                    component="form"
                    noValidate
                    onSubmit={login}
                    sx={{ mt: 1 }}
                    >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e)=> setCorreo(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contrasena"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e)=> setContrasena(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                    Ingresar
                    </Button>
                    <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
                </Grid>
            </Grid>
            </ThemeProvider>
        );
        }
