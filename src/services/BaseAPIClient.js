import axios from 'axios'
import qs from 'qs'
import set from 'lodash/set'

class BaseAPIClient {
    client

    constructor({
        apiEndpoint,
        defaultTimeout,
    }) {
        this.client = axios.create({
            baseURL: apiEndpoint,
            timeout: defaultTimeout,
        })

        this.client.interceptors.request.use(async requestConfig => {

            const token = localStorage.getItem('user')

            if (requestConfig.headers && token) {
                requestConfig.headers['Authorization'] = `Bearer ${token}`
            }

            return requestConfig
        })
    }

    async fetch({
        body,
        cancelToken,
        headers,
        method,
        params,
        path,
        type = 'application/json',
        additionalConfig,
    }) {
        console.log(path);
        console.log(method);


        const request = {
            ...additionalConfig,
            cancelToken,
            headers,
            method,
            params,
            url: path,
        }

        if (
            ["POST", "PUT", "PATCH"].includes(
                method
            )
        ) {
            switch (type) {
                case 'form':
                    set(request, ['headers', 'content-type'], 'application/x-www-form-urlencoded')
                    request.data = qs.stringify(body, { allowDots: true })
                    break
                case 'multipart':
                    set(request, ['headers', 'content-type'], 'multipart/form-data')
                    const formData = new FormData()

                    Object.entries(body).forEach(([key, values]) => {
                        formData.append(key, values)
                    })
                    request.data = formData
                    break
                default:
                    request.data = body
                    break
            }
        }

        const response = await this.client.request(request)
        return response.data
    }
}

export default BaseAPIClient