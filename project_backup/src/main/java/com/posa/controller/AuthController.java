package com.posa.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.posa.entity.User;

import com.posa.repository.UserRepository;
import com.posa.security.JwtUtil;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    @Value("${app.demo-mode:false}")
    private boolean demoMode;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail()))
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered!"));
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(User.Role.valueOf(req.getRole().toUpperCase()));
        if (req.getCompany() != null) user.setCompany(req.getCompany());
        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", Map.of("id", user.getId(), "name", user.getName(), "email", user.getEmail(), "role", user.getRole()),
                "message", "Registration successful! (Demo Mode: "+demoMode+")"
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail()).orElse(null);
        if (user == null) {
            if (demoMode) {
                // Auto-register in demo mode
                RegisterRequest rr = new RegisterRequest(req.getEmail().split("@")[0], req.getEmail(), "demo123", "CANDIDATE", "Demo Corp");
                return register(rr);
            }
            return ResponseEntity.status(401).body(Map.of("error", "User not found!"));
        }
        
        boolean passMatch = passwordEncoder.matches(req.getPassword(), user.getPassword());
        if (!passMatch && !demoMode) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid password!"));
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", Map.of("id", user.getId(), "name", user.getName(), "email", user.getEmail(), "role", user.getRole()),
                "message", "Login successful! (Demo Mode: "+demoMode+")"
        ));
    }


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        private String role;
        private String company;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {
        @NotBlank
        @Email
        private String email;
        @NotBlank
        private String password;
    }
}