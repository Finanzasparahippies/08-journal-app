import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FireBaseAuth } from "./config";


const GoogleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {
        const result = await signInWithPopup( FireBaseAuth, GoogleProvider );
        // const credentials = GoogleAuthProvider.credentialsFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
        

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage,
        }
    }
}

export const registerUserWithEmailPassword = async ( { email, password, displayName } ) => {
    try {

        const resp = await createUserWithEmailAndPassword(FireBaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        //TODO: Actualizar el displayName en FireBase
        await updateProfile( FireBaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        console.log( error );
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailPassword = async ( {email, password } ) => {

    try {

        const resp = await signInWithEmailAndPassword(FireBaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;
        //TODO: Actualizar el displayName en FireBase
        await updateProfile( FireBaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            uid, photoURL, displayName
        }
        
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}


export const logoutFirebase = async () => {
    return await FireBaseAuth.signOut();
}