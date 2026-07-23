import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TripService from "../services/TripService";

function AddTrip() {

    const navigate = useNavigate();

    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const [trip, setTrip] = useState({
        userId: loggedUser.loginId,
        tripName: "",
        destination: "",
        startDate: "",
        endDate: "",
        budget: "",
        travelers: "",
        status: "PLANNED"
    });

    function handleChange(e) {

        const { name, value } = e.target;

        setTrip({
            ...trip,
            [name]: value
        });

    }

    async function saveTrip(e) {

        e.preventDefault();

        try {

            await TripService.addTrip(trip);

            alert("Trip Added Successfully");

            navigate("/trips");

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <div>

            <h1>Add Trip</h1>

            <form onSubmit={saveTrip}>

                <input
                    type="text"
                    name="tripName"
                    placeholder="Trip Name"
                    value={trip.tripName}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={trip.destination}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="date"
                    name="startDate"
                    value={trip.startDate}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="date"
                    name="endDate"
                    value={trip.endDate}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="budget"
                    placeholder="Budget"
                    value={trip.budget}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="travelers"
                    placeholder="Travelers"
                    value={trip.travelers}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Save Trip
                </button>

            </form>

        </div>

    );

}

export default AddTrip;