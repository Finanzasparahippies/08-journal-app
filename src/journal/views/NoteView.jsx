import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"; 

import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'

import { ImageGallery } from "../components"
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startSavingNote, startUploadingFiles } from "../../store/journal";



export const NoteView = () => {

    const dispatch = useDispatch();

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal)

    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date])

    const onSavedNote = () => {
        dispatch ( startSavingNote() );
    }

    const onFileInputChange = ( { target } ) => {
        if ( target.files === 0 ) return;

        // console.log( 'Subiendo Archivos');

        dispatch( startUploadingFiles( target.files ) )
    }

    const fileInputRef = useRef( )

    useEffect(() => {
        dispatch(setActiveNote( formState ))

    }, [formState])

    useEffect(() => {
        if ( messageSaved.length > 0 ) {
            Swal.fire( 'Nota Actualizada', messageSaved, 'success')
        }
    
    }, [messageSaved])
    
    

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={ { mb:1}}
        className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light' >{dateString}</Typography>
            </Grid>
            <Grid item>

                <input 
                    type="file"
                    multiple
                    onChange={ onFileInputChange }
                    style={ { display: 'none' } }
                    ref={ fileInputRef }
                    />
                <IconButton
                    color="primary"
                    disabled= { isSaving }
                    onClick={ () => fileInputRef.current.click() }
                    >
                    <UploadOutlined/>
                </IconButton>

                <Button 
                    disabled={ isSaving }
                    onClick={ onSavedNote }
                    color="primary" 
                    sx={{ padding: 2}}>
                    <SaveOutlined sx={{ fontSize:30, mr: 1 }}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="titulo"
                    sx= {{ border: 'none', mb: 1}}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que sucedio en el dia de hoy"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            {/* Galeria de Imagenes */}
            <ImageGallery
                images = { note.imageUrls}
            />

        </Grid>
    )
}
