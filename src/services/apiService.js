import { API_CONFIG } from "../utils/constants";

const API_BASE_URL = API_CONFIG.BASE_URL;

async function request(endpoint, options = {}) {

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,

            headers: {
                "Content-Type": "application/json",
                ...options.headers
            }
        }
    );

    if (!response.ok) {

        throw new Error(
            `API Error: ${response.status}`
        );

    }

    return response.json();

}

export const apiService = {

    get(endpoint) {

        return request(endpoint);

    },

    post(endpoint, data) {

        return request(endpoint, {

            method: "POST",

            body: JSON.stringify(data)

        });

    },

    put(endpoint, data) {

        return request(endpoint, {

            method: "PUT",

            body: JSON.stringify(data)

        });

    },

    delete(endpoint) {

        return request(endpoint, {

            method: "DELETE"

        });

    }

};