package com.task_scheduler.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class TestController {
    @GetMapping("/")
    public String home(){
        return "smart task scheduler backend is running";
    }

    @GetMapping("/api/test")
    public String test(){
        return "backend is working";
    }
    
    
}
