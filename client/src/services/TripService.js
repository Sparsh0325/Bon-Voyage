import axios from "axios";

const BASE_URL = "http://localhost:8080/api/trips";

class TripService {

    addTrip(trip) {
        return axios.post(BASE_URL, trip);
    }

    getTrips(userId) {
        return axios.get(BASE_URL + "/user/" + userId);
    }

    getTrip(id) {
        return axios.get(BASE_URL + "/" + id);
    }

    updateTrip(trip) {
        return axios.put(BASE_URL, trip);
    }

    deleteTrip(id) {
        return axios.delete(BASE_URL + "/" + id);
    }

}

export default new TripService();