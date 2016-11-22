package com.thefantasyhof.ModelObjects;

/**
 * Created by zaber on 11/21/2016.
 */
public class OwnerSeason {
    private int wins = 0;
    private int losses = 0;
    private int ties = 0;
    private String year;
    private double pointsFor = 0;
    private double pointsAgainst = 0;

    public OwnerSeason(int wins, int losses, int ties, String year, double pointsFor, double pointsAgainst) {
        this.wins = wins;
        this.losses = losses;
        this.ties = ties;
        this.year = year;
        this.pointsFor = pointsFor;
        this.pointsAgainst = pointsAgainst;
    }

    // <editor-fold desc="Getters/Setters">
    public int getWins() {
        return wins;
    }
    public void setWins(int wins) {
        this.wins = wins;
    }
    public int getLosses() {
        return losses;
    }
    public void setLosses(int losses) {
        this.losses = losses;
    }
    public int getTies() {
        return ties;
    }
    public void setTies(int ties) {
        this.ties = ties;
    }
    public String getYear() {
        return year;
    }
    public void setYear(String year) {
        this.year = year;
    }
    public double getPointsFor() {
        return pointsFor;
    }
    public void setPointsFor(double pointsFor) {
        this.pointsFor = pointsFor;
    }
    public double getPointsAgainst() {
        return pointsAgainst;
    }
    public void setPointsAgainst(double pointsAgainst) {
        this.pointsAgainst = pointsAgainst;
    }
    //</editor-fold>
}
