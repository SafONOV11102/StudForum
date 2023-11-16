import React, { useState } from  'react'
import "./Reg.css"
import { API_BASE, LOGIN_MAX, LOGIN_MIN, PASSWORD_MAX, PASSWORD_MIN } from '../consts';
import { Link } from 'react-router-dom';
import userApi from '../api/UserApi'

const Reg = (props) => {
    
    const [errorMsg, setErrorMsg] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [placeOfStudy, setPlaceOfStudy] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const startReg = async (e) => 
    {
        e.preventDefault();

        if (localStorage.getItem('token') != null)
            return setErrorMsg(`Вы уже авторизованы !`);

        if (login.length < LOGIN_MIN)
            return setErrorMsg(`Слишком короткий логин (минимум ${LOGIN_MIN} символа)`)
        else if (login.length > LOGIN_MAX)
            return setErrorMsg(`Слишком длинный логин (максимум ${LOGIN_MAX} символов)`)
        else if (password.length < PASSWORD_MIN )
            return setErrorMsg(`Слишком короткий пароль (минимум ${PASSWORD_MIN} символа)`)
        else if (password.length > PASSWORD_MAX)
            return setErrorMsg(`Слишком длинный пароль (максимум ${PASSWORD_MAX} символов)`)
        else if (password !== repeatPassword)
            return setErrorMsg(`Пароли не совпадают !`)
        else if (name.length < 2)
            return setErrorMsg(`Слишком короткое имя !`)
        else if (surname.length < 3)
            return setErrorMsg('Слишком короткая фамилия !')
        else if (placeOfStudy.length < 2)
            return setErrorMsg('Укажите место учебы')
        else if (dateOfBirth == "")
            return setErrorMsg('Укажите дату рождения')

        setErrorMsg('');

        setErrorMsg(await userApi.reg(login, password, name, surname, placeOfStudy, new Date(dateOfBirth)));
    }

    return(
        <>
        <div className="d-flex align-items-center vh-100">
            <div className='form-auth shadow mx-auto px-3 py-3 align-items-center'>
                <h2 className='title-nunito text-center my-3'>Регистрация</h2>

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

                    <div className='d-flex mb-3'>
                        <div className='p-3' style={{"background" : "#40424F"}}>
                            <img src={`${API_BASE}/images/lock_1.png`}/>
                        </div>
                        <input className='input-dark w-100' placeholder='Повторите пароль' onChange={e => setRepeatPassword(e.target.value)}/>
                    </div>

                    <input className='input-dark w-100 mb-3' placeholder='Имя' onChange={e => setName(e.target.value)}/>
                    <input className='input-dark w-100 mb-3' placeholder='Фамилия' onChange={e => setSurname(e.target.value)}/>
                    <input className='input-dark w-100 mb-3' placeholder='Место учебы' onChange={e => setPlaceOfStudy(e.target.value)}/>
                    <input className='input-dark w-100 mb-3' type='date' min="1950-01-01" max="2010-12-31" onChange={e => setDateOfBirth(e.target.value)}/>
                    
                    <span className='text-danger mx-2'>{errorMsg}</span><br/>

                    <button className='btn btn-green w-100 mt-2 mb-3 btn-big' onClick={startReg}>Продолжить</button>

                    <p className='text-secondary text-center'>Есть аккаунт ? <Link to="/login" className='text-green'>Войдите</Link></p>
                </form>
            </div>
        </div>
            
        </>
    )

}

export default Reg;