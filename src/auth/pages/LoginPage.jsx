import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { checkingAuthentication, startGoogleLogin } from '../../store/auth/thunks';



export const LoginPage = () => {

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm( {
    email: 'saul@google.com',
    password: '123456'

  });

  const onSubmit = (event) => {
    event.preventDefault();

    console.log({email, password});
    dispatch( checkingAuthentication() );
  }

  const onGoogleLogin = () => {
    console.log('googleSignIn');
    dispatch( startGoogleLogin() );
  }



  return (
    <AuthLayout title='Login'>
        <form action="" onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
              label="Correo" 
              type="Email" 
              placeholder="Ingresar correo electronico"
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }
              />
            </Grid>
        
            <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
              <TextField 
              label="Contraseña" 
              type="Password" 
              placeholder="Ingresar contraseña"
              fullWidth
              name='password'
              value={ password }
              onChange={ onInputChange }
              />
            </Grid>

            <Grid container spacing={2} sx={{mb:1, mt: 1}}>
              <Grid item xs={ 12 } sm= {6}>
              <Button type='submit' variant='contained' fullWidth>
                Login
              </Button>
              </Grid>
              <Grid item xs={ 12 } sm= {6}>
              <Button 
                variant='contained'
                fullWidth
                onClick={onGoogleLogin}
                >
                <Google/>
                <Typography sx={{ml: 1}}>Google</Typography>
              </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color= 'inherit' to='/auth/register'>
              Crear una cuenta
              </Link>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
  )
}
