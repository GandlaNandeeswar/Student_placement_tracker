package com.studentTracker.demo.service;





import com.studentTracker.demo.dto.LoginRequest;
import com.studentTracker.demo.dto.RegisterRequest;
import com.studentTracker.demo.entity.Role;
import com.studentTracker.demo.entity.User;
import com.studentTracker.demo.repository.UserRepository;
import com.studentTracker.demo.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String register(RegisterRequest request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        repository.save(user);

        return "User Registered Successfully";
    }

    public String login(LoginRequest request) {

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return jwtUtil.generateToken(user.getEmail());
    }
}