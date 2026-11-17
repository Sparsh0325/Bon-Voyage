# Bon Voyage

Bon Voyage is a travel planning web application for discovering places, hotels, and restaurants, organizing trips, and building day-by-day itineraries. It includes a travel assistant chatbot and profile, saved-place, and booking views.

## Features

- Register and sign in to the application.
- Search attractions, hotels, and restaurants by city. Place results are enriched with Geoapify location data, Pexels images, and Wikipedia summaries.
- Create and manage trips, add activities to itinerary days, and track trip budgets.
- Chat with TravelMate AI for travel suggestions. The client calls Pollinations AI; chat history can be stored by the backend.
- Browse trip, profile, saved-place, booking, and group-planning views.

## Technology

- **Frontend:** React 19, Vite, React Router, Axios
- **Backend:** Java 25, Spring Boot 4, Spring Web, Spring Data JPA, Spring Security
- **Database:** MySQL (PostgreSQL driver is also included)
- **External services:** Geoapify, Pexels, Wikipedia, Pollinations AI

## Requirements

- Git
- Node.js and npm (use a version supported by the installed Vite release)
- JDK 25
- MySQL Server
- Geoapify and Pexels API keys for live place-search enrichment

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/Sparsh0325/Bon-Voyage.git
cd Bon-Voyage
```

### 2. Create the database

Start MySQL and create the database:

```sql
CREATE DATABASE bon_voyage;
```

The application uses Spring Data JPA with Hibernate schema updates enabled, so tables are created/updated when the backend starts.

### 3. Configure the backend

The backend reads its database and service settings from Spring Boot properties. Set these environment variables before starting it; never commit real credentials or API keys:

| Environment variable | Purpose |
| --- | --- |
| `SPRING_DATASOURCE_URL` | JDBC URL, for example `jdbc:mysql://localhost:3306/bon_voyage` |
| `SPRING_DATASOURCE_USERNAME` | MySQL username |
| `SPRING_DATASOURCE_PASSWORD` | MySQL password |
| `GEOAPIFY_API_KEY` | Geoapify geocoding and places API key |
| `PEXELS_API_KEY` | Pexels image search API key |

For PowerShell, for example:

```powershell
$env:SPRING_DATASOURCE_URL = "jdbc:mysql://localhost:3306/bon_voyage"
$env:SPRING_DATASOURCE_USERNAME = "root"
$env:SPRING_DATASOURCE_PASSWORD = "your-local-password"
$env:GEOAPIFY_API_KEY = "your-geoapify-key"
$env:PEXELS_API_KEY = "your-pexels-key"
```

Run the Spring Boot API from the `server` directory:

```bash
cd server
./mvnw spring-boot:run
```

If the Maven wrapper is not present, use an installed Maven version instead:

```bash
mvn spring-boot:run
```

The API listens on `http://localhost:8080`.

### 4. Start the frontend

In a second terminal, from the repository root:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`). The frontend currently calls the backend at `http://localhost:8080`.

## Project layout

```text
Bon-Voyage/
├── client/   # React and Vite application
└── server/   # Spring Boot REST API and persistence layer
```

## Notes

- Place, hotel, and restaurant search requires valid Geoapify and Pexels API keys. Some client views may show fallback/sample content when the API is unavailable.
- The chatbot calls Pollinations AI directly from the browser and does not require a backend AI key.
- Configure secrets through environment variables or a local, untracked configuration file. Rotate any credentials that have previously been committed to a public repository.
- The `AIPlanner` page currently presents a placeholder; itinerary creation and activity management are implemented through the trip and itinerary flows.
