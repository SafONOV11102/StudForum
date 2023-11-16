import React, { useState } from  'react'
import "./Reg.css"
import { API_BASE, LOGIN_MAX, LOGIN_MIN, PASSWORD_MAX, PASSWORD_MIN } from '../consts';
import { Link } from 'react-router-dom';
import userApi from '../api/UserApi'

const Login = (props) => {
    
    const [errorMsg, setErrorMsg] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const startLogin = async (e) => 
    {
        e.preventDefault();

        if (localStorage.getItem('token') != null)
            return setErrorMsg(`Вы уже авторизованы !`);

        if (login.length < LOGIN_MIN)
            return setErrorMsg(`Слишком короткий логин (минимум ${LOGIN_MIN} символа)`)
        else if (password.length < PASSWORD_MIN )
            return setErrorMsg(`Слишком короткий пароль (минимум ${PASSWORD_MIN} символа)`)

        setErrorMsg('');
        setErrorMsg(await userApi.login(login, password));
    }

    return(
        <>
        <div className="d-flex align-items-center vh-100">
            <div className='form-auth shadow mx-auto px-3 py-3 align-items-center'>
                <h2 className='title-nunito text-center my-3'>Вход</h2>

                <form className='mx-lg-5 mt-4 mb-3'>
                    <div className='d-flex mb-3'>
                        <div className='p-3' style={{"background" : "#40424F"}}>
                            <img src={`${API_BASE}/images/user_1.png`}/>
                        </div>
                        <input className='input-dark w-100' placeholder='Логин' onChange={e => setLogin(e.target.value)}/>
                    </div>

                    <div className='d-flex mb-3'>
                        <div className='p-3' style={{"background" : "#40424F"}}>
                            <img src={`${API_BASE}/images/lock_1.png`}/>
                        </div>
                        <input className='input-dark w-100' placeholder='Пароль' onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <span className='text-danger mx-2'>{errorMsg}</span><br/>

                    <button className='btn btn-green w-100 mt-2 mb-3 btn-big' onClick={startLogin}>Продолжить</button>

                    <p className='text-secondary text-center'>Нет аккаунта ? <Link to="/reg" className='text-green'>Создайте</Link></p>
                </form>
            </div>
        </div>
            
        </>
    )

}

export default Login;