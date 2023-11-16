import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col, Button, Pagination, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardDiscussion from "../components/CardDiscussion";
import DiscussionApi from "../api/DiscussionApi";
import CategoryApi from "../api/CategoryApi";

const Forum = (props) => {
    const [categories, setCategories] = useState(null)

    const queryParams = new URLSearchParams(window.location.search);

    const [discussionList, setDiscussionList] = useState(null);

    const countCards = 12;


    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [filter, setFilter] = useState(1);

    const [categoryId, setCategoryId] = useState(0)

    useEffect(() => {
        setCategoryId(Number(queryParams.get('categoryId') ?? 0))
        setPage(Number(queryParams.get('page') ?? 1))
        setFilter(Number(queryParams.get('filter') ?? 1))
        if (pageCount == 0)
            DiscussionApi.getCount().then(res => setPageCount(Math.ceil(res / countCards))).catch(err => { })

        DiscussionApi.getPage(countCards, Number(queryParams.get('page') ?? 1), Number(queryParams.get('categoryId') ?? 0), Number(queryParams.get('filter') ?? 1))
            .then(res => setDiscussionList(res))
            .catch(err => { });

        CategoryApi.getList().then(res => setCategories(res)).catch();

    }, [])

    const findSubcategory = (subcategoryId) =>
    {
        if (categories != null)
        {
            for (let i = 0; categories.length > i; i++)
            {
                for (let b = 0; categories[i].subcategories.length > b; b++)
                {
                    if (categories[i].subcategories[b].id == subcategoryId)
                        return categories[i].subcategories[b].name;
                }
            }
        }
        return ""
    }


    return (
        <>
            <Header />

            <main className="content">
                <Container>
                    <div className='d-flex align-items-center justify-content-between mt-5'>
                        <Form.Select style={{ maxWidth: "200px" }} className="bg-transparent text-white border-0" value={filter} onChange={e => {
                            window.location.href = `/forum?page=${page}&categoryId=${categoryId}&filter=${e.target.value}`
                        }}>
                            <option value="1" className="text-dark">Сначала новые</option>
                            <option value="2" className="text-dark">Сначала старые</option>
                            <option value="3" className="text-dark">Сначала популярные</option>
                        </Form.Select>
                        {
                            categoryId != 0
                                ?
                                <Button className='btn-green rounded px-3' onClick={e => { window.location.href = "/forum" }}>Все категории</Button>

                                :
                                <></>
                        }
                    </div>

                    <Row sm="1" md="2" xl="3">
                        {
                            discussionList != null
                                ?
                                <>
                                    {
                                        discussionList.map(d => <Col className="mt-4" key={`${d.id}`}><CardDiscussion poster={d.posterUrl} k={`${d.id}`} title={d.title} category={findSubcategory(d.subcategoryId)} text={d.content} date={`${new Date(d.createdDate).getDate()}.${new Date(d.createdDate).getMonth()}.${new Date(d.createdDate).getFullYear()} ${new Date(d.createdDate).getHours()}:${new Date(d.createdDate).getMinutes()}`} /> </Col>)
                                    }</>
                                :
                                <>
                                    <span className="fs-1 d-block my-5 w-100 text-center">Обсуждений не найдено</span>
                                </>
                        }

                    </Row>

                    {
                        discussionList != null ?
                            <>
                                <Pagination className="mt-5">
                                    {
                                        page < 2
                                            ?
                                            <>
                                                <Pagination.First disabled />
                                                <Pagination.Prev disabled />
                                            </>
                                            :
                                            <>
                                                <Pagination.First href={`/forum?page=1`} />
                                                <Pagination.Prev href={`/forum?page=${page - 1}`} />
                                                <Pagination.Item href={`/forum?page=${page - 1}`}>{`${page - 1}`}</Pagination.Item>

                                            </>
                                    }
                                    <Pagination.Item href={`/forum?page=${page}`} active>{`${page}`}</Pagination.Item>
                                    {
                                        pageCount > page
                                            ?
                                            <>
                                                <Pagination.Item href={`/forum?page=${page + 1}`}>{`${page + 1}`}</Pagination.Item>
                                                {
                                                    pageCount - page > 1
                                                        ?
                                                        <>
                                                            <Pagination.Item href={`/forum?page=${page + 2}`}>{`${page + 2}`}</Pagination.Item>
                                                            <Pagination.Ellipsis />
                                                            <Pagination.Item href={`/forum?page=${pageCount}`}>{pageCount}</Pagination.Item>

                                                        </>
                                                        :
                                                        <></>
                                                }

                                                <Pagination.Next href={`/forum?page=${page + 1}`} />
                                                <Pagination.Last href={`/forum?page=${pageCount}`} />
                                            </>
                                            :
                                            <>
                                                <Pagination.Next disabled />
                                                <Pagination.Last disabled />
                                            </>
                                    }


                                </Pagination>
                            </>
                            :
                            <>
                            </>
                    }


                    <div className="text-secondary">
                        <p>Всего обсуждений : {pageCount * countCards}</p>
                    </div>

                </Container>
            </main>

            <Footer />
        </>
    )
}

export default Forum;