import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
function HomePage() {
  const [tutorials, setTutorials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCate, setFilterCate] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const tutoData = await axios.get(`http://localhost:9999/tutorials`);
      setTutorials(tutoData.data);
      const cateĐata = await axios.get(`http://localhost:9999/categories`);
      setCategories(cateĐata.data);
    };
    fetchData();
  }, []);
  const filteTutorials = tutorials.filter(tutorial => tutorial?.category._id === filterCate || '' === filterCate);
  return (
    <div>
      <Link style={{ textDecoration: "none" }}>Home Page</Link>
      <div style={{ margin: "20px 0" }}>
        <select defaultValue={''} onChange={(e) => setFilterCate(e.target.value)}>
          <option value={''}>--- Select Category to filter ---</option>
          {categories.map((category, _) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px 40px",
        }}
      >
        {filteTutorials?.map((tutorial, _) => (
          <Card key={tutorial._id} style={{ width: "18rem" }}>
            <Card.Img style={{width: '100%', height: '200px'}} variant="top" src={`${tutorial?.images[0].url}`} />
            <Card.Body>
              <Card.Title>{tutorial?.title}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Author: {tutorial?.author}</ListGroup.Item>
              <ListGroup.Item>Category: {tutorial?.category?.name}</ListGroup.Item>
            </ListGroup>
            <Card.Body style={{textAlign: 'center'}}>
              <Link style={{textDecorationLine: 'none'}} to={`/tutorial/${tutorial._id}/comment`} state={tutorial.comments}>Comment: {tutorial.comments.length}</Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
