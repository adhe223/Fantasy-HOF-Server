package com.thefantasyhof;
import com.thefantasyhof.ModelObjects.Matchup;
import com.thefantasyhof.ModelObjects.Owner;
import org.json.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class DataConsumer {
    private JSONObject json;
    private Map<String, Owner> owners = new HashMap<String, Owner>();

    public DataConsumer(String JSONData) {
        this.json = new JSONObject(JSONData);
        this.populateOwnersArray();
    }

    public void tabulateMatchupData() {
        // Iterate over all the matchups for each season (including playoffs) and tabulate the data
        JSONObject totalSeasonsInfo = this.json.getJSONObject("totalSeasonsInfo");
        Iterator<String> seasonsKeys = totalSeasonsInfo.keys();

        while (seasonsKeys.hasNext()) {
            String year = (String)seasonsKeys.next();
            JSONObject seasonInfo = totalSeasonsInfo.getJSONObject(year);

            JSONArray matchups = seasonInfo.getJSONArray("matchups");
            this.iterateMatchupsAndStore(matchups, false);

            JSONArray playoffMatchups = seasonInfo.getJSONArray("playoffMatchups");
            this.iterateMatchupsAndStore(playoffMatchups, true);
        }
    }

    private void iterateMatchupsAndStore(JSONArray matchups, Boolean isPlayoffs) {
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
            Matchup matchup = new Matchup(awayOwner, homeOwner, matchupJSON.getDouble(firstPointsKey), matchupJSON.getDouble(secondPointsKey), isPlayoffs);

            // Add matchup data to the owner's object
            owners.get(awayOwner).addMatchupData(matchup);
            owners.get(homeOwner).addMatchupData(matchup);
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
