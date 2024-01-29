import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { demoUser, initialState, authState } from "../../fixtures/authFixtures";

describe("Pruebas en authSlice", () => {
    test('should show initialState y tag as "auth"', () => {
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe("auth");
    });

    test("should make authentication", () => {
        const state = authSlice.reducer( initialState, login( demoUser ) );
        // console.log( state );
        expect ( state ).toEqual ({
            status: 'authenticated', //'checking' 'not-authenticated', 'authenticated'
            uid: '123ABC',
            email: 'demo@google.com',
            displayName: 'Demo User',
            photoURL: 'https://demoimage.com/journal/demo.jpg',
            errorMessage: null,
        });

    });

    test("should call logout without arguments", () => {
        const state = authSlice.reducer( authState, logout( ) );
        // console.log( state );
        expect ( state ).toEqual ({
            status: 'not-authenticated', //'checking' 'not-authenticated', 'authenticated'
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        });

    });
    test("should call logout with arguments", () => {
        const errorMessage = 'credenciales incorrectas';
        const state = authSlice.reducer( authState, logout( {errorMessage} ) );
        // console.log( state );
        expect ( state ).toEqual ({
            status: 'not-authenticated', //'checking' 'not-authenticated', 'authenticated'
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        });

    });

    test('should change state to checking', () => {    

        const state = authSlice.reducer( authState, checkingCredentials() );
        expect (state.status).toBe('checking');

    });
});
