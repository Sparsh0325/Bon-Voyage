function PlaceCard({ place }) {

    return (

        <div

            style={{

                display: "flex",

                width: "850px",

                margin: "20px auto",

                border: "1px solid #ddd",

                borderRadius: "15px",

                overflow: "hidden",

                boxShadow: "0px 3px 10px rgba(0,0,0,.15)"

            }}

        >

            <img

                src={place.image}

                alt={place.name}

                style={{

                    width: "250px",

                    height: "180px",

                    objectFit: "cover"

                }}

            />

            <div
                style={{
                    padding: "20px"
                }}
            >

                <h2>{place.name}</h2>

                <h3>⭐ {place.rating}</h3>

                <h4>{place.status}</h4>

            </div>

        </div>

    );

}

export default PlaceCard;