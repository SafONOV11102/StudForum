import React, { useContext, useState } from "react";
import { Navbar, Container, Form, Button, Dropdown } from 'react-bootstrap';
import { API_BASE } from '../consts'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import './Header.css'
import { Context } from "../.";
import UserApi from "../api/UserApi";

const Header = (props) => {

    const stores = useContext(Context);

    const [searchText, setSearchText] = useState(props.searchText ? props.searchText : "");

    return (
        <>
            <Navbar bg="dark" variant='dark' className='shadow-lg py-3 header m-0 w-100' expand='lg'>
                <Container>
                    <Navbar.Toggle aria-controls='navbar-toggle' className='border-0'>
                        <FaBars className='fs-3 text-green my-1' />
                    </Navbar.Toggle>
                    <Navbar.Collapse id='navbar-toggle' className='text-end'>
                        <div className="d-none d-lg-flex justify-content-between w-100 align-items-center">
                            <div className="navs d-flex">
                                <div className="nav-home mx-md-3">
                                    <Link to="/" className='text-decoration-none d-flex justify-content-center'>Главная</Link>
                                </div>
                                <div className="nav-forum mx-md-3">
                                    <Link to="/forum" className='text-decoration-none d-flex justify-content-center'>Форум</Link>
                                </div>
                                <div className="nav-categories mx-md-3 ">
                                <Link to="/categories" className="d-flex text-decoration-none justify-content-center">Категории</Link>
                                </div>
                            </div>

                            <div className='col-md-4 col-lg-3 my-md-0 d-flex'>
                                <Form.Control
                                    type='search'
                                    className='col-12 p-2 shadow input-search'
                                    placeholder='Введите название фильма'
                                    onChange={e => setSearchText(e.target.value)}
                                    defaultValue={searchText}
                                />
                                <Button
                                    className="button-search btn-green"
                                    onClick={e => {
                                        if (searchText.length > 2)
                                            window.location.href = `/search?text=${searchText}`;  
                                    }}
                                    >Поиск</Button>
                            </div>

                            <Dropdown drop="start">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="d-none d-lg-block bg-transparent border-0 circle p-0">
                                    <img src={`${API_BASE}${stores.user.user.avatar}`} className="circle" style={{ maxWidth: '46px' }} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                    <Dropdown.ItemText className="text-center">{stores.user.user.name} {stores.user.user.surname}</Dropdown.ItemText>
                                    <Dropdown.Divider className="bg-success"></Dropdown.Divider>
                                    <Dropdown.Item href="/settings">Настройки профиля</Dropdown.Item>
                                    <Dropdown.Item href="/mydiscussions">Мои обсуждение</Dropdown.Item>
                                    <Dropdown.Item href="/creatediscussion">Создать обсуждение</Dropdown.Item>
                                    <Dropdown.Divider className="bg-success"></Dropdown.Divider>
                                    <Dropdown.Item className="text-center" onClick={e => {e.preventDefault(); UserApi.logout()}}>Выйти</Dropdown.Item>                                    
                                </Dropdown.Menu>
                            </Dropdown>

                        </div>

                        <div className="d-lg-none w-100 align-items-center navbar-mobile">
                            <div className="navs-mobile">
                                <div className="nav-home mx-md-3">
                                    <Link to="/" className='text-decoration-none d-flex justify-content-center'>Главная</Link>
                                </div>
                                <div className="nav-forum mx-md-3">
                                    <Link to="/forum" className='text-decoration-none d-flex justify-content-center'>Форум</Link>
                                </div>
                                <div className="nav-categories mx-md-3 ">
                                    <Link to="/categories" className="d-flex text-decoration-none justify-content-center">Категории</Link>
                                </div>
                            </div>

                            <Form className='col-10 col-sm-8 col-md-6 d-flex mx-sm-auto justify-content-between'>
                                <Form.Control
                                    type='search'
                                    className='col-10 p-2 shadow input-search'
                                    placeholder='Введите название фильма'
                                    onChange={e => setSearchText(e.target.value)}
                                    defaultValue={searchText}
                                />
                                <div className="col-2 p-0" style={{ marginLeft: "-10px" }}>
                                    <Button 
                                    className="button-search btn-green h-100 m-0"
                                    onClick={e => {
                                        if (searchText.length > 2)
                                            window.location.href = `/search?text=${searchText}`;  
                                    }}
                                    >Поиск</Button>
                                </div>
                            </Form>

                        </div>

                    </Navbar.Collapse>
                    
                    <Dropdown drop="start" className='d-lg-none btn border-0 circle p-0 position-absolute' style={{ right: "10px", top: "5px" }}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-transparent border-0">
                                    <img src={`${API_BASE}${stores.user.user.avatar}`} className="circle" style={{ maxWidth: '46px' }} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                    <Dropdown.ItemText className="text-center">{stores.user.user.name} {stores.user.user.surname}</Dropdown.ItemText>
                                    <Dropdown.Divider className="bg-success"></Dropdown.Divider>
                                    <Dropdown.Item href="/settings">Настройки профиля</Dropdown.Item>
                                    <Dropdown.Item href="/mydiscussions">Мои обсуждение</Dropdown.Item>
                                    <Dropdown.Item href="/creatediscussion">Создать обсуждение</Dropdown.Item>
                                    <Dropdown.Divider className="bg-success"></Dropdown.Divider>
                                    <Dropdown.Item className="text-center" onClick={e => {e.preventDefault(); UserApi.logout()}}>Выйти</Dropdown.Item>                                    
                                </Dropdown.Menu>
                            </Dropdown>

                </Container>

            </Navbar>
        </>
    )

}

export default Header;