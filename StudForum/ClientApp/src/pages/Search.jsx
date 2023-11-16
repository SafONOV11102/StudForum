import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import DiscussionApi from "../api/DiscussionApi";
import CardDiscussion from "../components/CardDiscussion";

const Search = (props) =>
{
    const queryParams = new URLSearchParams(window.location.search);
    
    const [discussionList, setDiscussionList] = useState(null);

    useEffect(() => {
        if (discussionList == null)
            DiscussionApi.search(queryParams.get("text")).then(res => setDiscussionList(res)).catch()
    }, []);

    console.log(discussionList)

    return(
        <>
            <Header searchText={queryParams.get("text")}/>
            <main className="content">
                <Container>
                <Row sm="1" md="2" xl="3">
                        {
                            discussionList != null
                                ?
                                <>
                                    {
                                        discussionList.map(d => <Col className="mt-4" key={`${d.id}`}><CardDiscussion k={`${d.id}`} title={d.title} text={d.content} date={`${new Date(d.createdDate).getDate()}.${new Date(d.createdDate).getMonth()}.${new Date(d.createdDate).getFullYear()} ${new Date(d.createdDate).getHours()}:${new Date(d.createdDate).getMinutes()}`} /> </Col>)
                                    }</>
                                :
                                <>
                                    <span className="fs-1 d-block my-5 w-100 text-center">Обсуждений не найдено</span>
                                </>
                        }

                    </Row>
                </Container>
            </main>
            <Footer />
        </>
    )
}

export default Search;