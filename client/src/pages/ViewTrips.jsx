import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TripService from "../services/TripService";

function ViewTrips() {

    const navigate = useNavigate();

    const loggedUser = JSON.parse(localStorage.getItem("user"));

    const [trips, setTrips] = useState([]);

    useEffect(() => {

        loadTrips();

    }, []);

    async function loadTrips() {

        try {

            const response = await TripService.getTrips(loggedUser.loginId);

            setTrips(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    async function deleteTrip(id) {

        if (window.confirm("Delete this trip?")) {

            await TripService.deleteTrip(id);

            loadTrips();

        }

    }

    return (

        <div>

            <h1>My Trips</h1>

            <button onClick={() => navigate("/add-trip")}>
                Add New Trip
            </button>

            <br /><br />

            <table border="1" cellPadding="10">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Trip</th>
                        <th>Destination</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Budget</th>
                        <th>Travelers</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        trips.map((trip) => (

                            <tr key={trip.tripId}>

                                <td>{trip.tripId}</td>

                                <td>{trip.tripName}</td>

                                <td>{trip.destination}</td>

                                <td>{trip.startDate}</td>

                                <td>{trip.endDate}</td>

                                <td>{trip.budget}</td>

                                <td>{trip.travelers}</td>

                                <td>{trip.status}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            navigate("/edit-trip/" + trip.tripId)
                                        }
                                    >
                                        Edit
                                    </button>

                                    &nbsp;

                                    <button
                                        onClick={() => deleteTrip(trip.tripId)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default ViewTrips;