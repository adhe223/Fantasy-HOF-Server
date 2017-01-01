package com.thefantasyhof;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HofWebServerController {
    @RequestMapping("/hof")
    public String hof(Model model) {
        //Retrieve the JSON data
        DataConsumer leagueData = Utilities.getLeagueData();
        //DataConsumer leagueData = null;
        model.addAttribute("leagueData", leagueData);

        return "hof";
    }
}
