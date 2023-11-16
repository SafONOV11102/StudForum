import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, Container, Form } from "react-bootstrap";
import Footer from "../components/Footer";
import CategoryApi from "../api/CategoryApi";
import DiscussionApi from "../api/DiscussionApi";
import { Context } from "..";

const CreateDiscussion = (props) => {

    const [categories, setCategories] = useState(null);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [hashTags, setHashTags] = useState(" ");
    const [category, setCategory] = useState(0);
    const [poster, setPoster] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => 
    {
            CategoryApi.getList().then(res => setCategories(res)).catch();
    }, [])

    const stores = useContext(Context);

    const startCreate = async (e) =>
    {
        e.preventDefault();

        if (title.length < 2)
            return setError("Заголовок слишком короткий")
        else if (title.length > 99)
            return setError("Заголовок слишком длинный")
        else if (text.length < 20)
            return setError("Текст слишком короткий")
        else if (text.length > 1000)
            return setError("Текст слишком длинный")
        else if (category <= 0)
            return setError("Выберите категорию")
        else if (poster == null)
            return setError("Выберите постер");

        setError("")

        setError(await DiscussionApi.create(title, text, category, hashTags, stores.user.user.id, poster))
    }

    return (
        <>
            <Header />
            <main className="mt-5 content">
                <Container>
                    <h5>Создание обсуждения</h5>

                    <Form className="mt-5">
                        <div className="d-md-flex overflow-hidden justify-content-between">
                            <Form.Control
                                type='search'
                                className='p-2 input-dark me-md-3 me-xl-5 br-0'
                                placeholder='Заголовок'
                                onChange={e => setTitle(e.target.value)}
                            />
                            <Form.Select
                                className='p-2 mt-4 mt-md-0 input-dark ms-md-3 ms-xl-5 br-0'
                                onChange={e => setCategory(e.target.value)}
                            >
                                <option value="0">Категория</option>
                                {
                                    categories ? categories.map(c => c.subcategories.map(s => <option value={`${s.id}`} key={`${s.id}`}>{s.name}</option> )) : <></>
                                }
                            </Form.Select>
                        </div>

                        <div className="d-md-flex overflow-hidden justify-content-between mt-4">
                            <Form.Control
                                type='search'
                                as="textarea"
                                rows="10"
                                className='p-2 input-dark me-md-3 me-xl-5 br-0'
                                placeholder='Текст'
                                style={{resize: 'none'}}
                                onChange={e => setText(e.target.value)}
                            />

                            <div className="col-md-6 position-relative mt-4 mt-md-0">
                            <Form.Control
                                type='search'
                                as="textarea"
                                className='p-2 input-dark ms-md-3 ms-xl-5 br-0'
                                placeholder='Хэштеги (футбол, спорт)'
                                rows="2"
                                onChange={e => setHashTags(e.target.value)}
                                style={{resize: 'none'}}
                            />

                            <Form.Group className="my-2 ms-md-3 ms-xl-5">
                                <Form.Label className="small text-secondary">Постер</Form.Label>
                                <Form.Control
                                type='file'
                                className='p-2 input-dark br-0'
                                onChange={e => {
                                    setPoster(e.currentTarget)
                                }}
                                accept='.jpg, .png, .jpeg'
                            />
                            </Form.Group>

                            <span className="text-danger d-block ms-md-3 ms-xl-5 my-3">{error}</span>
                            <Button className="d-md-none btn-green py-2 mt-4 mt-md-0 fs-5 w-100 ms-md-3 ms-xl-5" onClick={startCreate}>
                                Создать
                            </Button>
                            <Button className="d-none d-md-block btn-green py-2 fs-5 w-100 ms-md-3 ms-xl-5 position-absolute" style={{bottom: "0"}} onClick={startCreate}>
                                Создать
                            </Button>
                            </div>
                           

                        </div>

                    </Form>

                </Container>
            </main>

            <Footer />
        </>
    )
}

export default CreateDiscussion