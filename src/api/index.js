import axios from "axios";

export const ApiUrl = axios.create({
    baseURL: "http://localhost:5000"
})
export default ApiUrl;