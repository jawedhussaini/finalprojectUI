import axios from "axios";
import { getToken } from "./utill/helpers";

export const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
            authorization: `Bearer ${getToken()}`,
          },
});