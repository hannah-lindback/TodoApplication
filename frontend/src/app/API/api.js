import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
    });

export const getTodos = async () => {
    const response = await api.get('/api/todos');
    return response.data;
    };