import React from "react";
import { Card } from "react-bootstrap";

import './CardDiscussion.css'
import { Link } from "react-router-dom";
import { API_BASE } from "../consts";

const CardDiscussion = (props) =>
{
    let text = props.text;

    if (text.length > 200)
        text = text.substring(0, 200) + "...";


    return (
        <>
           <Card key={`${props.k}`} className="card-custom shadow br-0 p-1" style={{ height: "26rem", maxHeight: "26rem", overflow: "hidden"}}>
                <Card.Img src={`${API_BASE}${props.poster}`} 
                style={{
                    height: '10rem',
                    maxHeight: '10rem',
                    objectFit: "cover"
                }}/>
                <Card.Body>
                    <Card.Title className="text-green " >
                        <Link className="text-green" to={`/discussion?id=${props.k}`}>
                            <h5 style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
                                {props.title}
                            </h5>
                        </Link>
                    </Card.Title>
                    <Card.Text className="mt-4" style={{color: "#bebebe"}}>
                        {text}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex justify-content-between">
                        <div><span className="small text-secondary">{props.date}</span></div>
                        {
                            props.category ?
                            <>
                                <div><span className="small" style={{color: "#0271F0"}}>#{props.category}</span></div>
                            
                            </>
                            :
                            <>
                            </>
                        }
                    </div>
                </Card.Footer>
            </Card> 
        </>
    )

}

export default CardDiscussion;