import axios from "axios";

const movieAPI = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json"
  }
});

export default movieAPI;