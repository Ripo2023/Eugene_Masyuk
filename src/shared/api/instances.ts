import axios from "axios";

const BASE_URL = "http://worldskills-eugene-masyuk.ru/api/"

export const instance = axios.create({
    baseURL: BASE_URL
})

const instanceConfig = {
    headers: {
        "Content-Type": "text/html"
    }
}

export const instanceAPI = axios.create({
    baseURL: BASE_URL,
    ...instanceConfig,
})