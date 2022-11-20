// Axios instances

import axios, {AxiosResponse} from "axios";

/**
 * Axios to be used for authorized requests.
 * Interceptor will be attached or error thrown when not logged in.
 */
const http = axios.create({
    baseURL: `http://131.159.210.5:8080/api`,
    headers: {
        'Content-type': 'application/json',
    }
});

/**
 * Helper function to easily parse response.
 */
const parseResponse = <T>(response: AxiosResponse<T>): Promise<T> => {
    let data = response.data;
    if (data) {
        return Promise.resolve(data);
    } else {
        return Promise.reject('Could not parse response');
    }
}

const getRequest = <T>(url: string): Promise<T> => {
    return http.get<T>(url).then(parseResponse);
}

const postRequest = <T>(url: string, data: any): Promise<T> => {
    return http.post<T>(url, data).then(parseResponse);
}


// Export
export const Requests = {
    getRequest,
    postRequest
};