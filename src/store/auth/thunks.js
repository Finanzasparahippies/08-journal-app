import { signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials } from "./authSlice"


export const checkingAuthentication = ( email, password ) => {
    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

    }
}

export const startGoogleLogin = () => {
    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        console.log( {result} );
    }
}