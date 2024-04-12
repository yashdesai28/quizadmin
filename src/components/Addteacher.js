import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { Signupschema } from '../schema/signup'
import axios from 'axios'
import './addt.css'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const Addteacher = () => {

    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Signupschema),
        defaultValues: { name: '', email: '', password: '', confirm_password: '' }
    });



    const onsubmit = (data) => {
        console.log("reg");
        console.log(data);

        axios.post('http://localhost:8080/treg', {
            name: data.name,
            email: data.email,
            password: data.password,
            chpassword: data.confirm_password
        }).then((res) => {

            console.log("success", res.data);

            console.log("success")
            setOpen(true);


        }).catch((error) => {
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
                            Click the close icon to see the Collapse transition in action!
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
                                                Full name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                {...register('name')}
                                            />
                                            <div className='relerror'>{errors.name && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg><p className='showerror'>{errors.name.message}</p></div>)}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Email address
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

                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">
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
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">
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
        </>

    )
}

export default Addteacher