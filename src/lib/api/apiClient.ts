import axios from "axios";


export const ApiClient = axios.create({
  baseURL: process.env.BASE_URL,
});