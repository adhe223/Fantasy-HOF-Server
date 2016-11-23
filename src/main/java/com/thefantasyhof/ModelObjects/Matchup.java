package com.thefantasyhof.ModelObjects;

public class Matchup {
    private String awayOwner;
    private String awayTeamName;
    private String homeOwner;
    private String homeTeamName;
    private double awayPoints;
    private double homePoints;
    private Boolean isPlayoffs;
    private String year;

    public Matchup(String awayOwner, String awayTeamName, String homeOwner, String homeTeamName, double awayPoints, double homePoints, Boolean isPlayoffs, String year) {
        this.awayOwner = awayOwner;
        this.awayTeamName = awayTeamName;
        this.homeOwner = homeOwner;
        this.homeTeamName = homeTeamName;
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

    public String getAwayTeamName() {
        return awayTeamName;
    }

    public void setAwayTeamName(String awayTeamName) {
        this.awayTeamName = awayTeamName;
    }

    public String getHomeTeamName() {
        return homeTeamName;
    }

    public void setHomeTeamName(String homeTeamName) {
        this.homeTeamName = homeTeamName;
    }
    // </editor-fold>

    public Boolean hasOwner(String owner) {
        return(awayOwner.equals(owner) || homeOwner.equals(owner));
    }
}
