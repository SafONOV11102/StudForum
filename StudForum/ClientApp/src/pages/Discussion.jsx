import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header';
import { Button, Container, Form } from 'react-bootstrap';
import Footer from '../components/Footer';
import DiscussionApi from '../api/DiscussionApi';
import { Context } from '..';
import { API_BASE } from '../consts';

const Discussion = (props) => {
    const queryParams = new URLSearchParams(window.location.search);

    const stores = useContext(Context);

    const [discussion, setDiscussion] = useState(null)
    let loaded = false;

    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState(null);

    useEffect(() => {

        if (!loaded) {
            loaded = true;
            DiscussionApi.getById(Number(queryParams.get('id') ?? 1)).then(res => setDiscussion(res)).catch(res => { });
            DiscussionApi.getAnswers(Number(queryParams.get('id') ?? 1)).then(res => setAnswers(res)).catch(res => { });
        }
    }, []);

    return (
        <>
            <Header />
            <main className="content">
                <Container className='pt-5 px-2 px-md-4'>
                    {
                        discussion != null ?
                            <>
                                <h3 className='text-green text-center'>{discussion.title}</h3>
                                <div className='my-4 p-3 shadow' style={{ background: "var(--background-block)" }}>
                                    <div className="d-flex align-items-center">
                                        <img src={`${API_BASE}${discussion.avatarUrl}`} className="circle" style={{maxWidth: "36px"}}/>
                                        <span className='ps-3'>{discussion.name} {discussion.surname}</span>
                                        <span className="ps-3 small text-secondary">@{discussion.login}</span>

                                    </div>
                                    <hr />
                                    <div style={{minHeight: "360px"}}>
                                    <img 
                                        src={`${API_BASE}${discussion.posterUrl}`} 
                                        className='col-12 col-xl-6 me-4 mb-4 mb-xl-0'
                                        style={{
                                            maxHeight: "360px",
                                            objectFit: "cover"
                                        }}
                                        align="left"
                                    />
                                    <p className='mb-4'>
                                        {discussion.content}
                                    </p>
                                    </div>
                                    
                                    <hr />
                                    <div className='justify-content-between d-flex'>
                                        <div className='small text-secondary'>
                                            <span>
                                                {`${new Date(discussion.createdDate).getDate()}.${new Date(discussion.createdDate).getMonth()}.${new Date(discussion.createdDate).getFullYear()} ${new Date(discussion.createdDate).getHours()}:${new Date(discussion.createdDate).getMinutes()}`}
                                            </span>
                                        </div>
                                        <div className='small text-secondary'>
                                            {`${discussion.views} просмотров`}

                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Ответ</Form.Label>
                                            <Form.Control
                                                className='input-dark br-0'
                                                as="textarea"
                                                rows={5}
                                                style={{ resize: "none" }}
                                                placeholder='Напишите что-нибудь...'
                                                onChange={e => setAnswer(e.target.value)}
                                            />
                                        </Form.Group>
                                        <div className="text-end">

                                            <Button
                                                className='my-4 btn-green'
                                                onClick={e => {
                                                    e.preventDefault();

                                                    if (answer.length < 3)
                                                        return alert("Заполните поле !");

                                                    DiscussionApi.addAnswer(Number(queryParams.get('id') ?? 1), stores.user.user.id, answer)
                                                }}
                                            >
                                                Отправить
                                            </Button>
                                        </div>

                                    </Form>
                                </div>

                                <div>
                                    {
                                        answers != null
                                            ?
                                            answers.map(a =>
                                                <div
                                                    className='mt-3 p-3'
                                                    style={{ background: "var(--background-block)" }}>

                                                    <div className="d-flex align-items-center">
                                                        <img src={`${API_BASE}${a.avatarUrl}`} className="circle" style={{ maxWidth: "32px" }} />
                                                        <span className='ps-3'>{a.name}</span>
                                                        <span className='px-1'>{a.surname}</span>
                                                        <span className='ps-3 small text-secondary'>@{a.login}</span>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <p style={{color: "#d9d9d9"}}>
                                                            {a.content}
                                                        </p>
                                                        <span className='text-secondary small'>{a.date}</span>
                                                    </div>

                                                </div>
                                            )
                                            :
                                            <></>
                                    }
                                </div>
                            </>
                            :
                            <>
                            </>
                    }
                </Container>
            </main>
            <Footer />
        </>
    )
}

export default Discussion;