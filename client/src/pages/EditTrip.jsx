import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TripService from "../services/TripService";

function EditTrip() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [trip, setTrip] = useState({});

    useEffect(() => {

        loadTrip();

    }, []);

    async function loadTrip() {

        const response = await TripService.getTrip(id);

        setTrip(response.data);

    }

    function handleChange(e) {

        setTrip({
            ...trip,
            [e.target.name]: e.target.value
        });

    }

    async function updateTrip(e) {

        e.preventDefault();

        await TripService.updateTrip(trip);

        alert("Trip Updated Successfully");

        navigate("/trips");

    }

    return (

        <div>

            <h1>Edit Trip</h1>

            <form onSubmit={updateTrip}>

                <input
                    type="text"
                    name="tripName"
                    value={trip.tripName || ""}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="destination"
                    value={trip.destination || ""}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="date"
                    name="startDate"
                    value={trip.startDate || ""}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="date"
                    name="endDate"
                    value={trip.endDate || ""}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="budget"
                    value={trip.budget || ""}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="number"
                    name="travelers"
                    value={trip.travelers || ""}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Update Trip
                </button>

            </form>

        </div>

    );

}

export default EditTrip;