package com.thefantasyhof;
import com.thefantasyhof.Utilities;
import com.thefantasyhof.ModelObjects.LeagueSeason;
import com.thefantasyhof.ModelObjects.Matchup;
import com.thefantasyhof.ModelObjects.Owner;
import com.thefantasyhof.ModelObjects.OwnerSeason;
import org.json.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class DataConsumer {
    private JSONObject json;
    private Map<String, Owner> owners = new HashMap<String, Owner>();
    private Map<String, LeagueSeason> seasons = new HashMap<String, LeagueSeason>();

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

    public void tabulateMatchupData() {
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
    }

    // Loops over the given year in each owner's array and finds the winningest/losingest teams, and the high/low scorers
    private void calculateLeagueSeasonAggregates(String year) {
        ArrayList<String> losingestNames = seasons.get(year).getLosingestNames();
        int mostLosses = seasons.get(year).getLosingestLosses();
        ArrayList<String> winningestNames = seasons.get(year).getWinningestNames();
        int mostWins = seasons.get(year).getWinningestWins();
        ArrayList<String> lowTotalScorerNames = seasons.get(year).getLowTotalScorerNames();
        double lowTotalScore = seasons.get(year).getLowTotalScore();
        ArrayList<String> highTotalScorerNames = seasons.get(year).getHighTotalScorerNames();
        double highTotalScore = seasons.get(year).getHighTotalScore();
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

            // Set the winningest team
            // TODO: Could unduplicate these 4
            if (wins == mostWins) {
                winningestNames.add(ownerName);
            } else if (wins > mostWins) {
                mostWins = wins;
                winningestNames.clear();
                winningestNames.add(ownerName);
            }

            // Set the losingest team
            if (losses == mostLosses) {
                losingestNames.add(ownerName);
            } else if (losses > mostLosses) {
                mostLosses = losses;
                losingestNames.clear();
                losingestNames.add(ownerName);
            }

            // Set the highest total score
            if (totalPointsFor == highTotalScore) {
                highTotalScorerNames.add(ownerName);
            } else if (totalPointsFor > highTotalScore) {
                highTotalScore = totalPointsFor;
                highTotalScorerNames.clear();
                highTotalScorerNames.add(ownerName);
            }

            // Set the lowest total score
            if (totalPointsFor == lowTotalScore) {
                lowTotalScorerNames.add(ownerName);
            } else if (totalPointsFor < lowTotalScore) {
                lowTotalScore = totalPointsFor;
                lowTotalScorerNames.clear();
                lowTotalScorerNames.add(ownerName);
            }

            // Store all the values
            seasons.get(year).setWinningestNames(winningestNames);
            seasons.get(year).setWinningestWins(mostWins);
            seasons.get(year).setLosingestNames(losingestNames);
            seasons.get(year).setLosingestLosses(mostLosses);
            seasons.get(year).setHighTotalScorerNames(highTotalScorerNames);
            seasons.get(year).setHighTotalScore(highTotalScore);
            seasons.get(year).setLowTotalScorerNames(lowTotalScorerNames);
            seasons.get(year).setLowTotalScore(lowTotalScore);
        }
    }

    private void iterateMatchupsAndStore(JSONArray matchups, Boolean isPlayoffs, String year) {
        String firstTeamOwnerKey = "awayTeamOwner";
        String secondTeamOwnerKey = "homeTeamOwner";
        String firstPointsKey = "awayPoints";
        String secondPointsKey = "homePoints";

        // Playoffs have different keys in the JSON object
        if (isPlayoffs) {
            firstTeamOwnerKey = "firstTeamOwner";
            secondTeamOwnerKey = "secondTeamOwner";
            firstPointsKey = "firstPoints";
            secondPointsKey = "secondPoints";
        }

        // Iterate over the matchups, create a Matchup object, then add them to the owner's objects
        for (int i = 0; i < matchups.length(); i++) {
            // Create matchup object
            JSONObject matchupJSON = matchups.getJSONObject(i);
            String awayOwner = matchupJSON.getString(firstTeamOwnerKey);
            String homeOwner = matchupJSON.getString(secondTeamOwnerKey);
            Matchup matchup = new Matchup(awayOwner, homeOwner, matchupJSON.getDouble(firstPointsKey), matchupJSON.getDouble(secondPointsKey), isPlayoffs, year);

            // Add matchup data to the owner's object
            owners.get(awayOwner).addMatchupData(matchup);
            owners.get(homeOwner).addMatchupData(matchup);

            // Add matchup data to the LeagueSeasons map
            seasons.get(year).matchupConsumer(matchup);
        }
    }

    private void populateOwnersArray() {
        // First populate our owners array
        JSONObject ownersInfo = this.json.getJSONObject("ownerInfo");
        Iterator<String> ownersKeys = ownersInfo.keys();
        while (ownersKeys.hasNext()) {
            String name = (String)ownersKeys.next();
            Owner owner = new Owner(name);

            /*
            // Iterate over the seasons the owner has and tabulate the data
            JSONObject seasonsDict = ownersInfo.getJSONObject(name).getJSONObject("seasonsDict");
            Iterator<String> seasonsKeys = seasonsDict.keys();
            while (seasonsKeys.hasNext()) {
                String year = (String)seasonsKeys.next();
                JSONObject season = seasonsDict.getJSONObject(year);

                int wins = season.getInt("wins");
                int losses = season.getInt("losses");
                // TODO: Do ties work right on the node.js parser?
                // int ties = season.getInt("ties");
                double pointsFor = season.getDouble("pointsFor");
                double pointsAgainst = season.getDouble("pointsAgainst");
                owner.addSeasonData(wins, losses, pointsFor, pointsAgainst);
            }
            */

            owners.put(name, owner);
        }
    }
}
