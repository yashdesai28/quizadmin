import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbars from './components/Navbars';
import Addteacher from './components/Addteacher';
import Login from './components/Login';
import { Auths } from './components/Auths';
import Reqauth from './components/Reqauth';
import { useEffect, useState } from "react";
import { Addsubject } from './components/Addsubject';
import Sendsubject from './components/Sendsubject';
import Addquiz from './components/Addquiz';
import Chekemail from './components/Chekemail';
import Verifyotp from './components/Verifyotp';
import Forget from './components/Forget';
import Editprofile from './components/Editprofile';
import Analysis from './components/Analysis';
function App() {
  console.log("app");

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [chekadmin, setchekadmin] = useState();


  function handleClick() {
    console.log("handellogin");

    const role = localStorage.getItem('role');
    if (role === 'Teacher' && localStorage.getItem('roled') === '2') {
      setIsLoggedIn(role);
    }
    else if (role === 'Teacher' && localStorage.getItem('roled') === '3') {

      setchekadmin('yesthis');
      setIsLoggedIn(role);
    }


  }

  function handellogout() {
    setIsLoggedIn(false);
  }

  useEffect(() => {
    console.log("app effect");
    const checkUserData = () => {
      console.log("checkdata");
      const role = localStorage.getItem('role');
      console.log("role", role);

      if (role === 'Teacher' && localStorage.getItem('roled') === '2') {
        setIsLoggedIn(role);
      }
      else if (role === 'Teacher' && localStorage.getItem('roled') === '3') {
        setchekadmin('yesthis');
        setIsLoggedIn(role);
      }
    };

    checkUserData();
    window.addEventListener("storage", checkUserData);
    return () => {
      window.removeEventListener("storage", checkUserData);
    };
  }, []);



  return (
    <>
      <Auths>
        <Router>

          {isLoggedIn ? (<><div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <Navbars handellogout={handellogout} />
            <div className="body-wrapper">
              <Routes>

                {chekadmin === 'yesthis' ? (<Route path='/addteacher' element={<Reqauth><Addteacher /></Reqauth>} />) : (<></>)}
                <Route path='/addsubject' element={<Reqauth><Addsubject /></Reqauth>}></Route>
                <Route path='/sendsub' element={<Sendsubject />}></Route>
                <Route path='/addquiz' element={<Addquiz></Addquiz>}></Route>
                <Route path='/editprofile' element={<Editprofile></Editprofile>}></Route>
                <Route path='/an' element={<Analysis />}></Route>

              </Routes>
            </div>
          </div></>) : (

            <><Routes><Route path='/login' element={<Login onClickHandler={handleClick} />}  ></Route>
              <Route path='/email' element={<Chekemail />}  ></Route>
              <Route path='/otp' element={<Verifyotp />}  ></Route>
              <Route path='/forget' element={<Forget />}  ></Route>

            </Routes></>

          )}


        </Router>
      </Auths>


    </>
  );
}

export default App;
