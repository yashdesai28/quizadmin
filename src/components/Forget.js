import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom';
import { Forgetpss_schema } from '../schema/fogetpassword';
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
import Swal from 'sweetalert2'

const Forget = () => {
    const Alertbox = ({ popo }) => {

        return popo

    }


    const auth = useAuth();
    const [open, setOpen] = React.useState(false);
    const [erropen, errsetOpen] = React.useState(false);
    const [username, setUsername] = useState('');

    console.log("open", open)

    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(Forgetpss_schema),
        defaultValues: { password: '', confirm_password: '' }
    });



    const onSubmit = (data) => {
        console.log("forgetpassword");
        console.log(data);

        let session_email = sessionStorage.getItem('otpemail');

        console.log(session_email,"===");
        if (session_email) {

            axios.post('http://localhost:8080/fogotpassword', {
                email: session_email,
                password: data.password,
                chpassword: data.confirm_password
            }).then((res) => {

                console.log("success", res.data.up.modifiedCount);
                if (res.data.up.modifiedCount > 0) {
                    navigate('/login');
                }
                console.log("success")


            }).catch((error) => {
                console.log("error", error, "this is actch");

                Alertbox(Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Not Found",

                }));
            });
        }


        reset();
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


    useEffect(()=>{

        
        if(sessionStorage.getItem('otpemail')){
            console.log("set email");
        }
        else{
            navigate('/login');
        }
    })




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
            >
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
                                                Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    {...register('password')}
                                                />
                                                <div className='relerror'>{errors.password && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                </svg><p className='showerror'>{errors.password.message}</p></div>)}</div>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="exampleInputPassword1"
                                                    className="form-label"
                                                >
                                                confirm Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    {...register('confirm_password')}
                                                />
                                                <div className='relerror'>{errors.confirm_password && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                </svg><p className='showerror'>{errors.confirm_password.message}</p></div>)}</div>
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

export default Forget