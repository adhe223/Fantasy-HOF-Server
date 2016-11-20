package com.thefantasyhof;
import com.thefantasyhof.ModelObjects.Owner;
import org.json.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

public class DataConsumer {
    private JSONObject json;
    private ArrayList<Owner> owners = new ArrayList<Owner>();

    public DataConsumer(String JSONData) {
        this.json = new JSONObject(JSONData);
    }

    public void tabulateMatchupStats() {
        // First populate our owners array
        JSONObject ownersInfo = this.json.getJSONObject("ownerInfo");
        Iterator<String> ownersKeys = ownersInfo.keys();
        while (ownersKeys.hasNext()) {
            String name = (String)ownersKeys.next();
            Owner owner = new Owner(name);

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

            owners.add(owner);
        }
    }
}
