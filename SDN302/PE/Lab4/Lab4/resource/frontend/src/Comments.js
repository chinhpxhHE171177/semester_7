import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function Comments() {
    const { id } = useParams();
    const comments = useLocation().state || {};

    return (
        <div>
            <Link style={{ textDecorationLine: "none" }} to={"/"}>
                Home Page
            </Link>
            <div style={{ margin: "20px 0" }}>
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Text</th>
                            <th>Create At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.length ? (
                            comments.map((comment, index) => (
                                <tr key={index}>
                                    <td>{comment._id}</td>
                                    <td>{comment.username}</td>
                                    <td>{comment.text}</td>
                                    <td>{comment.createAt}</td>
                                </tr>
                            ))
                        ) : (
                            <h3>No comment</h3>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Comments;
