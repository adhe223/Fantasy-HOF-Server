package com.thefantasyhof;

import com.google.gson.Gson;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HofWevServerRestController {
    @RequestMapping(value = "/getLeagueDataJSON", produces = "application/json")
    public String getLeagueDataJSON(Model model) {
        //Retrieve the JSON data
        DataConsumer leagueData = Utilities.getLeagueData();
        model.addAttribute("leagueData", leagueData);

        Gson gson = new Gson();
        return gson.toJson(leagueData);
    }
}
