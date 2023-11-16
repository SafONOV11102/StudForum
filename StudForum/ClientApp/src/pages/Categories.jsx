import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Col, Container, Row } from 'react-bootstrap';
import CategoryApi from '../api/CategoryApi';
import { Link } from 'react-router-dom';

const Categories = (props) =>
{
    const [categories, setCategories] = useState(null)

    useEffect(() => 
    {
        CategoryApi.getList().then(res => setCategories(res)).catch();
    }, [])

    return(
        <>
            <Header />

            <main className='content mt-5'>
                <Container>
                <Row xs="1" sm="2" md="3" xl="4" className='text-center text-sm-start'>
                    {
                        categories != null ?
                        categories.map(c => <Col key={`${c.id}`} className='mt-5'> <h5 className='text-green'>{c.name}</h5> <div> {c.subcategories.map(s => <Link to={`/forum?categoryId=${s.id}`} className='d-block py-2 text-decoration-none text-bloom text-green-hover' key={`${s.id}`}>{s.name}</Link>)} </div> </Col>)
                        :
                        <></>
                    }
                </Row>
                </Container>
               
            </main>

            <Footer />
        </>
    )

}

export default Categories;