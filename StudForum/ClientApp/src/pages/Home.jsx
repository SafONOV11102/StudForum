import React, { useEffect, useState } from 'react'


import Header from '../components/Header';
import { Button, Col, Container, Row } from 'react-bootstrap';
import CardDiscussion from '../components/CardDiscussion';
import discussionApi from '../api/DiscussionApi';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Home(props) {

    const [discussionList, setDiscussionList] = useState(null);
    const [discussionPopList, setDiscussionPopList] = useState(null);
    
    useEffect(() => {
        if (discussionList == null)
            discussionApi.getlatests().then(res => setDiscussionList(res)).catch();

        if (discussionPopList == null)
            discussionApi.getPopular().then(res => setDiscussionPopList(res)).catch();

    }, [])
    
    return (
        <>
            <Header />
            <Container className='content'>
            <main>
                <div className='d-flex align-items-center justify-content-between mt-5 ps-2'>
                    <span>Последние обсуждения</span>
                    <Link to="/creatediscussion"><Button className='btn-green rounded px-3'>Добавить</Button></Link>
                </div>

                <Row sm="1" md="2" xl="3">
                    {
                        discussionList != null
                        ?
                        discussionList.map(d => <Col className="mt-4" key={`${d.id}`}><CardDiscussion poster={d.posterUrl} k={`${d.id}`} title={d.title} text={d.content} date={`${new Date(d.createdDate).getDate()}.${new Date(d.createdDate).getMonth()}.${new Date(d.createdDate).getFullYear()} ${new Date(d.createdDate).getHours()}:${new Date(d.createdDate).getMinutes()}` }/> </Col>)
                        :
                        <></>
                    }
                    
                </Row>

                <div className='d-flex align-items-center justify-content-between mt-5 ps-2'>
                    <span>Интересные обсуждения</span>
                </div>

                <Row sm="1" md="2" xl="3">
                    {
                        discussionPopList != null
                        ?
                        discussionPopList.map(d => <Col className="mt-4" key={`${d.id}`}><CardDiscussion poster={d.posterUrl} k={`${d.id}`} title={d.title} text={d.content} date={`${new Date(d.createdDate).getDate()}.${new Date(d.createdDate).getMonth()}.${new Date(d.createdDate).getFullYear()} ${new Date(d.createdDate).getHours()}:${new Date(d.createdDate).getMinutes()}` }/> </Col>)
                        :
                        <></>
                    }
                    
                </Row>
            </main>
            </Container>
            <Footer />
        </>
    )

}

export default Home;