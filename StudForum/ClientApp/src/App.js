import React, { useContext, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';
import { Context } from '.';
import userApi from './api/UserApi';
import { Container, Spinner } from 'react-bootstrap';

const App = () => {

  const stores = useContext(Context);

  const [loading, setLoading] = useState(false);

  const checkAuth = () => {
    setLoading(false)
    if (!window.location.href.includes('/reg') && !window.location.href.includes('/login')) {
      if (localStorage.getItem('token') == null) {
        window.location.href = '/reg'
      }
      else {
        setLoading(true)
        userApi.authentication()
          .then(res => {
            if (res.id != 0 && res.isAuth) {
              stores?.user.setUser(res)
            }
            else
              stores?.user.setUser(undefined);
            setLoading(false)
          })
      }
    }

  }

  useEffect(() => {
    setLoading(true)
    checkAuth()
  }, [])

  return (
loading ?
    <Container className='d-flex align-items-center vh-100'>
    <Spinner animation="border" className='m-auto fs-3 text-green p-4' />
  </Container>
    :
    <Routes>
      {AppRoutes.map((route, index) => {
        const { element, ...rest } = route;
        return <Route key={index} {...rest} element={element} />;
      })}
    </Routes>

    
  );
}

export default App;
