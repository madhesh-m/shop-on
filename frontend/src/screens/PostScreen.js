import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import axios from "axios";

const PostScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const author = userInfo.name;

  const { id } = useParams();
  const [post, setPost] = useState();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    const getPost = async () => {
      axios.get(`https://shopon-c3o1.onrender.com/api/forum/posts/${id}`).then((res) => {
        setPost(res.data);
      });
    };
    getPost();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`https://shopon-c3o1.onrender.com/api/forum/posts/${id}/comments`, {
        author,
        content: newComment,
      });
      setNewComment("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setFailure(true);
      setTimeout(() => setFailure(false), 3000);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3 border-rounded" to="/forum">
        Go Back
      </Link>
      <div className="container">
        <div className=" row mt-2">
          <div className="col">
            <div class="card">
              <h5 class="card-header">
                <i className="fas fa-user"></i> {post && post.author}
              </h5>
              <h6 class="card-header">
                Posted on:{post && post.created_at.substring(0, 10)}
              </h6>
              <div class="card-body">
                <h5 class="card-title border w-25 text-center border-dark border-rounded rounded rounded-4 bg-dark text-light">
                  {post && post.title}
                </h5>
                <p class="card-text">{post && post.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" row mt-2">
          <div className="col">
            <h3>Comments</h3>
            <div class="container border rounded">
              {
                post && post.comments.length === 0 ? (
                <div className="text center">No Comments yet </div>
                ):(
              post && 
                post.comments.map((comment) => (
                  <div className=" card mt-4 mb-4">
                    <h6 class="card-header">
                      Posted on:{comment.created_at.substring(0, 10)}
                    </h6>
                    <div class="card-body p-2">
                      <span class=" justify-content-center"><i className="fas fa-user"></i> {comment.author} </span>
                       : {comment.content}
                    </div>
                  </div>
                )))}
            </div>
          </div>
        </div>
        {success && (
          <Message variant="success">comment added successfully</Message>
        )}
        {failure && <Message variant="danger">Error adding comment</Message>}
        <div className=" row mt-4">
          <div className="col">
            <h3>Add Comment</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formComment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your comment here"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostScreen;
