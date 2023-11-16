import React, { useContext, useEffect, useState } from "react";
import Header from '../components/Header'
import Footer from "../components/Footer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Context } from "..";
import { API_BASE } from "../consts";
import UserApi from "../api/UserApi";
import { Link } from "react-router-dom";

const Settings = (props) => {
    const stores = useContext(Context)

    let profileLoaded = false;

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [date, setDate] = useState("");
    const [city, setCity] = useState("");
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [createdDis, setCreatedDis] = useState(0);
    const [answers, setAnswers] = useState(0)

    useEffect(() => {
        if (!profileLoaded && stores.user.user.id != undefined)
        {
            UserApi.getProfile(stores.user.user.id).then(res =>
                {
                    setDate(res.date);
                    setCity(res.city);
                    setEmail(res.email);
                    setCreatedDis(res.createdDis);
                    setAnswers(res.answers);
                })

            profileLoaded = true;
        }
    }, []);

    return (
        <>
            <Header />

            <main className="content mt-5">
                <Container>

                    <Row lg="2">
                        <Col xl="4">
                            <div className="bg-dark p-3 px-3 col-12 col-sm-12 col-md-8 col-lg-11 col-xl-12 d-flex align-items-center">
                                <div className="rouned col-4 col-sm-3 ms-2 ms-md-3 col-md-4 overflow-hidden">
                                    <img className="h-100 w-100 circle" src={`${API_BASE}${stores.user.user.avatar}`} />
                                </div>
                                <div className="ps-5">
                                    <h5>{stores.user.user.name} {stores.user.user.surname}</h5>
                                    <span className="text-secondary">КИТиЭ</span>
                                </div>
                            </div>

                            <div className="mt-5 text-center text-md-start mb-5">
                                <p>Создано обсуждений : {createdDis} </p>
                                <p>Ответ в обсуждениях : {answers} </p>
                                <Link to="/creatediscussion"><Button className="btn-green py-2 px-3 my-3">Создать обсуждение</Button></Link>
                            </div>
                        </Col>
                        <Col xl="8">
                            <Row xs="1" xl="2">
                                <Col className="ps-xl-4">
                                    <Form>
                                        <Form.Group className="my-3 my-lg-0 mb-lg-4">
                                            <Form.Label>Имя</Form.Label>
                                            <div className="d-flex justify-content-between">
                                                <Form.Control
                                                    type='text'
                                                    className='p-2 input-dark br-0'
                                                    placeholder='Введите ваше имя'
                                                    defaultValue={stores.user.user.name}
                                                    onChange={e => setName(e.target.value)}
                                                />
                                                <Button className="btn-green" 
                                                    onClick={e => {
                                                        e.preventDefault();

                                                        if (name.length < 2 || name.length > 70)
                                                            return alert("Некорректное имя !")
                                                        
                                                        UserApi.updateProfile(name, stores.user.user.id, "name");
                                                    }}
                                                >Подтвердить</Button>

                                            </div>
                                        </Form.Group>

                                        <Form.Group className="my-3 my-lg-0 mb-lg-4">
                                            <Form.Label>Фамилия</Form.Label>
                                            <div className="d-flex justify-content-between">
                                                <Form.Control
                                                    type='text'
                                                    className='p-2 input-dark br-0'
                                                    placeholder='Введите вашу фамилию'
                                                    onChange={e => setSurname(e.target.value)}
                                                    defaultValue={stores.user.user.surname}
                                                />
                                                <Button className="btn-green" 
                                                    onClick={e => {
                                                        e.preventDefault();

                                                        if (surname.length < 3 || surname.length > 70)
                                                            return alert("Некорректная фамилия !")
                                                    
                                                        UserApi.updateProfile(surname, stores.user.user.id, "surname")
                                                        }}
                                                >Подтвердить</Button>

                                            </div>
                                        </Form.Group>

                                        <Form.Group className="my-3 my-lg-0 mb-lg-4">
                                            <Form.Label>Дата рождения</Form.Label>
                                            <div className="d-flex justify-content-between">
                                                <Form.Control
                                                    type='date'
                                                    className='p-2 input-dark br-0'
                                                    defaultValue={date}
                                                    onChange={e => setDate(e.target.value)}
                                                    min="1980-01-01"
                                                    max="2008-12-31"
                                                />
                                                <Button className="btn-green"
                                                    onClick={e => {
                                                        e.preventDefault();

                                                        if (date == null || date.length < 4)
                                                            return alert("Некорректная дата !")

                                                        UserApi.updateProfile(date, stores.user.user.id, "date")
                                                    }}
                                                >Подтвердить</Button>

                                            </div>
                                        </Form.Group>

                                        <Form.Group className="my-3 my-lg-0 mb-lg-4">
                                            <Form.Label>Город</Form.Label>
                                            <div className="d-flex justify-content-between">
                                                <Form.Control
                                                    type='text'
                                                    className='p-2 input-dark br-0'
                                                    defaultValue={city}
                                                    onChange={e => setCity(e.target.value)}
                                                />
                                                <Button className="btn-green"
                                                    onClick={e => {
                                                        e.preventDefault();

                                                        if (city.length < 3 || city.length > 70)
                                                            return alert("Некорректная дата !")

                                                        UserApi.updateProfile(city, stores.user.user.id, "city")
                                                    }}
                                                >Подтвердить</Button>

                                            </div>
                                        </Form.Group>
                                    </Form>
                                </Col>

                                <Col className="ps-xl-4">
                                    <Form>
                                        <Form.Group className="my-3 my-lg-0 mb-lg-4">
                                            <Form.Label>Логин</Form.Label>
                                            <div className="d-flex justify-content-between">
                                                <Form.Control
                                                    type='text'
                                                    className='p-2 input-dark br-0'
                                                    placeholder=''
                                                    defaultValue={stores.user.user.login}
                                                    onChange={e => setLogin(e.target.value)}
                                                />
                                                <Button className="btn-green"
                                                     onClick={e => {
                                                        e.preventDefault();

                                                        if (login.length < 3 )
                                                            return alert("Логин слишком короткий !")
                                                        else if (password.length > 70)
                                                            return alert("Логин слишком длинный !")

                                                        UserApi.updateProfile(login, stores.user.user.id, "login")
                                                    }}
                                                >Подтвердить</Button>

                                            </div>
                                        </Form.Group>

                                        <Form.Group className="my-3 my-lg-0 mb-lg-4">
                                            <Form.Label>Почта</Form.Label>
                                            <div className="d-flex justify-content-between">
                                                <Form.Control
                                                    type='email'
                                                    className='p-2 input-dark br-0'
                                                    placeholder='Введите вашу почту'
                                                    defaultValue={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                                <Button className="btn-green"
                                                     onClick={e => {
                                                        e.preventDefault();

                                                        if (email.length < 6 || email.length > 70)
                                                            return alert("Некорректная почта !")

                                                        UserApi.updateProfile(email, stores.user.user.id, "email")
                                                    }}
                                                >Подтвердить</Button>

                                            </div>
                                        </Form.Group>

                                        <Form.Group className="my-3 my-lg-0 mb-lg-4">
                                            <Form.Label>Пароль</Form.Label>
                                            <div className="d-flex justify-content-between">
                                                <Form.Control
                                                    type='password'
                                                    className='p-2 input-dark br-0'
                                                    placeholder="**************"
                                                    defaultValue=""
                                                    onChange={e => setPassword(e.target.value)}
                                                />
                                                <Button className="btn-green"
                                                    onClick={e => {
                                                        e.preventDefault();

                                                        if (password.length < 7 )
                                                            return alert("Пароль слишком короткий !")
                                                        else if (password.length > 70)
                                                            return alert("Пароль слишком длинный !")

                                                        UserApi.updateProfile(password, stores.user.user.id, "password")
                                                    }}
                                                >Подтвердить</Button>

                                            </div>
                                        </Form.Group>

                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Container>
            </main>

            <Footer />
        </>
    )
}

export default Settings;