import axios from "axios";

const BASE_URL = "http://localhost:8080/api/search";

class SearchService {

  search(city) {

    return axios.get(BASE_URL + "?city=" + city);

  }

}

export default new SearchService();