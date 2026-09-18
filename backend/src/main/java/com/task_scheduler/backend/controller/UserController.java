package com.task_scheduler.backend.controller;

import com.task_scheduler.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.RestController;

import com.task_scheduler.backend.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import com.task_scheduler.backend.service.UserService;
import com.task_scheduler.backend.dto.RegisterRequest;
import com.task_scheduler.backend.dto.ChangePasswordRequest;
import com.task_scheduler.backend.dto.LoginRequest;
import com.task_scheduler.backend.dto.LoginResponse;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request){
        return userService.register(request);
    }
    
    @GetMapping
    public Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        System.out.println("Login request received: " + request.getEmail());
        return userService.login(request);
    }
    

    @GetMapping("/me")
    public User getCurrentUser(Authentication authentication) {

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
        

    @PutMapping("/change-password")
    public String changePassword(@RequestBody ChangePasswordRequest request, Authentication authentication){
        String email = authentication.getName();

        userService.changePassword(email, request.getCurrentPassword(), request.getNewPassword());

        return "Password changed successfully!";
    }
    

}

