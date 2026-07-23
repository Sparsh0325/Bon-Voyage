package com.example.server.service;

import com.example.server.dto.NominatimResponseDto;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class NominatimService {

    private final RestClient restClient;

    public NominatimService(RestClient restClient) {
        this.restClient = restClient;
    }

    public NominatimResponseDto searchCity(String city) {

        String url =
                "https://nominatim.openstreetmap.org/search?format=json&q="
                        + city +
                        "&limit=1";

        List<NominatimResponseDto> response =
                restClient.get()
                        .uri(url)
                        .header("User-Agent", "TravelMateAI")
                        .retrieve()
                        .body(new ParameterizedTypeReference<List<NominatimResponseDto>>() {});

        if (response == null || response.isEmpty()) {
            return null;
        }

        return response.get(0);

    }

}