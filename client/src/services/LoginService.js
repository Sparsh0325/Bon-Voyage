import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

class LoginService {

    register(user) {
        return axios.post(BASE_URL + "/register", user);
    }

    login(loginDto) {
        return axios.post(BASE_URL + "/login", loginDto);
    }

}

export default new LoginService();