import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const ForumScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const author = userInfo.name;

  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [searchPost, setSearchPost] = useState([]);

  const getPosts = async () => {
    const res = await fetch("/api/forum/");
    let data = await res.json();
    setPost(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/forum/posts", {
        author,
        title,
        description,
      });
      setTitle("");
      setDescription("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setFailure(true);
      setTimeout(() => setFailure(false), 3000);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`/api/forum/posts/t/${search}`);
      let data = await res.json();
      setSearchPost(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {success && (
        <Message variant="success">post created successfully</Message>
      )}
      {failure && <Message variant="danger">Error creating Discussion</Message>}
      <div class="container border border-primary rounded m-2">
        <form class="m-3" onSubmit={handleSubmit}>
          <div>
            <h3 class="position-relative">Create New Discussion</h3>
          </div>
          <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label">
              Title
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Enter the Query Title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="desc" class="col-sm-2 col-form-label">
              Description
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="desc"
                placeholder="Description goes here...."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-10">
              <button type="submit" class="btn btn-primary">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="container border border-secondary rounded m-2">
        <nav class="navbar navbar-light bg-secondary justify-content-between border-bottom">
          <h3 class="navbar-brand"> Recent Discussions</h3>
          <form class="form-inline">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              class="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </nav>
        {search.length === 0
          ? post.length >= 5 &&
            post.slice(0, 5).map((item) => {
              return (
                <div className="m-2 p-2 border border-secondary">
                  <Link to={`/postdetails/${item._id}`} className="m-2 p-2">
                    <div className="row justify-content-center">
                      <div className="col-4">
                        <i className="fas fa-user"></i> {item.author}
                      </div>
                      <div className="col-4">Title: {item.title}</div>
                      <div className="col-4">
                        Comments:{item.comments.length}
                      </div>
                      <div className="col-4">
                        Posted on:{item.created_at.substring(0, 10)}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          : searchPost.map((item) => {
              return (
                <div className="m-2 p-2 border border-secondary">
                  <Link to={`/postdetails/${item._id}`} className="m-2 p-2">
                    <div className="row justify-content-center">
                      <div className="col-4">
                        <i className="fas fa-user"></i> {item.author}
                      </div>
                      <div className="col-4">Title: {item.title}</div>
                      <div className="col-4">
                        Comments:{item.comments.length}
                      </div>
                      <div className="col-4">
                        Posted on:{item.created_at.substring(0, 10)}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default ForumScreen;
