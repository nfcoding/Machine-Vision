import axios from "axios";

const getUsersApi = (page, limit) => {
  return axios.get(`${process.env.REACT_APP_API}user?page=${page}&limit=${limit}&created=1`, {
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
    },
  });
};

const getUserApi = (id) => {
  return axios.get(`${process.env.REACT_APP_API}user/${id}`, {
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
    },
  });
};

const postUserApi = (payload) => {
  return axios.post(`${process.env.REACT_APP_API}user/create`, payload, {
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
    },
  });
};

const putUserApi = (id, payload) => {
  return axios.post(`${process.env.REACT_APP_API}user/${id}`, payload, {
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
    },
  });
};

const deleteUserApi = (id) => {
  return axios.post(`${process.env.REACT_APP_API}user/${id}`, {
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
    },
  });
};

export { getUsersApi, getUserApi, postUserApi, putUserApi, deleteUserApi };
