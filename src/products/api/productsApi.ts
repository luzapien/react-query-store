import axios from "axios"


const productsApi = axios.create({
  baseURL: "http://localhost:9000/api",
  withCredentials: true
})

export { productsApi }
