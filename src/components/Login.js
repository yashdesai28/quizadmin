import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { NavLink, useNavigate } from 'react-router-dom';
import { loginschema } from '../schema/login';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';
import { useState } from 'react'
import { useAuth } from './Auths';


import './addt.css'

const Login = ({ onClickHandler }) => {
    const auth = useAuth();
    const [open, setOpen] = React.useState(false);
    const [erropen, errsetOpen] = React.useState(false);
    const [username, setUsername] = useState('');

    console.log("open", open)

    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(loginschema),
        defaultValues: { email: '', password: '' }
    });



    const onSubmit = (data) => {
        console.log("reg");
        console.log(data);

        axios.post('http://localhost:8080/login', {
            email: data.email,
            password: data.password,
        }).then((res) => {

            console.log("success", res.data[0]);

            if (res.data[0].user_role === "Teacher"&& res.data[0].user_status === 3) {
                localStorage.setItem('roled', res.data[0].user_status);
                localStorage.setItem('useremail', res.data[0].user_email);
                localStorage.setItem('role', res.data[0].user_role)
                auth.login(res.data[0]._id);
                console.log("admin");
                setOpen(true)
                onClickHandler();
                navigate('/sendsub')

            } else {
                console.log("success")
                console.log("teacher");
                localStorage.setItem('useremail', res.data[0].user_email);
                localStorage.setItem('Teacherid', res.data[0].roles_id[0]._id);
                localStorage.setItem('role', res.data[0].user_role);
                localStorage.setItem('roled', res.data[0].user_status);
                auth.login(res.data[0]._id);
                setOpen(true)
                onClickHandler();
                navigate('/sendsub')
            }





        }).catch((error) => {
            console.log("error", error, "this is actch");
            errsetOpen(true);


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
        margin: '0.1rem'
    }




    return (
        <>
            {/*  Body Wrapper */}
            <div
                className="page-wrapper all-bck"
                id="main-wrapper"
                data-layout="vertical"
                data-navbarbg="skin6"
                data-sidebartype="full"
                data-sidebar-position="fixed"
                data-header-position="fixed"
            ><Box sx={{ width: '100%' }}>
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
                            jnk
                        </Alert>

                    </Collapse>
                    <Collapse in={erropen}>
                        <Alert severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        errsetOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            enter  right email and password
                        </Alert>
                    </Collapse>

                </Box>
                <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center w-100">
                        <div className="row justify-content-center w-100">
                            <div className="col-md-8 col-lg-6 col-xxl-3">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <a
                                            href="./index.html"
                                            className="text-nowrap logo-img text-center d-block py-3 w-100"
                                        >
                                            <div className='logo'>
                                                <img
                                                    src="../assets/images/logos/logo.png"
                                                    width={100}
                                                    alt=""
                                                />
                                                <h4>easyQuiz</h4>
                                            </div>

                                        </a>


                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    {...register('email')}
                                                />
                                                <div className='relerror'>{errors.email && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                </svg><p className='showerror'>{errors.email.message}</p></div>)}</div>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="exampleInputPassword1"
                                                    className="form-label"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    {...register('password')}
                                                />
                                                <div className='relerror'>{errors.password && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                </svg><p className='showerror'>{errors.password.message}</p></div>)}</div>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-between mb-4">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input primary"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckChecked"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        className="form-check-label text-dark"
                                                        htmlFor="flexCheckChecked"
                                                    >
                                                        Remeber this Device
                                                    </label>
                                                </div>
                                                <NavLink to="/email"> <a className="text-primary fw-bold" href="">
                                                    Forgot Password ?
                                                </a></NavLink>

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
            </div>
        </>

    )
}

export default Login