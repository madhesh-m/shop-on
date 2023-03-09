import axios from 'axios'
import {
    FETCH_POST_REQUEST,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILURE,
    ADD_COMMENT,
  } from "../constants/postConstants";

export const fetchPostRequest = () => {
  return {
    type: FETCH_POST_REQUEST,
  };
};

export const fetchPostSuccess = (post) => {
  return {
    type: FETCH_POST_SUCCESS,
    payload: {
      id: post.id,
      title: post.title,
      description: post.description,
      author: post.author,
      comments: post.comments,
      created_at:post.created_at
    },
  };
};

export const fetchPostFailure = (error) => {
  return {
    type: FETCH_POST_FAILURE,
    payload: {
      error,
    },
  };
};

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: {
      comment,
    },
  };
};


export const fetchPost = (postId) => {
  return async (dispatch) => {
    dispatch(fetchPostRequest());

    try {
      const response = await axios.get(`/api/forum/${postId}`);
      const data = await response.json();
      dispatch(fetchPostSuccess(data));
    } catch (error) {
      dispatch(fetchPostFailure(error.message));
    }
  };
};

export const addCommentToPost = (postId, comment) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/forum/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });
      const data = await response.json();
      dispatch(addComment(data));
    } catch (error) {
      console.log(error);
    }
  };
};
