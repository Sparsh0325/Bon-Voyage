package com.example.server.service;

import com.example.server.dto.OverpassResponseDto;
import com.example.server.dto.OverpassResultDto;
import com.example.server.dto.PlaceDto;

import java.util.ArrayList;
import java.util.List;

public class PlaceMapper {

    public static List<PlaceDto> map(OverpassResultDto result, String type) {

        List<PlaceDto> places = new ArrayList<>();

        if(result==null || result.getElements()==null){
            return places;
        }

        for(OverpassResponseDto element : result.getElements()){

            if(element.getTags()==null){
                continue;
            }

            String name = element.getTags().get("name");

            if(name==null || name.isBlank()){
                continue;
            }

            PlaceDto place = new PlaceDto();

            place.setName(name);
            place.setType(type);
            place.setAddress("");
            place.setLatitude(element.getLat());
            place.setLongitude(element.getLon());

            places.add(place);

        }

        return places;

    }

}