package com.thefantasyhof.ModelObjects;

public class Matchup {
    private String awayOwner;
    private String homeOwner;
    private double awayPoints;
    private double homePoints;

    public Matchup(String awayOwner, String homeOwner, double awayPoints, double homePoints) {
        this.awayOwner = awayOwner;
        this.homeOwner = homeOwner;
        this.awayPoints = awayPoints;
        this.homePoints = homePoints;
    }

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

    public Boolean hasOwner(String owner) {
        return(awayOwner.equals(owner) || homeOwner.equals(owner));
    }
}
