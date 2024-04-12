import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { subjectschema } from '../schema/subject'
import axios from 'axios'
import './addt.css'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';


export const Addsubject = () => {

    const [open, setOpen] = React.useState(false);
    const [errormes, seterrormes] = useState('');
    const [eopen, esetopen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(subjectschema),
        defaultValues: { subname: '', subcode: '' }
    });

    const onsubmit = (data) => {
        console.log("add subject ");
        console.log(data);

        let teacherid = localStorage.getItem('Teacherid');

        axios.post('http://localhost:8080/subjectreg', {
            name: data.subname,
            code: data.subcode,
            teacherid: teacherid

        }).then((res) => {

            console.log("success", res.data);
            console.log("success")
            setOpen(true);


        }).catch((error) => {
            seterrormes("This Subject already exists")
            esetopen(true);
            console.log("error", error, "this is actch");


        });

        // reset();
    };




    const showicon = {
        display: 'flex',
        flexDirection: 'row',
        height: '1rem',
        color: 'red'
    }

    const mar = {
        margin: '1rem'
    }


    return (
        <>

            {/*  Header End */}
            <div className="container-fluid">
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            success full add subject
                        </Alert>
                    </Collapse>
                    {/* <Button
                disabled={open}
                variant="outlined"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Re-open
            </Button> */}
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Collapse in={eopen}>
                        <Alert severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        esetopen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {errormes}
                        </Alert>
                    </Collapse>
                    {/* <Button
                disabled={open}
                variant="outlined"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Re-open
            </Button> */}
                </Box>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body all-bck">
                            <h5 className="card-title fw-semibold mb-4">Forms</h5>
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onsubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Subject name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                name='subname'
                                                {...register('subname')}
                                            />
                                            <div className='relerror'>{errors.subname && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg><p className='showerror'>{errors.subname.message}</p></div>)}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Subject Code
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                name='subcode'
                                                {...register('subcode')}
                                            />
                                            <div className='relerror'>{errors.subcode && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg><p className='showerror'>{errors.subcode.message}</p></div>)}</div>
                                        </div>

                                        <button
                                            type='submit'
                                            defaultValue='Sign In'
                                            className='sign-btn1'
                                        >submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
