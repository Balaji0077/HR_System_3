package com.system.hr.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.system.hr.entity.Candidate;
import com.system.hr.service.CandidateService;

@RestController
public class CandidateController {
	
	@Autowired
	private CandidateService candidateService;
  
	@GetMapping("/api/candidates")
	public ResponseEntity<List<Candidate>> getCandidates() {
		
		  List<Candidate> listCandidates = candidateService.getCandidates();
		 
		 return new ResponseEntity<List<Candidate>>(listCandidates,HttpStatus.OK);
	}
	
	@PostMapping("/api/candidates")
	public ResponseEntity<Candidate> createCandidate(@RequestBody Candidate candidate){
		
		Candidate savedIndividual = candidateService.createCandidate(candidate);
		
		return  ResponseEntity.status(HttpStatus.CREATED).body(savedIndividual);
	}
	
	@DeleteMapping("/api/candidates/{id}")
	public ResponseEntity<String> deleteCandidate(@PathVariable Long id){
		 Optional<Candidate> individual = candidateService.getCandidate(id);
		 if(individual.isEmpty()) {
			 return new ResponseEntity<String>("Candidate Not Found",HttpStatus.BAD_REQUEST);
		 }
		 candidateService.deleteCandidate(id);
		 return new ResponseEntity<String>("Candidate Deleted Successfully",HttpStatus.OK);
	}
	
	@PutMapping("/api/candidates/{id}")
	public ResponseEntity<Candidate> updateCandidate(@RequestBody Candidate candidate ,@PathVariable Long id){
		
		 Optional<Candidate> individual = candidateService.getCandidate(id);
		 if(individual.isEmpty()) {
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		 }
		 Candidate updateIndividual = candidateService.updateCandidate(candidate);
		 return ResponseEntity.status(HttpStatus.OK).body(updateIndividual);
		 
	}
	
	
} 
