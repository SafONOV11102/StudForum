import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = (props) =>
{

    return(
        <>
            <div className="footer shadow-lg py-5 mt-5 mt-md-0">
                <Container>
                    <Row xs="1" sm="2" md="3">
                        <Col className="mt-md-0 ">
                            <h5 className="text-green" >Контент</h5>
                            <Link to="/" className="text-decoration-none text-secondary text-green-hover mt-4 d-block">Главная</Link>
                            <Link to="/forum" className="text-decoration-none text-secondary text-green-hover mt-3 d-block">Форум</Link>
                            <Link to="/categories" className="text-decoration-none text-secondary text-green-hover mt-3 d-block">Категории</Link>
                        </Col>

                        <Col className="mt-5 mt-sm-0 mt-md-0">
                            <h5 className="text-green" >Контакты</h5>
                            <span className="text-decoration-none text-secondary text-green-hover mt-4 d-block">Адрес : г. Москва, ул. Ленина, д. 1В</span>
                            <span className="text-decoration-none text-secondary text-green-hover mt-3 d-block">Телефон : +7 999 000 09 09</span>
                            <span className="text-decoration-none text-secondary text-green-hover mt-3 d-block">Почта : forum@myemail.com</span>
                        </Col>

                        <Col className="mt-5 mt-md-0">
                            <h5 className="text-green" >Помощь</h5>
                            <Link to="/faq" className="text-decoration-none text-secondary text-green-hover mt-4 d-block">FAQ</Link>
                            <span className="text-decoration-none text-secondary text-green-hover mt-3 d-block">forum@myemail.com</span>
                        </Col>
                    </Row>
                    <span className="text-secondary text-green-hover mt-3 d-block">Copyright © 2022-2023</span>
                </Container>
            </div>
        </>
    )

}

export default Footer;