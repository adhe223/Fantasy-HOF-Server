package com.thefantasyhof.ModelObjects;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class LeagueSeason {
    private String year;
    private double totalPoints = 0;
    private String championName;
    private String runnerUpName;
    private ArrayList<String> winningestNames= new ArrayList<String>();;
    private int winningestWins = Integer.MIN_VALUE;
    private ArrayList<String> losingestNames = new ArrayList<String>();
    private int losingestLosses = Integer.MAX_VALUE;
    private ArrayList<String> highTotalScorerNames = new ArrayList<String>();
    private double highTotalScore = Double.MIN_VALUE;
    private ArrayList<String> lowTotalScorerNames = new ArrayList<String>();
    private double lowTotalScore = Double.MAX_VALUE;
    private ArrayList<String> highSingleScoreNames = new ArrayList<String>();
    private double highSingleScore = Double.MIN_VALUE;
    private ArrayList<String > lowSingleScoreNames = new ArrayList<String>();
    private double lowSingleScore = Double.MAX_VALUE;

    // <editor-fold desc="Getters/Setters">
    public ArrayList<String> getHighTotalScorerNames() {
        return highTotalScorerNames;
    }
    public void setHighTotalScorerNames(ArrayList<String> highTotalScorerNames) {
        this.highTotalScorerNames = highTotalScorerNames;
    }
    public double getHighTotalScore() {
        return highTotalScore;
    }
    public void setHighTotalScore(double highTotalScore) {
        this.highTotalScore = highTotalScore;
    }
    public ArrayList<String> getLowTotalScorerNames() {
        return lowTotalScorerNames;
    }
    public void setLowTotalScorerNames(ArrayList<String> lowTotalScorerNames) {
        this.lowTotalScorerNames = lowTotalScorerNames;
    }
    public double getLowTotalScore() {
        return lowTotalScore;
    }
    public void setLowTotalScore(double lowTotalScore) {
        this.lowTotalScore = lowTotalScore;
    }
    public Integer getWinningestWins() {
        return winningestWins;
    }
    public void setWinningestWins(Integer winningestWins) {
        this.winningestWins = winningestWins;
    }
    public Integer getLosingestLosses() {
        return losingestLosses;
    }
    public void setLosingestLosses(Integer losingestLosses) {
        this.losingestLosses = losingestLosses;
    }
    public ArrayList<String> getWinningestNames() {
        return winningestNames;
    }
    public void setWinningestNames(ArrayList<String> winningestNames) {
        this.winningestNames = winningestNames;
    }
    public ArrayList<String> getLosingestNames() {
        return losingestNames;
    }
    public void setLosingestNames(ArrayList<String> losingestNames) {
        this.losingestNames = losingestNames;
    }
    public ArrayList<String> getHighSingleScoreNames() {
        return highSingleScoreNames;
    }
    public void setHighSingleScoreNames(ArrayList<String> highSingleScoreNames) {
        this.highSingleScoreNames = highSingleScoreNames;
    }
    public ArrayList<String> getLowSingleScoreNames() {
        return lowSingleScoreNames;
    }
    public void setLowSingleScoreNames(ArrayList<String> lowSingleScoreNames) {
        this.lowSingleScoreNames = lowSingleScoreNames;
    }
    public String getYear() {
        return year;
    }
    public void setYear(String year) {
        this.year = year;
    }
    public double getTotalPoints() {
        return totalPoints;
    }
    public void setTotalPoints(double totalPoints) {
        this.totalPoints = totalPoints;
    }
    public String getChampionName() {
        return championName;
    }
    public void setChampionName(String championName) {
        this.championName = championName;
    }
    public String getRunnerUpName() {
        return runnerUpName;
    }
    public void setRunnerUpName(String runnerUpName) {
        this.runnerUpName = runnerUpName;
    }
    public Double getHighSingleScore() {
        return highSingleScore;
    }
    public void setHighSingleScore(Double highSingleScore) {
        this.highSingleScore = highSingleScore;
    }
    public Double getLowSingleScore() {
        return lowSingleScore;
    }
    public void setLowSingleScore(Double lowSingleScore) {
        this.lowSingleScore = lowSingleScore;
    }
    public LeagueSeason(String year, String championName, String runnerUpName) {
        this.year = year;
        this.totalPoints = totalPoints;
        this.championName = championName;
        this.runnerUpName = runnerUpName;
    }
    // </editor-fold>

    // Given a matchup it adds the points and figures out if it's a high/low single game score
    public void matchupConsumer(Matchup matchup) {
        double lowScore;
        double highScore;
        String lowScorer;
        String highScorer;

        if (matchup.getHomePoints() < matchup.getAwayPoints()) {
            lowScore = matchup.getHomePoints();
            lowScorer = matchup.getHomeOwner();
            highScore = matchup.getAwayPoints();
            highScorer = matchup.getAwayOwner();
        } else {
            lowScore = matchup.getAwayPoints();
            lowScorer = matchup.getAwayOwner();
            highScore = matchup.getHomePoints();
            highScorer = matchup.getHomeOwner();
        }

        // Add the points
        this.setTotalPoints(this.getTotalPoints() + matchup.getAwayPoints() + matchup.getHomePoints());

        // Lowest single score
        if (lowScore == this.getLowSingleScore()) {
            this.getLowSingleScoreNames().add(lowScorer);
        } else if (lowScore < this.getLowSingleScore()) {
            this.setLowSingleScore(lowScore);
            ArrayList<String> lowSingleScorers = this.getLowSingleScoreNames();
            lowSingleScorers.clear();
            lowSingleScorers.add(lowScorer);
            this.setLowSingleScoreNames(lowSingleScorers);
        }

        // Highest single score
        if (highScore == this.getHighSingleScore()) {
            this.getHighSingleScoreNames().add(highScorer);
        } else if (highScore > this.getHighSingleScore()) {
            this.setHighSingleScore(highScore);
            ArrayList<String> highSingleScorers = this.getHighSingleScoreNames();
            highSingleScorers.clear();
            highSingleScorers.add(highScorer);
            this.setHighSingleScoreNames(highSingleScorers);
        }
    }
}
