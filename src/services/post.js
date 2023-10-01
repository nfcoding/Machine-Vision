import axios from "axios";

const getPostsApi = (page, limit) => {
  return axios.get(`${process.env.REACT_APP_API}post?page=${page}&limit=${limit}&created=1`, {
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
    },
  });
};

const getPostApi = (id) => {
  return axios.get(`${process.env.REACT_APP_API}post/${id}`, {
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
    },
  });
};

const getPostByTagApi = (page, limit, keyword) => {
  return axios.get(`${process.env.REACT_APP_API}tag/${keyword}/post?page=${page}&limit=${limit}&created=1`, {
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
    },
  });
};

const postPostApi = (payload) => {
  return axios.post(`${process.env.REACT_APP_API}post/create`, payload, {
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
    },
  });
};

const putPostApi = (id, payload) => {
  return axios.put(`${process.env.REACT_APP_API}post/${id}`, payload, {
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
    },
  });
};

const deletePostApi = (id) => {
  return axios.delete(`${process.env.REACT_APP_API}post/${id}`, {
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
    },
  });
};

export { getPostsApi, getPostApi, postPostApi, putPostApi, deletePostApi, getPostByTagApi };
