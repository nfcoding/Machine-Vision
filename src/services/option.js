import axios from "axios";

const optionUserApi = () => {
  return axios.get(`${process.env.REACT_APP_API}user?created=1`, {
    headers: {
      "app-id": "62996cb2689bf0731cb00285",
    },
  });
};

export { optionUserApi };
