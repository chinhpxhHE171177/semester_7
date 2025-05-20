import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Homepage";
import Comments from "./Comments";

function App() {
    return (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>Tutorial Online Course</h1>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tutorial/:id/comment" element={<Comments />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;