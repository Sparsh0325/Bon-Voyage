package com.example.server.service;

import com.example.server.dto.NominatimResponseDto;
import com.example.server.dto.PlaceDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    private final NominatimService nominatimService;
    private final OverPassService overPassService;

    public SearchService(NominatimService nominatimService,
                         OverPassService overPassService) {

        this.nominatimService = nominatimService;
        this.overPassService = overPassService;

    }

    private double[] getCoordinates(String city){

        NominatimResponseDto dto =
                nominatimService.searchCity(city);

        return new double[]{
                Double.parseDouble(dto.getLatitude()),
                Double.parseDouble(dto.getLongitude())
        };

    }

    public List<PlaceDto> getAttractions(String city){

        double[] location = getCoordinates(city);

        return PlaceMapper.map(

                overPassService.searchAttractions(
                        location[0],
                        location[1]
                ),

                "Attraction"

        );

    }

    public List<PlaceDto> getHotels(String city){

        double[] location = getCoordinates(city);

        return PlaceMapper.map(

                overPassService.searchHotels(
                        location[0],
                        location[1]
                ),

                "Hotel"

        );

    }

    public List<PlaceDto> getRestaurants(String city){

        double[] location = getCoordinates(city);

        return PlaceMapper.map(

                overPassService.searchRestaurants(
                        location[0],
                        location[1]
                ),

                "Restaurant"

        );

    }

}