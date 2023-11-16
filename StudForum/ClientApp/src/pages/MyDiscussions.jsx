import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import DiscussionApi from "../api/DiscussionApi";
import CardDiscussion from "../components/CardDiscussion";
import { Context } from "..";

const MyDiscussion = (props) =>
{
    const [discussionList, setDiscussionList] = useState(null);
    
    const stores = useContext(Context)

    useEffect(() => {
        if (discussionList == null)
            DiscussionApi.getUserDiscussions(stores.user.user.id).then(res => setDiscussionList(res)).catch();
    }, [])

    return (
        <>
            <Header />
            <main className="content">
                <Container>
                    <h4 className="mt-5 text-center">Мои обсуждения</h4>
                <Row sm="1" md="2" xl="3">
                    {
                        discussionList != null
                        ?
                        discussionList.map(d => <Col className="mt-4" key={`${d.id}`}><CardDiscussion poster={d.posterUrl} k={`${d.id}`} title={d.title} text={d.content} date={`${new Date(d.createdDate).getDate()}.${new Date(d.createdDate).getMonth()}.${new Date(d.createdDate).getFullYear()} ${new Date(d.createdDate).getHours()}:${new Date(d.createdDate).getMinutes()}` }/> </Col>)
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

export default MyDiscussion;