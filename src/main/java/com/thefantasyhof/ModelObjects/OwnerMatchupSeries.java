package com.thefantasyhof.ModelObjects;

public class OwnerMatchupSeries {
    private String opponent;
    private int wins;
    private int losses;
    private int ties;
    private double pointsFor;
    private double opponentPoints;
    private Boolean isPlayoffs;

    public OwnerMatchupSeries(String opponent, int wins, int losses, int ties, double pointsFor, double opponentPoints) {
        this.opponent = opponent;
        this.wins = wins;
        this.losses = losses;
        this.ties = ties;
        this.pointsFor = pointsFor;
        this.opponentPoints = opponentPoints;
    }

    public String getOpponent() {
        return opponent;
    }
    public void setOpponent(String opponent) {
        this.opponent = opponent;
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
    public double getOpponentPoints() {
        return opponentPoints;
    }
    public void setOpponentPoints(double opponentPoints) {
        this.opponentPoints = opponentPoints;
    }
}
