import { API_URL } from "../constants";
import { validationErrors } from "../utils";
import ajaxService from "./ajax-service";

class AuthService {
    async loginPost(email, password, remember) {
        const data = {
            email: email,
            password: password,
            remember: remember,
            grant_type: 'password'
        };

        const uri = `${API_URL}/auth/login`;  
        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch(uri, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
                // credentials: 'include',
                withCredentials: true
            });

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                const errorData = await response.json();
                return errorData;
            } else {
                const responseData = await response.json();
                return responseData;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            return { error: "Network error" };
        }
       
    }

    async signUpPost(data) {
        const response = await ajaxService.post('/auth/register', data)
        if (response?.success ?? false) {
            return response;
        } else {
            const errors = response.data.errors;
            return validationErrors(errors)
        }
    }


}
const authService = new AuthService()

export default authService