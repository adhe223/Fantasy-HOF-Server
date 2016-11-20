package com.thefantasyhof;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HofWebServerController {
    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }
}
