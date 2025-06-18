import { API_URL } from "../constants"
import { CloseCircleOutlined } from "@ant-design/icons"
import { notification } from "antd"

class AjaxService {

    getUrl = (url, id = null) => id === null ? API_URL + url : API_URL + url + id

    async get(url) {
        const token = localStorage.getItem('token');


        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        let options = { method: 'GET', headers: headers }

        return fetch(this.getUrl(url), options)
            .then(async (response) => {

                if (response.ok) {
                    return response.json()
                } else {
                    const result = await response.json();
                    if (result.message) {

                        // unauthenticated
                        if (result.message === "Unauthenticated") {
                            localStorage.clear();
                            window.location.reload(true);
                            notification.open({ message: result.message, icon: <CloseCircleOutlined style={{ color: 'red' }} /> })
                        }

                    }

                    return result;
                }
            })
            .then(data => {
                return data;
            })
            .catch(async error => {
                console.error("error get data:", error);
                notification.error({
                    message: "Error getting data!",
                    description: error,
                    placement: "topRight"
                })
            })
    }

    async delete(url, id) {

        const token = localStorage.getItem('token');

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        let options = { method: 'DELETE', headers: headers }

        return fetch(this.getUrl(url) + id, options)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error("error deleting data:", error)
            })
    }

    async post(url, data = null, id = null) {
        const token = localStorage.getItem('token');

        const isFormData = data instanceof FormData;

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        if (isFormData) {
            delete headers['Content-Type'];
        }

        return fetch(this.getUrl(url, id), {
            method: 'POST',
            headers: headers,
            body: isFormData ? data : JSON.stringify(data)
        })
            .then(async (response) => {
                if (response.ok) {
                    // Check content type to determine how to handle the response
                    const contentType = response.headers.get('Content-Type');

                    if (contentType.includes('application/json')) {
                        return response.json();
                    } else {
                        // Handle other content types if necessary
                        return response.blob();
                    }
                } else {
                    const result = await response.json();
                    return result;
                }
            })
            .catch(error => {
                console.error("Error posting data:", error);
                return { success: false, message: 'An error occurred while processing the request' };
            });
    }


    async put(url, id, data) {

        const token = localStorage.getItem('token');

        const isFormData = data instanceof FormData;


        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        if (isFormData) {
            delete headers['Content-Type'];
        }

        return fetch(this.getUrl(url) + id, {
            method: 'PUT',
            headers: headers,
            body: isFormData ? data : JSON.stringify(data)
        })
            .then(async (response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    const result = await response.json();
                    return result;
                }
            })
            .then(result => {
                return result
            }).catch(error => {
                console.error("error put data:", error)
            })
    }
}

const ajaxService = new AjaxService()

export default ajaxService