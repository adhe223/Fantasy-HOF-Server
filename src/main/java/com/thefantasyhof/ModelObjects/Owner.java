package com.thefantasyhof.ModelObjects;

import java.util.HashMap;
import java.util.Map;

public class Owner {
    // <editor-fold desc="Vars">
    private String name;
    private int wins = 0;
    private int losses = 0;
    private int ties = 0;
    private double pointsFor = 0;
    private double pointsAgainst = 0;
    private int playoffWins = 0;
    private int playoffLosses = 0;
    private double playoffPF = 0;
    private double playoffPA = 0;
    private Map<String, OwnerMatchupSeries> matchupSeries = new HashMap<String, OwnerMatchupSeries>();

    // </editor-fold>
    // <editor-fold desc="Getters/Setters">
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
    public int getPlayoffWins() {
        return playoffWins;
    }
    public void setPlayoffWins(int playoffWins) {
        this.playoffWins = playoffWins;
    }
    public int getPlayoffLosses() {
        return playoffLosses;
    }
    public void setPlayoffLosses(int playoffLosses) {
        this.playoffLosses = playoffLosses;
    }
    public double getPlayoffPF() {
        return playoffPF;
    }
    public void setPlayoffPF(double playoffPF) {
        this.playoffPF = playoffPF;
    }
    public double getPlayoffPA() {
        return playoffPA;
    }
    public void setPlayoffPA(double playoffPA) {
        this.playoffPA = playoffPA;
    }
    // </editor-fold>

    public Owner(String ownerName) {
        this.name = ownerName;
    }

    public void addSeasonData(int wins, int losses, double pointsFor, double pointsAgainst) {
        this.wins += wins;
        this.losses += losses;
        this.pointsFor += pointsFor;
        this.pointsAgainst += pointsAgainst;
    }
    public void addMatchupData(Matchup matchup) {
        // Basic Stats
        int win = 0;
        int loss = 0;
        int tie = 0;
        boolean isPlayoffs = matchup.getPlayoffs();
        double pointsFor = name.equals(matchup.getHomeOwner()) ? matchup.getHomePoints() : matchup.getAwayPoints();
        double pointsAgainst = name.equals(matchup.getHomeOwner()) ? matchup.getAwayPoints() : matchup.getHomePoints();

        if (pointsFor > pointsAgainst) {win++;}
        else if (pointsFor == pointsAgainst && !isPlayoffs) { tie++; }
        else { loss++; }

        if (!isPlayoffs) {
            // Regular season
            this.wins += win;
            this.losses += loss;
            this.ties += tie;

            this.pointsFor += pointsFor;
            this.pointsAgainst += pointsAgainst;
        } else {
            // Playoffs
            this.playoffWins += win;
            this.playoffLosses += loss;

            this.playoffPF += pointsFor;
            this.playoffPA += pointsAgainst;
        }

        // Add to the owner matchup series
        String opponentName = name.equals(matchup.getHomeOwner()) ? matchup.getAwayOwner() : matchup.getHomeOwner();
        if (matchupSeries.get(opponentName) == null) {
            // Add an entry for this owner
            matchupSeries.put(opponentName, new OwnerMatchupSeries(opponentName, win, loss, tie, pointsFor, pointsAgainst));
        } else {
            // Change an existing entry by reference
            OwnerMatchupSeries opponentMatchup = matchupSeries.get(opponentName);
            opponentMatchup.setWins(opponentMatchup.getWins() + win);
            opponentMatchup.setLosses(opponentMatchup.getLosses() + loss);
            opponentMatchup.setTies(opponentMatchup.getTies() + tie);
            opponentMatchup.setPointsFor(opponentMatchup.getPointsFor() + pointsFor);
            opponentMatchup.setOpponentPoints(opponentMatchup.getOpponentPoints() + pointsAgainst);
        }
    }
}
