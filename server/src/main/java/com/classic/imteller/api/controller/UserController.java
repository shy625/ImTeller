package com.classic.imteller.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import io.swagger.annotations.Api;

import io.swagger.annotations.ApiOperation;

@Api(value = "유저 API", tags={"유저"})
@CrossOrigin("*")
@RequestMapping("api/v1/user")
@RestController
public class UserController {
    @GetMapping("/signup")
    public String signUp(@PathVariable String s) {
        return s;
    }
}
