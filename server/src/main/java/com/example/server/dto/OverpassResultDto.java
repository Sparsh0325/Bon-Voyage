package com.example.server.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OverpassResultDto {

    private List<OverpassResponseDto> elements;

    public OverpassResultDto() {
    }

    public List<OverpassResponseDto> getElements() {
        return elements;
    }

    public void setElements(List<OverpassResponseDto> elements) {
        this.elements = elements;
    }

}