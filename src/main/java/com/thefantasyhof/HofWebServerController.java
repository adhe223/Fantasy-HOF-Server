package com.thefantasyhof;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.apache.commons.io.IOUtils;

import java.io.InputStream;
import java.io.StringWriter;
import java.net.URL;
import java.net.URLConnection;

@RestController
public class HofWebServerController {
    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @RequestMapping("/getJSON")
    public String getJSON() {
        String url = "https://agile-badlands-78491.herokuapp.com/getLeagueDataJSON?leagueId=44169";
        String charset = "UTF-8";

        try {
            URLConnection connection = new URL(url).openConnection();
            InputStream response = new URL(url).openStream();

            StringWriter writer = new StringWriter();
            IOUtils.copy(response, writer);
            String responseString = writer.toString();

            DataConsumer cd = new DataConsumer(responseString);
            cd.tabulateMatchupStats();

            return responseString;
        } catch (Exception e){ return "HTTP GET Failed!"; }
    }
}
