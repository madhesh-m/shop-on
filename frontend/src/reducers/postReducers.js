import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  ADD_COMMENT,
} from "../constants/cartConstants";

export const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case FETCH_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        title: action.payload.title,
        content: action.payload.content,
        author: action.payload.author,
        comments: action.payload.comments,
        loading: false,
        error: null,
      };
    case FETCH_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload.comment],
      };
    default:
      return state;
  }
};
