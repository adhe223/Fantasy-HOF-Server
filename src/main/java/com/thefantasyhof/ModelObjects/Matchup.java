package com.thefantasyhof.ModelObjects;

public class Matchup {
    private String awayOwner;
    private String homeOwner;
    private double awayPoints;
    private double homePoints;
    private Boolean isPlayoffs;
    private String year;

    public Matchup(String awayOwner, String homeOwner, double awayPoints, double homePoints, Boolean isPlayoffs, String year) {
        this.awayOwner = awayOwner;
        this.homeOwner = homeOwner;
        this.awayPoints = awayPoints;
        this.homePoints = homePoints;
        this.isPlayoffs = isPlayoffs;
        this.year = year;
    }

    // <editor-fold desc="Getters/Setters">
    public String getAwayOwner() {
        return awayOwner;
    }
    public void setAwayOwner(String awayOwner) {
        this.awayOwner = awayOwner;
    }
    public String getHomeOwner() {
        return homeOwner;
    }
    public void setHomeOwner(String homeOwner) {
        this.homeOwner = homeOwner;
    }
    public double getAwayPoints() {
        return awayPoints;
    }
    public void setAwayPoints(double awayPoints) {
        this.awayPoints = awayPoints;
    }
    public double getHomePoints() {
        return homePoints;
    }
    public void setHomePoints(double homePoints) {
        this.homePoints = homePoints;
    }
    public Boolean getPlayoffs() {
        return isPlayoffs;
    }
    public void setPlayoffs(Boolean playoffs) {
        isPlayoffs = playoffs;
    }
    public String getYear() {
        return year;
    }
    public void setYear(String year) {
        this.year = year;
    }
    // </editor-fold>

    public Boolean hasOwner(String owner) {
        return(awayOwner.equals(owner) || homeOwner.equals(owner));
    }
}
