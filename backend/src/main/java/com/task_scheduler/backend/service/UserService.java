package com.task_scheduler.backend.service;



import com.task_scheduler.backend.dto.RegisterRequest;
import com.task_scheduler.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.task_scheduler.backend.repository.UserRepository;
import com.task_scheduler.backend.security.JwtService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.task_scheduler.backend.dto.LoginRequest;
import com.task_scheduler.backend.dto.LoginResponse;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;


    public User register(RegisterRequest request){
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists!");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {

    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            )
    );

    String token = jwtService.generateToken(request.getEmail());

    return new LoginResponse(
            "Login Successful",
            token
        );
    }


    public User getUserByEmail(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not foung"));
    }

    public void changePassword(String email, String currentPassword, String newPassword){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(currentPassword, user.getPassword())){
            throw new RuntimeException("Current password is incorrect");
        }
            
        if(newPassword==null || newPassword.length()<6){
            throw new RuntimeException("New password must be at least 6 characters long");
        }

        if(passwordEncoder.matches(newPassword, user.getPassword())){
            throw new RuntimeException("New password cannot be the same as the current password");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

}
