package com.thefantasyhof.ModelObjects;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class LeagueSeason {
    private String year;
    private double totalPoints = 0;
    private String championName;
    private String runnerUpName;
    private ArrayList<WLSuperlative> winningestTeams = new ArrayList<>();
    private ArrayList<WLSuperlative> losingestTeams = new ArrayList<>();
    private ArrayList<PointsSuperlative> highestTotalScoringTeams = new ArrayList<>();
    private ArrayList<PointsSuperlative> lowestTotalScoringTeams = new ArrayList<>();
    private ArrayList<PointsSuperlative> highestSingleScoringTeams = new ArrayList<>();
    private ArrayList<PointsSuperlative> lowestSingleScoringTeams = new ArrayList<>();

    // <editor-fold desc="Getters/Setters">
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

    public ArrayList<WLSuperlative> getWinningestTeams() {
        return winningestTeams;
    }

    public void setWinningestTeams(ArrayList<WLSuperlative> winningestTeams) {
        this.winningestTeams = winningestTeams;
    }

    public ArrayList<WLSuperlative> getLosingestTeams() {
        return losingestTeams;
    }

    public void setLosingestTeams(ArrayList<WLSuperlative> losingestTeams) {
        this.losingestTeams = losingestTeams;
    }

    public ArrayList<PointsSuperlative> getHighestTotalScoringTeams() {
        return highestTotalScoringTeams;
    }

    public void setHighestTotalScoringTeams(ArrayList<PointsSuperlative> highestTotalScoringTeams) {
        this.highestTotalScoringTeams = highestTotalScoringTeams;
    }

    public ArrayList<PointsSuperlative> getLowestTotalScoringTeams() {
        return lowestTotalScoringTeams;
    }

    public void setLowestTotalScoringTeams(ArrayList<PointsSuperlative> lowestTotalScoringTeams) {
        this.lowestTotalScoringTeams = lowestTotalScoringTeams;
    }

    public ArrayList<PointsSuperlative> getHighestSingleScoringTeams() {
        return highestSingleScoringTeams;
    }

    public void setHighestSingleScoringTeams(ArrayList<PointsSuperlative> highestSingleScoringTeams) {
        this.highestSingleScoringTeams = highestSingleScoringTeams;
    }

    public ArrayList<PointsSuperlative> getLowestSingleScoringTeams() {
        return lowestSingleScoringTeams;
    }

    public void setLowestSingleScoringTeams(ArrayList<PointsSuperlative> lowestSingleScoringTeams) {
        this.lowestSingleScoringTeams = lowestSingleScoringTeams;
    }
    // </editor-fold>

    public LeagueSeason(String year, String championName, String runnerUpName) {
        this.year = year;
        this.championName = championName;
        this.runnerUpName = runnerUpName;
    }

    // Given a matchup it adds the points and figures out if it's a high/low single game score
    public void matchupConsumer(Matchup matchup) {
        double lowScore;
        double highScore;
        String lowScorer;
        String highScorer;
        String lowScorerTeamName;
        String highScorerTeamName;

        if (matchup.getHomePoints() < matchup.getAwayPoints()) {
            lowScore = matchup.getHomePoints();
            lowScorer = matchup.getHomeOwner();
            lowScorerTeamName = matchup.getHomeTeamName();
            highScore = matchup.getAwayPoints();
            highScorer = matchup.getAwayOwner();
            highScorerTeamName = matchup.getAwayTeamName();
        } else {
            lowScore = matchup.getAwayPoints();
            lowScorer = matchup.getAwayOwner();
            lowScorerTeamName = matchup.getAwayTeamName();
            highScore = matchup.getHomePoints();
            highScorer = matchup.getHomeOwner();
            highScorerTeamName = matchup.getHomeTeamName();
        }

        // Regular season stats
        if (matchup.getPlayoffs()) {
            return;
        }

        // Add the points for regular season
        this.setTotalPoints(this.getTotalPoints() + matchup.getAwayPoints() + matchup.getHomePoints());

        // Lowest single score  (not interesting for playoffs because some leagues do two week playoffs)
        if (lowestSingleScoringTeams.size() == 0) {
            lowestSingleScoringTeams.add(new PointsSuperlative(lowScorer, lowScorerTeamName, matchup.getYear(), lowScore));
        } else {
            double lowestScore = this.lowestSingleScoringTeams.get(0).getValue();
            if (lowScore == lowestScore) {
                this.lowestSingleScoringTeams.add(new PointsSuperlative(lowScorer, lowScorerTeamName, matchup.getYear(), lowScore));
            } else if (lowScore < lowestScore) {
                this.lowestSingleScoringTeams.clear();
                this.lowestSingleScoringTeams.add(new PointsSuperlative(lowScorer, lowScorerTeamName, matchup.getYear(), lowScore));
            }
        }

        // Highest single score
        if (highestSingleScoringTeams.size() == 0) {
            highestSingleScoringTeams.add(new PointsSuperlative(highScorer, highScorerTeamName, matchup.getYear(), highScore));
        } else {
            double highestScore = this.highestSingleScoringTeams.get(0).getValue();
            if (highScore == highestScore) {
                this.highestSingleScoringTeams.add(new PointsSuperlative(highScorer, highScorerTeamName, matchup.getYear(), highScore));
            } else if (highScore > highestScore) {
                this.highestSingleScoringTeams.clear();
                this.highestSingleScoringTeams.add(new PointsSuperlative(highScorer, highScorerTeamName, matchup.getYear(), highScore));
            }
        }
    }
}
