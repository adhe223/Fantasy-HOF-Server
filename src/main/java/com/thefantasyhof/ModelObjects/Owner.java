package com.thefantasyhof.ModelObjects;

public class Owner {
    private String name;
    private int wins = 0;
    private int losses = 0;
    private int ties = 0;
    private double pointsFor = 0;
    private double pointsAgainst = 0;

    public Owner(String ownerName) {
        this.name = ownerName;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
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

    public void addSeasonData(int wins, int losses, double pointsFor, double pointsAgainst) {
        this.wins += wins;
        this.losses += losses;
        this.pointsFor += pointsFor;
        this.pointsAgainst += pointsAgainst;
    }
}
