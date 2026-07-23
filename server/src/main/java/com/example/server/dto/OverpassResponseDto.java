package com.example.server.dto;

import java.util.Map;

public class OverpassResponseDto {

    private double lat;
    private double lon;

    private Center center;

    private Map<String, String> tags;

    public double getLat() {

        if (lat != 0) {
            return lat;
        }

        if (center != null) {
            return center.getLat();
        }

        return 0;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {

        if (lon != 0) {
            return lon;
        }

        if (center != null) {
            return center.getLon();
        }

        return 0;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public Center getCenter() {
        return center;
    }

    public void setCenter(Center center) {
        this.center = center;
    }

    public Map<String, String> getTags() {
        return tags;
    }

    public void setTags(Map<String, String> tags) {
        this.tags = tags;
    }

    public static class Center {

        private double lat;
        private double lon;

        public double getLat() {
            return lat;
        }

        public void setLat(double lat) {
            this.lat = lat;
        }

        public double getLon() {
            return lon;
        }

        public void setLon(double lon) {
            this.lon = lon;
        }

    }

}