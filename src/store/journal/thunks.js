import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updatedNote } from "./";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async (dispatch, getstate) => {
        dispatch(savingNewNote());

        const { uid } = getstate().auth;
        // uid

        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime(),
        };

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        //!dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    };
};

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error("El uid del usuario no existe");

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};

export const startSavingNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch( updatedNote( note ) );
    };
};

export const startUploadingFiles = (files = [] ) => {
    return async ( dispatch ) => {
        dispatch( setSaving() );

        // console.log( files );

        // await fileUpload( files[0] );

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrl = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrl ));
    }
}