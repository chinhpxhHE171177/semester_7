import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

function HomePage() {
    const [tutorials, setTutorials] = useState([]);
    const [filterCate, setFilterCate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const tutoData = await axios.get(`http://localhost:9999/tutorials`);
            setTutorials(tutoData.data);
        };
        fetchData();
    }, []);

    const filteredTutorials = tutorials.filter(tutorial =>
        tutorial?.title.toLowerCase().includes(filterCate.toLowerCase())
    );

    return (
        <div>
            <Link style={{ marginLeft: "120px", textDecoration: "none" }}>Home Page</Link>
            {/* search form */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <input
                    style={{ padding: "5px", borderRadius: '5px' }}
                    type="text"
                    placeholder="Enter title to search Tutorials"
                    value={filterCate}
                    onChange={e => setFilterCate(e.target.value)}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "40px 40px",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                {filteredTutorials?.map((tutorial, _) => (
                    <Card key={tutorial._id} style={{width: "18rem" }}>
                        <Card.Img style={{ width: '100%', height: '200px' }} variant="top" src={`${tutorial?.images[0].url}`} />
                        <Card.Body>
                            <Card.Title style={{padding: "5px 10px"}}>{tutorial?.title}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item style={{padding: "5px 10px"}}>Author: {tutorial?.author}</ListGroup.Item>
                            <ListGroup.Item style={{padding: "5px 10px"}}>Category: {tutorial?.category?.name}</ListGroup.Item>
                        </ListGroup>
                        <Card.Body style={{ textAlign: 'center' }}>
                            <Link style={{ textDecorationLine: 'none' }} to={`/tutorial/${tutorial._id}/comment`} state={tutorial.comments}>Comment: {tutorial.comments.length}</Link>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default HomePage;