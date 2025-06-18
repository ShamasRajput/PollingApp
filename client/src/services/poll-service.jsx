import { validationErrors } from "../utils";
import ajaxService from "./ajax-service";


class PollService {
    //public API
    async fetchAll() {
        const response = await ajaxService.get(`/polls`)
        if (response?.success ?? false) {
            return response;
        } else {
            return validationErrors(response.message)
        }
    }

    async vote(pollId, optionId) {
        const response = await ajaxService.post(`/polls/${pollId}/vote`, { optionId })
        if (response?.success ?? false) {
            return response
        } else {
            return validationErrors(response.message)
        }
    }


    //protected Routes
    async fetch() {
        const response = await ajaxService.get(`/polls/me`)
        if (response?.success ?? false) {
            return response;
        } else {
            return validationErrors(response.message)
        }
    }
    async add(data) {
        // for (let [key, value] of data.entries()) {
        //     console.log(`${key}:`, value);
        // }
        const response = await ajaxService.post(`/polls`, data)
        if (response?.success ?? false) {
            return response;
        } else {
            return validationErrors(response.message)
        }
    }
    async update(id, data) {
        const response = await ajaxService.put(`/polls/`, id, data)
        if (response?.success ?? false) {
            return response;
        } else {
            return validationErrors(response.message)
        }
    }
    async delete(id) {
        const response = await ajaxService.delete(`/polls/`, id)
        if (response?.success ?? false) {
            return response;
        } else {
            return validationErrors(response.message)
        }
    }
}


const pollService = new PollService();
export default pollService