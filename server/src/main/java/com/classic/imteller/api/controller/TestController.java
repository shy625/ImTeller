package com.classic.imteller.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/test/{s}")
    public String getTest(@PathVariable String s) {
        return s;
    }
}
