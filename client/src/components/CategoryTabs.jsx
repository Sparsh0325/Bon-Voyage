import { NavLink } from "react-router-dom";

function CategoryTabs() {

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                marginTop: "25px",
                marginBottom: "20px"
            }}
        >

            <NavLink
                to="/home"
                style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#4285F4" : "black",
                    fontWeight: "bold",
                    fontSize: "18px"
                })}
            >
                Places
            </NavLink>

            <NavLink
                to="/hotels"
                style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#4285F4" : "black",
                    fontWeight: "bold",
                    fontSize: "18px"
                })}
            >
                Hotels
            </NavLink>

            <NavLink
                to="/restaurants"
                style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#4285F4" : "black",
                    fontWeight: "bold",
                    fontSize: "18px"
                })}
            >
                Restaurants
            </NavLink>

            <NavLink
                to="/planner"
                style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#4285F4" : "black",
                    fontWeight: "bold",
                    fontSize: "18px"
                })}
            >
                AI Planner
            </NavLink>

        </div>

    );

}

export default CategoryTabs;