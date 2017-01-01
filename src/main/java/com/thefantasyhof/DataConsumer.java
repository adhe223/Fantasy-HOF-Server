package com.thefantasyhof;
import com.thefantasyhof.ModelObjects.*;
import com.thefantasyhof.Utilities;
import org.json.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class DataConsumer {
    private JSONObject json;
    private Map<String, Owner> owners = new HashMap<String, Owner>();
    private Map<String, LeagueSeason> seasons = new HashMap<String, LeagueSeason>();
    private ArrayList<WLSuperlative> allTimeMostWinsInSeason = new ArrayList<>();
    private ArrayList<WLSuperlative> allTimeMostLossesInSeason = new ArrayList<>();
    private ArrayList<PointsSuperlative> allTimeHighestSeasonScoreTeams = new ArrayList<>();
    private ArrayList<PointsSuperlative> allTimeLowestSeasonScoreTeams = new ArrayList<>();
    private ArrayList<PointsSuperlative> allTimeHighestMatchupScoreTeams = new ArrayList<>();
    private ArrayList<PointsSuperlative> allTimeLowestMatchupScoreTeams = new ArrayList<>();

    //<editor-fold desc="Getters/Setters">
    public JSONObject getJson() {
        return json;
    }
    public void setJson(JSONObject json) {
        this.json = json;
    }
    public Map<String, Owner> getOwners() {
        return owners;
    }
    public void setOwners(Map<String, Owner> owners) {
        this.owners = owners;
    }
    public Map<String, LeagueSeason> getSeasons() {
        return seasons;
    }
    public void setSeasons(Map<String, LeagueSeason> seasons) {
        this.seasons = seasons;
    }
    //</editor-fold>

    public DataConsumer(String JSONData) {
        this.json = new JSONObject(JSONData);
        this.populateOwnersArray();
    }

    public void tabulateData() {
        // Iterate over all the matchups for each season (including playoffs) and tabulate the data
        JSONObject totalSeasonsInfo = this.json.getJSONObject("totalSeasonsInfo");
        Iterator<String> seasonsKeys = totalSeasonsInfo.keys();

        while (seasonsKeys.hasNext()) {
            String year = seasonsKeys.next();
            JSONObject seasonInfo = totalSeasonsInfo.getJSONObject(year);

            // Read out the Champion and Runner Up values
            String champion = seasonInfo.getJSONObject("champion").getString("owner");
            String runnerUp = seasonInfo.getJSONObject("runnerUp").getString("owner");

            // Create the LeagueSeason object
            seasons.put(year, new LeagueSeason(year, champion, runnerUp));

            // Add regular season matchups
            JSONArray matchups = seasonInfo.getJSONArray("matchups");
            this.iterateMatchupsAndStore(matchups, false, year);

            // Add playoff matchups
            JSONArray playoffMatchups = seasonInfo.getJSONArray("playoffMatchups");
            this.iterateMatchupsAndStore(playoffMatchups, true, year);

            // Calculate the aggregate data for the season
            this.calculateLeagueSeasonAggregates(year);
        }

        // Calculate the all time superlatives for each owner by looping over their seasons
        this.ownerSuperlativeTabulation();

        // Calculate the all time superlatives by looping over the leagueSeasons objects
        this.matchupSuperlativeTabulation();
    }

    // Loops over the given year in each owner's array and finds the winningest/losingest teams, and the high/low scorers
    //TODO: In the future when we add matchups to owners they should keep their own winningest/losingest teams and high/low scores for each season. Then here we loop over those/
    private void calculateLeagueSeasonAggregates(String year) {
        ArrayList<WLSuperlative> winningestTeams = seasons.get(year).getWinningestTeams();
        ArrayList<WLSuperlative> losingestTeams = seasons.get(year).getLosingestTeams();
        ArrayList<PointsSuperlative> highestTotalScoringTeams = seasons.get(year).getHighestTotalScoringTeams();
        ArrayList<PointsSuperlative> lowestTotalScoringTeams = seasons.get(year).getLowestTotalScoringTeams();
        OwnerSeason ownersSeason;

        // Iterate over each owner's OwnerSeason object for the given year
        for (Map.Entry<String, Owner> entry : this.getOwners().entrySet()) {
            String ownerName = entry.getKey();
            Owner owner = entry.getValue();

            // Not every owner was in the league every year
            if (owner.getSeasons().containsKey(year)) {
                ownersSeason = owner.getSeasons().get(year);
            } else {
                continue;
            }
            double totalPointsFor = ownersSeason.getPointsFor();
            int wins = ownersSeason.getWins();
            int losses = ownersSeason.getLosses();
            String teamName = ownersSeason.getTeamName();

            // Set the winningest team
            // TODO: Could unduplicate these 4
            if (winningestTeams.size() == 0) {
                winningestTeams.add(new WLSuperlative(ownerName, teamName, year, wins));
            } else {
                int mostWins = winningestTeams.get(0).getValue();
                if (wins == mostWins) {
                    winningestTeams.add(new WLSuperlative(ownerName, teamName, year, wins));
                } else if (wins > mostWins) {
                    winningestTeams.clear();
                    winningestTeams.add(new WLSuperlative(ownerName, teamName, year, wins));
                }
            }

            // Set the losingest team
            if (losingestTeams.size() == 0) {
                losingestTeams.add(new WLSuperlative(ownerName, teamName, year, losses));
            } else {
                int mostLosses = losingestTeams.get(0).getValue();
                if (losses == mostLosses) {
                    losingestTeams.add(new WLSuperlative(ownerName, teamName, year, losses));
                } else if (losses > mostLosses) {
                    losingestTeams.clear();
                    losingestTeams.add(new WLSuperlative(ownerName, teamName, year, losses));
                }
            }

            // Set the highest total score
            if (highestTotalScoringTeams.size() == 0) {
                highestTotalScoringTeams.add(new PointsSuperlative(ownerName, teamName, year, totalPointsFor));
            } else {
                double highTotalScore = highestTotalScoringTeams.get(0).getValue();
                if (totalPointsFor == highTotalScore) {
                    highestTotalScoringTeams.add(new PointsSuperlative(ownerName, teamName, year, totalPointsFor));
                } else if (totalPointsFor > highTotalScore) {
                    highestTotalScoringTeams.clear();
                    highestTotalScoringTeams.add(new PointsSuperlative(ownerName, teamName, year, totalPointsFor));
                }
            }

            // Set the lowest total score
            if (lowestTotalScoringTeams.size() == 0) {
                lowestTotalScoringTeams.add(new PointsSuperlative(ownerName, teamName, year, totalPointsFor));
            } else {
                double lowTotalScore = lowestTotalScoringTeams.get(0).getValue();
                if (totalPointsFor == lowTotalScore) {
                    lowestTotalScoringTeams.add(new PointsSuperlative(ownerName, teamName, year, totalPointsFor));
                } else if (totalPointsFor < lowTotalScore) {
                    lowestTotalScoringTeams.clear();
                    lowestTotalScoringTeams.add(new PointsSuperlative(ownerName, teamName, year, totalPointsFor));
                }
            }

            // Store all the values
            seasons.get(year).setWinningestTeams(winningestTeams);
            seasons.get(year).setLosingestTeams(losingestTeams);
            seasons.get(year).setHighestTotalScoringTeams(highestTotalScoringTeams);
            seasons.get(year).setLowestTotalScoringTeams(lowestTotalScoringTeams);
        }
    }

    private void iterateMatchupsAndStore(JSONArray matchups, Boolean isPlayoffs, String year) {
        String firstTeamOwnerKey = "awayTeamOwner";
        String secondTeamOwnerKey = "homeTeamOwner";
        String firstPointsKey = "awayPoints";
        String secondPointsKey = "homePoints";
        String firstTeamNameKey = "awayTeamName";
        String secondTeamNameKey = "homeTeamName";

        // Playoffs have different keys in the JSON object
        if (isPlayoffs) {
            firstTeamOwnerKey = "firstTeamOwner";
            secondTeamOwnerKey = "secondTeamOwner";
            firstPointsKey = "firstPoints";
            secondPointsKey = "secondPoints";
            firstTeamNameKey = "firstTeamName";
            secondTeamNameKey = "secondTeamName";
        }

        // Iterate over the matchups, create a Matchup object, then add them to the owner's objects
        for (int i = 0; i < matchups.length(); i++) {
            // Create matchup object
            JSONObject matchupJSON = matchups.getJSONObject(i);
            String awayOwner = matchupJSON.getString(firstTeamOwnerKey);
            String awayTeamName = matchupJSON.getString(firstTeamNameKey);
            String homeOwner = matchupJSON.getString(secondTeamOwnerKey);
            String homeTeamName = matchupJSON.getString(secondTeamNameKey);
            Matchup matchup = new Matchup(awayOwner, awayTeamName, homeOwner, homeTeamName, matchupJSON.getDouble(firstPointsKey), matchupJSON.getDouble(secondPointsKey), isPlayoffs, year);

            // Add matchup data to the owner's object
            owners.get(awayOwner).addMatchupData(matchup);
            owners.get(homeOwner).addMatchupData(matchup);

            // Add matchup data to the LeagueSeasons map
            seasons.get(year).matchupConsumer(matchup);
        }
    }
    // Iterate over the owners and call the method to calculate their superlatives
    private void ownerSuperlativeTabulation() {
        // Iterate over thw owners map
        for (Map.Entry<String, Owner> entry : this.getOwners().entrySet()) {
            String ownerName = entry.getKey();
            Owner owner = entry.getValue();

            // Call the method to have each tabulate their superlatives
            owner.calculateOwnerSuperlatives();
        }
    }

    private void matchupSuperlativeTabulation() {
        this.allTimeMostWinsInSeason = allTimeMostWinsInSeasonTabulation();
        this.allTimeMostLossesInSeason = allTimeMostLossesInSeasonTabulation();

        this.allTimeHighestSeasonScoreTeams = allTimeHighestScoringSeasonTabulation();
        this.allTimeLowestSeasonScoreTeams = allTimeLowestScoringSeasonTabulation();

        this.allTimeHighestMatchupScoreTeams = allTimeHighestMatchupScoreTabulation();
        this.allTimeLowestMatchupScoreTeams = allTimeLowestMatchupScoreTabulation();
    }

    // Iterates over the leagueSeasons objects to find the team with the most wins in a single season
    private ArrayList<WLSuperlative> allTimeMostWinsInSeasonTabulation() {
        ArrayList<WLSuperlative> allTimeMostWins =  new ArrayList<WLSuperlative>();

        for (Map.Entry<String, LeagueSeason> entry : seasons.entrySet()) {
            String year = entry.getKey();
            LeagueSeason season = entry.getValue();

            if (allTimeMostWins.size() == 0) {
                allTimeMostWins = season.getWinningestTeams();
            } else {
                if (allTimeMostWins.get(0).getValue() == season.getWinningestTeams().get(0).getValue()) {
                    // Iterate over the season superlatives and add to the all time list
                    for (WLSuperlative superlative : season.getWinningestTeams()) {
                        allTimeMostWins.add(superlative);
                    }
                } else if (allTimeMostWins.get(0).getValue() < season.getWinningestTeams().get(0).getValue()) {
                    allTimeMostWins.clear();
                    for (WLSuperlative superlative : season.getWinningestTeams()) {
                        allTimeMostWins.add(superlative);
                    }
                }
            }
        }

        return allTimeMostWins;
    }

    // Iterates over the leagueSeasons objects to find the team with the most losses in a single season
    private ArrayList<WLSuperlative> allTimeMostLossesInSeasonTabulation() {
        ArrayList<WLSuperlative> allTimeMostLosses =  new ArrayList<WLSuperlative>();

        for (Map.Entry<String, LeagueSeason> entry : seasons.entrySet()) {
            String year = entry.getKey();
            LeagueSeason season = entry.getValue();

            if (allTimeMostLosses.size() == 0) {
                allTimeMostLosses = season.getLosingestTeams();
            } else {
                if (allTimeMostLosses.get(0).getValue() == season.getLosingestTeams().get(0).getValue()) {
                    // Iterate over the season superlatives and add to the all time list
                    for (WLSuperlative superlative : season.getLosingestTeams()) {
                        allTimeMostLosses.add(superlative);
                    }
                } else if (allTimeMostLosses.get(0).getValue() < season.getLosingestTeams().get(0).getValue()) {
                    allTimeMostLosses.clear();
                    for (WLSuperlative superlative : season.getLosingestTeams()) {
                        allTimeMostLosses.add(superlative);
                    }
                }
            }
        }

        return allTimeMostLosses;
    }

    // Iterates over the leagueSeasons objects to find the team with the most wins in a single season
    private ArrayList<PointsSuperlative> allTimeHighestScoringSeasonTabulation() {
        ArrayList<PointsSuperlative> allTimeMostPoints =  new ArrayList<PointsSuperlative>();

        for (Map.Entry<String, LeagueSeason> entry : seasons.entrySet()) {
            String year = entry.getKey();
            LeagueSeason season = entry.getValue();

            if (allTimeMostPoints.size() == 0) {
                allTimeMostPoints = season.getHighestTotalScoringTeams();
            } else {
                if (allTimeMostPoints.get(0).getValue() == season.getHighestTotalScoringTeams().get(0).getValue()) {
                    // Iterate over the season superlatives and add to the all time list
                    for (PointsSuperlative superlative : season.getHighestTotalScoringTeams()) {
                        allTimeMostPoints.add(superlative);
                    }
                } else if (allTimeMostPoints.get(0).getValue() < season.getHighestTotalScoringTeams().get(0).getValue()) {
                    allTimeMostPoints.clear();
                    for (PointsSuperlative superlative : season.getHighestTotalScoringTeams()) {
                        allTimeMostPoints.add(superlative);
                    }
                }
            }
        }

        return allTimeMostPoints;
    }

    // Iterates over the leagueSeasons objects to find the team with the most losses in a single season
    private ArrayList<PointsSuperlative> allTimeLowestScoringSeasonTabulation() {
        ArrayList<PointsSuperlative> allTimeLeastPoints =  new ArrayList<PointsSuperlative>();

        for (Map.Entry<String, LeagueSeason> entry : seasons.entrySet()) {
            String year = entry.getKey();
            LeagueSeason season = entry.getValue();

            if (allTimeLeastPoints.size() == 0) {
                allTimeLeastPoints = season.getLowestTotalScoringTeams();
            } else {
                if (allTimeLeastPoints.get(0).getValue() == season.getLowestTotalScoringTeams().get(0).getValue()) {
                    // Iterate over the season superlatives and add to the all time list
                    for (PointsSuperlative superlative : season.getLowestTotalScoringTeams()) {
                        allTimeLeastPoints.add(superlative);
                    }
                } else if (allTimeLeastPoints.get(0).getValue() > season.getLowestTotalScoringTeams().get(0).getValue()) {
                    allTimeLeastPoints.clear();
                    for (PointsSuperlative superlative : season.getLowestTotalScoringTeams()) {
                        allTimeLeastPoints.add(superlative);
                    }
                }
            }
        }

        return allTimeLeastPoints;
    }

    // Iterates over the leagueSeasons objects to find the team with the most points scored in a matchup
    private ArrayList<PointsSuperlative> allTimeHighestMatchupScoreTabulation() {
        ArrayList<PointsSuperlative> allTimeMostPoints =  new ArrayList<PointsSuperlative>();

        for (Map.Entry<String, LeagueSeason> entry : seasons.entrySet()) {
            String year = entry.getKey();
            LeagueSeason season = entry.getValue();

            if (allTimeMostPoints.size() == 0) {
                allTimeMostPoints = season.getHighestSingleScoringTeams();
            } else {
                if (allTimeMostPoints.get(0).getValue() == season.getHighestSingleScoringTeams().get(0).getValue()) {
                    // Iterate over the season superlatives and add to the all time list
                    for (PointsSuperlative superlative : season.getHighestSingleScoringTeams()) {
                        allTimeMostPoints.add(superlative);
                    }
                } else if (allTimeMostPoints.get(0).getValue() < season.getHighestSingleScoringTeams().get(0).getValue()) {
                    allTimeMostPoints.clear();
                    for (PointsSuperlative superlative : season.getHighestSingleScoringTeams()) {
                        allTimeMostPoints.add(superlative);
                    }
                }
            }
        }

        return allTimeMostPoints;
    }

    // Iterates over the leagueSeasons objects to find the team with the least points scored in a matchup
    private ArrayList<PointsSuperlative> allTimeLowestMatchupScoreTabulation() {
        ArrayList<PointsSuperlative> allTimeLeastPoints =  new ArrayList<PointsSuperlative>();

        for (Map.Entry<String, LeagueSeason> entry : seasons.entrySet()) {
            String year = entry.getKey();
            LeagueSeason season = entry.getValue();

            if (allTimeLeastPoints.size() == 0) {
                allTimeLeastPoints = season.getLowestSingleScoringTeams();
            } else {
                if (allTimeLeastPoints.get(0).getValue() == season.getLowestSingleScoringTeams().get(0).getValue()) {
                    // Iterate over the season superlatives and add to the all time list
                    for (PointsSuperlative superlative : season.getLowestSingleScoringTeams()) {
                        allTimeLeastPoints.add(superlative);
                    }
                } else if (allTimeLeastPoints.get(0).getValue() > season.getLowestSingleScoringTeams().get(0).getValue()) {
                    allTimeLeastPoints.clear();
                    for (PointsSuperlative superlative : season.getLowestSingleScoringTeams()) {
                        allTimeLeastPoints.add(superlative);
                    }
                }
            }
        }

        return allTimeLeastPoints;
    }

    private void populateOwnersArray() {
        // First populate our owners array
        JSONObject ownersInfo = this.json.getJSONObject("ownerInfo");
        Iterator<String> ownersKeys = ownersInfo.keys();
        while (ownersKeys.hasNext()) {
            String name = (String)ownersKeys.next();
            Owner owner = new Owner(name);

            owners.put(name, owner);
        }
    }
}
