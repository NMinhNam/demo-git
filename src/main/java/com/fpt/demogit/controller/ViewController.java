package com.fpt.demogit.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/")
    public String viewStudent() {
        return "index";
    }
}
