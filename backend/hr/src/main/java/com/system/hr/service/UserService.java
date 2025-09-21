package com.system.hr.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.system.hr.dto.JwtTokenDto;
import com.system.hr.dto.LoginDto;
import com.system.hr.entity.User;
import com.system.hr.repository.UserRepository;
import com.system.hr.security.JwtUtil;

@Service
public class UserService {
	
	
	
	 @Autowired
	  private PasswordEncoder passwordEncoder;
	 
	 @Autowired 
	 private UserRepository userRepository;
	 
	 @Autowired
	    private AuthenticationManager authenticationManager;
	 
	 @Autowired
	    private JwtUtil jwtUtil;
	 
	 
	 
   
	public String addUser(User user) {
		
		 if (userRepository.existsByEmail(user.getEmail())) {
	            return "User already exists with this email!"; 
	        }
		
		    User newUser = new User();
	        newUser.setEmail(user.getEmail());
	        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
	        newUser.setRole(user.getRole());  
		
		 
		 userRepository.save(newUser);
		 
		 return "User registered successfully!";
	}
	
  
    
    public JwtTokenDto login(LoginDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        
        return new JwtTokenDto(token);
    }
    
    
    public Optional<User> getDetails(String email){
    	 return  userRepository.findByEmail(email);
    }
}
