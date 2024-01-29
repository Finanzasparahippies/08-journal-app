export const initialState = {
    status: 'checking', //'checking' 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authState = {
    status: 'authenticated', //'checking' 'not-authenticated', 'authenticated'
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://demoimage.com/journal/demo.jpg',
    errorMessage: null,
}

export const notAuthState = {
    status: 'not-authenticated', //'checking' 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const demoUser = {
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://demoimage.com/journal/demo.jpg',
}