package com.icovest.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleController {

    @GetMapping("/api/hello-world")
    public String sayHello() {
        return "Hello!";
    }
}
