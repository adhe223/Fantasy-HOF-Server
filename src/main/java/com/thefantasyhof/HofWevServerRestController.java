package com.thefantasyhof;

import com.google.gson.Gson;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HofWevServerRestController {
    @RequestMapping(value = "/getLeagueDataJSON", method = RequestMethod.POST, produces = "application/json")
    public String getLeagueDataJSON(@RequestParam("leagueId") String leagueId) {
        //Retrieve the JSON data
        DataConsumer leagueData = Utilities.getLeagueData(leagueId);

        Gson gson = new Gson();
        return gson.toJson(leagueData);
    }
}
