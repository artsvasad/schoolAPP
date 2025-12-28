const BASE_URL = import.meta.env.VITE_API_URL


const request = async (endpoint, method, body = null) => {
    const token = localStorage.getItem('token')

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }

            )
        }
    }
    if (body) {
        options.body = JSON.stringify(body)
    }
    return fetch(`${BASE_URL}/${endpoint}`, options)
}

export const api = {
    get: (endpoint) => request(endpoint, 'GET'),
    post: (endpoint, body) => request(endpoint, 'POST', body),
    put: (endpoint, body) => request(endpoint, 'PUT', body),
    patch: (endpoint, body) => request(endpoint, 'PATCH', body),
    delete: (endpoint) => request(endpoint, 'DELETE'),
}