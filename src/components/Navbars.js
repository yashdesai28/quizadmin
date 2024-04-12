import React from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useAuth } from './Auths';
function Navbars({ handellogout }) {

    const navigate = useNavigate();
    const auth = useAuth();

    const logout = () => {
        auth.logout();
        handellogout();
        navigate('/login');
    }

    return (
        <>
            {/*  Body Wrapper */}
            <div
                className="page-wrapper"
                id="main-wrapper"
                data-layout="vertical"
                data-navbarbg="skin6"
                data-sidebartype="full"
                data-sidebar-position="fixed"
                data-header-position="fixed"
            >
                {/* Sidebar Start */}
                <aside className="left-sidebar">
                    {/* Sidebar scroll*/}
                    <div>
                        <div className="brand-logo d-flex align-items-center justify-content-between">
                            <a href="./index.html" className="text-nowrap logo-img">
                                <div className='logo'>
                                    <img
                                        src="../assets/images/logos/logo.png"
                                        width={100}
                                        alt=""
                                    />
                                    <h4>easyQuiz</h4>
                                </div>
                            </a>
                            <div
                                className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
                                id="sidebarCollapse"
                            >
                                <i className="ti ti-x fs-8" />
                            </div>
                        </div>
                        {/* Sidebar navigation*/}
                        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                            <ul id="sidebarnav">
                                <li className="nav-small-cap">
                                    <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                    <span className="hide-menu">Home</span>
                                </li>
                                <li className="sidebar-item">
                                    <a
                                        className="sidebar-link"
                                        href="./index.html"
                                        aria-expanded="false"
                                    >
                                        <span>
                                            <i className="ti ti-layout-dashboard" />
                                        </span>
                                        <span className="hide-menu">Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-small-cap">
                                    <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                    <span className="hide-menu">UI COMPONENTS</span>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to='/addteacher'>
                                        <a
                                            className="sidebar-link"
                                            // href="./ui-buttons.html"
                                            aria-expanded="false"
                                        >
                                            <span>
                                                <i className="ti ti-article" />
                                            </span>
                                            <span className="hide-menu">Add Teacher</span>
                                        </a>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to='/addquiz'>
                                        <a
                                            className="sidebar-link"
                                            // href="./ui-forms.html"
                                            aria-expanded="false"
                                        >
                                            <span>
                                                <i className="ti ti-file-description" />
                                            </span>
                                            <span className="hide-menu">Add quiz</span>
                                        </a>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to='/sendsub'>
                                        <a
                                            className="sidebar-link"
                                            // href="./ui-forms.html"
                                            aria-expanded="false"
                                        >
                                            <span>
                                                <i className="ti ti-file-description" />
                                            </span>
                                            <span className="hide-menu">send  invitation link</span>
                                        </a>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to='/addsubject'>
                                        <a
                                            className="sidebar-link"
                                            href="./ui-forms.html"
                                            aria-expanded="false"
                                        >
                                            <span>
                                                <i className="ti ti-file-description" />
                                            </span>
                                            <span className="hide-menu">Add Subject</span>
                                        </a>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to='/an'>
                                        <a
                                            className="sidebar-link"
                                            // href="./ui-forms.html"
                                            aria-expanded="false"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.7rem' }} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                                            </svg>


                                            <span className="hide-menu">Analysis</span>
                                        </a>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to='/editprofile'>
                                        <a
                                            className="sidebar-link"
                                            // href="./ui-forms.html"
                                            aria-expanded="false"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: '1.7rem' }} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>

                                            <span className="hide-menu">Profile</span>
                                        </a>
                                    </NavLink>
                                </li>
                                {/* <li className="nav-small-cap">
                                    <i className="ti ti-dots nav-small-cap-icon fs-4" />
                                    <span className="hide-menu">AUTH</span>
                                </li> */}
                                {/* <li className="sidebar-item">
                                    <NavLink to='/login'>
                                        <a
                                            className="sidebar-link"
                                            href="./authentication-login.html"
                                            aria-expanded="false"
                                        >
                                            <span>
                                                <i className="ti ti-login" />
                                            </span>
                                            <span className="hide-menu">Login</span>
                                        </a>
                                    </NavLink>
                                </li> */}
                                {/* <li className="sidebar-item">
                                    <a
                                        className="sidebar-link"
                                        href="./authentication-register.html"
                                        aria-expanded="false"
                                    >
                                        <span>
                                            <i className="ti ti-user-plus" />
                                        </span>
                                        <span className="hide-menu">Register</span>
                                    </a>
                                </li> */}



                            </ul>

                        </nav>
                        {/* End Sidebar navigation */}
                    </div>
                    {/* End Sidebar scroll*/}
                </aside>
                {/*  Sidebar End */}
                {/*  Main wrapper */}
                <div className="body-wrapper">
                    {/*  Header Start */}
                    <header className="app-header">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <ul className="navbar-nav">
                                <li className="nav-item d-block d-xl-none">
                                    <a
                                        className="nav-link sidebartoggler nav-icon-hover"
                                        id="headerCollapse"
                                        href="javascript:void(0)"
                                    >
                                        <i className="ti ti-menu-2" />
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link nav-icon-hover" href="javascript:void(0)">
                                        <i className="ti ti-bell-ringing" />
                                        <div className="notification bg-primary rounded-circle" />
                                    </a>
                                </li>
                            </ul>
                            <div
                                className="navbar-collapse justify-content-end px-0"
                                id="navbarNav"
                            >
                                <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">

                                    <li>
                                        <h5 style={{ color: '#8c8d8e' }}>Signed in as: {localStorage.getItem('useremail')}</h5>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link nav-icon-hover"
                                            href="javascript:void(0)"
                                            id="drop2"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img
                                                src="../assets/images/profile/user-1.jpg"
                                                alt=""
                                                width={35}
                                                height={35}
                                                className="rounded-circle"
                                            />
                                        </a>
                                        <div
                                            className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                                            aria-labelledby="drop2"
                                        >
                                            <div className="message-body">
                                                <a
                                                    href="javascript:void(0)"
                                                    className="d-flex align-items-center gap-2 dropdown-item"
                                                >
                                                    <i className="ti ti-user fs-6" />
                                                    <p className="mb-0 fs-3">My Profile</p>
                                                </a>
                                                <a
                                                    href="javascript:void(0)"
                                                    className="d-flex align-items-center gap-2 dropdown-item"
                                                >
                                                    <i className="ti ti-mail fs-6" />
                                                    <p className="mb-0 fs-3">My Account</p>
                                                </a>
                                                <a
                                                    href="javascript:void(0)"
                                                    className="d-flex align-items-center gap-2 dropdown-item"
                                                >
                                                    <i className="ti ti-list-check fs-6" />
                                                    <p className="mb-0 fs-3">My Task</p>
                                                </a>
                                                <a

                                                    className="btn btn-outline-primary mx-3 mt-2 d-block"
                                                    onClick={logout}
                                                >
                                                    Logout
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                </div>
            </div>
        </>

    )
}

export default Navbars