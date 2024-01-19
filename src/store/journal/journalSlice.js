import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
name: 'journal',
        initialState: {
            isSaving: false,
            messageSaved: '',
            notes: [],
            active: null,
            // active: {
            //     id: '1234',
            //     title: 'Hola',
            //     body: 'Mundo',
            //     date: 163201,
            //     imageUrl: [],// 'https://foto1.jpg', 'https://foto2.jpg'
            // }
        },
                reducers: {
                    savingNewNote: ( state ) => {
                        state.isSaving = true;
                    },
                    addNewEmptyNote: (state, action ) => {
                        state.notes.push( action.payload );
                        state.isSaving = false;
                    },
                    setActiveNote: ( state, action ) => {
                        state.active = action.payload;
                        state.messageSaved = '';
                    },
                    setNotes: ( state, action ) => {    
                        state.notes = action.payload;
                    },
                    setSaving: ( state, action ) => {
                        state.isSaving = true;
                        state.messageSaved = '';
                    },
                    updatedNote: ( state, action ) => {
                        state.isSaving = false;
                        state.notes = state.notes.map( note => {
                            if ( note.id === action.payload.id ) {
                                return action.payload;
                            }

                            return note;
                        });

                        state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
                    },
                    setPhotosToActiveNote: (state, action ) => {
                        state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
                        state.isSaving = false;
                    },
                    deleteNoteById: ( state, action ) => {

                    },
                
                }
            });
            
            
            // Action creators are generated for each case reducer function
            export const { 
                savingNewNote,
                addNewEmptyNote,
                setActiveNote,
                setNotes,
                setSaving,
                updatedNote,
                deleteNoteById,
                setPhotosToActiveNote,
            } = journalSlice.actions;