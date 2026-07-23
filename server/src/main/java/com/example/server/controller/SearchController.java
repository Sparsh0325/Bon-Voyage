package com.example.server.controller;

import com.example.server.dto.PlaceDto;
import com.example.server.service.SearchService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/places")
    public List<PlaceDto> places(@RequestParam String city){
        return searchService.getAttractions(city);
    }

    @GetMapping("/hotels")
    public List<PlaceDto> hotels(@RequestParam String city){
        return searchService.getHotels(city);
    }

    @GetMapping("/restaurants")
    public List<PlaceDto> restaurants(@RequestParam String city){
        return searchService.getRestaurants(city);
    }

}