package com.example.server.service;

import com.example.server.dto.OverpassResultDto;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class OverPassService {

    private final RestClient restClient;

    public OverPassService(RestClient restClient) {
        this.restClient = restClient;
    }

    private OverpassResultDto executeQuery(String query) {

        return restClient.post()
                .uri("http://overpass-api.de/api/interpreter")
                .header("Content-Type", "text/plain")
                .body(query)
                .retrieve()
                .body(OverpassResultDto.class);

    }

    public OverpassResultDto searchAttractions(double lat, double lon) {

            String query = String.format("""
                [out:json][timeout:20];
                (
                    node["tourism"="attraction"](around:1500,%f,%f);
                    node["tourism"="museum"](around:1500,%f,%f);
                    node["tourism"="viewpoint"](around:1500,%f,%f);
                    node["historic"](around:1500,%f,%f);
                );
                out body;
                """,
                lat, lon,
                lat, lon,
                lat, lon,
                lat, lon);

            return executeQuery(query);
        }

    public OverpassResultDto searchHotels(double lat, double lon) {

        String query = String.format("""
                [out:json][timeout:20];
                (
                  node["tourism"="hotel"](around:2500,%f,%f);
                );
                out body 30;
                """, lat, lon);

        return executeQuery(query);

    }

    public OverpassResultDto searchRestaurants(double lat, double lon) {

        String query = String.format("""
            [out:json][timeout:20];
            (
            node["amenity"="restaurant"](around:1000,%f,%f);
            way["amenity"="restaurant"](around:1000,%f,%f);
            );
            out center 30;
            """,
            lat, lon,
            lat, lon);

        return executeQuery(query);

    }

}