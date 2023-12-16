// ApiProvider.js
import { createContext, useContext } from "react";
import axios from "axios";

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

const ApiProvider = ({ children }) => {
    const api = axios.create({
        baseURL: "http://127.0.0.1:8000/api" // Your API base URL
    });



    const makeRequest = async (method, url, data, config) => {
        try {
            const response = await api[method](url, data, config);
            return response.data;
        } catch (error) {
            // Add your error handling logic here
            console.error("API call error:", error);
            throw error;
        }
    };

    const GET = (url, config) => makeRequest('get', url, null, config);
    const POST = (url, data, config) => makeRequest('post', url, data, config);
    const PUT = (url, data, config) => makeRequest('put', url, data, config);
    const DELETE = (url, config) => makeRequest('delete', url, null, config);

    return (
        <ApiContext.Provider value={{ GET, POST, PUT, DELETE }}>
            {children}
        </ApiContext.Provider>
    );
};

export { ApiProvider };
