import axios from 'axios';

const getConfig = () => {
    return {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"

        }
    }
}

var headers = getConfig();

export const callGet = async (url) => {
    try {
        const response = await axios.get(url, headers);
        return response;
    } catch (error) {
        return error;
    }
}

export const callPost = async (url, request) => {
    try {
        const response = await axios.post(url, request, headers);
        return response;
    } catch (error) {
        return error;
    }
}

export const callDelete = async (url) => {
    try {
        const response = await axios.delete(url, headers);
        return response;
    } catch (error) {
        return error;
    }
}

export const callPut = async (url, request) => {
    try {
        const response = await axios.put(url, request, headers);
        return response;
    } catch (error) {
        return error;
    }
}