import { screen } from "@testing-library/react";
import { signInWithGoogle, loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword } from "../../../src/firebase/providers";
import { authSlice, checkingAuthentication, checkingCredentials, login, logout, startCreatingUserWithEmailPassword, startGoogleLogin, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth"
import { clearNotesLogout } from "../../../src/store/journal";
import { authState, demoUser, initialState } from "../../fixtures/authFixtures";

jest.mock( '../../../src/firebase/providers');

describe('Pruebas en auth/thunks', () => { 
    const dispatch = jest.fn();
    
    beforeEach( () => jest.clearAllMocks() );

    test('should invoke checkingCredentials', async () => {   
        await checkingAuthentication()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        
    });

    test('startGoogleSignIn should call checkingCredentials and login - Succes', async () => {  

        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleLogin()(dispatch);

        expect ( dispatch ).toHaveBeenCalledWith ( checkingCredentials() );
        expect ( dispatch ).toHaveBeenCalledWith ( login( loginData ) );

    })

    test('startGoogleSignIn should call checkingCredentials and logout - Error', async () => {  

        const loginData = { ok: false, errorMessage: 'Un error en Google' };
        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleLogin()(dispatch);

        expect ( dispatch ).toHaveBeenCalledWith ( checkingCredentials() );
        expect ( dispatch ).toHaveBeenCalledWith ( logout( loginData.errorMessage ) );

    })

    test('startLoginWithEmailPassword should call checkingCredentials and login - succes', async () => {  

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startCreatingUserWithEmailPassword should call checkingCredentials and login - succes', async () => {  

        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };
        const loginData = { ok: true, ...demoUser };


        await registerUserWithEmailPassword.mockResolvedValue( loginData);

        await startCreatingUserWithEmailPassword( formData )( dispatch );
        


        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startCreatingUserWithEmailPassword should call checkingCredentials and login - error', async () => {  

        const formData = { email: demoUser.email, password: '12345678', displayName: demoUser.displayName };
        const errorMessage = 'Un error en Google';
        const loginData = { ok: false, errorMessage };


        await registerUserWithEmailPassword.mockResolvedValue( loginData);

        await startCreatingUserWithEmailPassword( formData )( dispatch );
        
        // screen.debug();

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( errorMessage ) );

    });

    test('startLogout should call logoutFirebase, clearNotes y logout', async () => {  
        await startLogout()( dispatch ); 

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

    });

    test('startLogout should call logout - error', async () => {  
        const errorMessage = 'Un error en Google';

        const state = authSlice.reducer( authState, logout( {errorMessage} ) );
        // console.log( state );

        expect ( state ).toEqual ( {
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'Un error en Google'
        } );

    });

});