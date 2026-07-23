import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {

        const user = localStorage.getItem("user");

        if (!user) {
            navigate("/");
        }

    }, []);

    const user = JSON.parse(localStorage.getItem("user"));

    function logout() {

        localStorage.removeItem("user");

        navigate("/");

    }

    return (

        <div>

            <h1>Dashboard</h1>

            <h2>Welcome {user?.email}</h2>

            <h3>Role : {user?.role}</h3>

            <br />

            <button onClick={logout}>
                Logout
            </button>

        </div>

    );

}

export default Dashboard;