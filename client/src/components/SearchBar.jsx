import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function SearchBar() {

    const { search, setSearch } = useContext(SearchContext);

    return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "30px"
            }}
        >

            <h1>TravelMate AI</h1>

            <div
                style={{
                    display: "flex",
                    gap: "10px"
                }}
            >

                <input

                    type="text"

                    placeholder="Search Destination"

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    style={{

                        width: "600px",

                        height: "50px",

                        borderRadius: "30px",

                        paddingLeft: "20px",

                        fontSize: "18px"

                    }}

                />

            </div>

        </div>

    );

}

export default SearchBar;