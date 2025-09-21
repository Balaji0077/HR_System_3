package com.system.hr.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.system.hr.dto.JwtTokenDto;
import com.system.hr.dto.LoginDto;
import com.system.hr.entity.Candidate;
import com.system.hr.entity.User;
import com.system.hr.service.UserService;


@RestController
@CrossOrigin(origins="http://localhost:5173")
public class UserController {
    
	@Autowired 
	UserService userService;
	
	@PostMapping("/api/auth/register")
	public ResponseEntity<String> addUser(@RequestBody User user){
		
		  String response = userService.addUser(user);
		  
		  if (response.contains("already exists")) {
	            return ResponseEntity.badRequest().body(response); 
	        }
		  
		  return ResponseEntity.ok(response);
	}
	
	
	 @PostMapping("/api/auth/login")
	    public ResponseEntity<JwtTokenDto> login(@RequestBody LoginDto request) {
	        return ResponseEntity.ok(userService.login(request));
	    }

	
    @GetMapping("/api/check/{email}")
       public ResponseEntity<User> getDetails(@PathVariable String email){
    	Optional<User> individual = userService.getDetails(email);
		 if(individual.isEmpty()) {
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		 }
		return ResponseEntity.status(HttpStatus.OK).body(individual.get());
    }
}
