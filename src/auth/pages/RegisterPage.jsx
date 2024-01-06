import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
    return (
        <AuthLayout title="Nuevo Registro">
            <form action="">
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre Completo"
                            type="Text"
                            placeholder="Ingresar nombre completo"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo Electronico"
                            type="Email"
                            placeholder="Ingresar correo electronico"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
                        <TextField
                            label="Contraseña"
                            type="Password"
                            placeholder="Ingresar contraseña"
                            fullWidth
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 1, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" fullWidth>
                                Crear Cuenta
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                    
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{ mr: 1}}>¿Ya tienes una cuenta?</Typography>
                        <Link component={RouterLink} color="inherit" to="/auth/register">
                            Ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
