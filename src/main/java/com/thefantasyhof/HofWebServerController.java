package com.thefantasyhof;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HofWebServerController {
    @RequestMapping(value = {"", "/", "/hof"})
    public String hof() {
        return "hof";
    }
}
