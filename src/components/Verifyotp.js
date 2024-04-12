import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Verifyotp = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: { otp: '' }
    });

    const onsubmit = (data) => {
        console.log("reg");
        console.log(data);

        console.log(data.otp);


        const userenterotp = data.otp;
        const chekotp = sessionStorage.getItem('otp');
        console.log(chekotp);

        if (userenterotp == chekotp) {
            console.log("otp is match");
            navigate('/forget');
        }
        else {
            console.log("otp is not match");
        }

    };


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
                {/* <Box sx={{ width: '100%' }}>
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


                </Box> */}

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

                                        <form onSubmit={handleSubmit(onsubmit)}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Enter the otp
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    {...register('otp')}
                                                />
                                                {/* <div className='relerror'>{errors.email && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                </svg><p className='showerror'>{errors.email.message}</p></div>)}</div> */}
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

export default Verifyotp