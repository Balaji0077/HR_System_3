package com.system.hr.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.system.hr.entity.Candidate;
import com.system.hr.service.CandidateService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin(origins="http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
allowedHeaders = "*",
allowCredentials = "true")
@Tag(name = "Candidate API", description = "Operations related to candidates")
public class CandidateController {
	
	@Autowired
	private CandidateService candidateService;
    
	@Operation(summary = "Get candidates", description = "Returns a candidates")
	@GetMapping("/api/candidates")
	public ResponseEntity<List<Candidate>> getCandidates() {
		
		  List<Candidate> listCandidates = candidateService.getCandidates();
		 
		 return new ResponseEntity<List<Candidate>>(listCandidates,HttpStatus.OK);
	}
	
	@Operation(summary = "Get candidate by Id", description = "Returns a candidate when provided by Id")
	@GetMapping("/api/candidates/{id}")
	public ResponseEntity<Candidate> getCandidate(@PathVariable Long id){
		 Optional<Candidate> individual = candidateService.getCandidate(id);
		 if(individual.isEmpty()) {
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		 }
		return ResponseEntity.status(HttpStatus.OK).body(individual.get());
	}
	
	@Operation(summary = "Save candidate", description = "Save a candidate")
	@PostMapping("/api/candidates")
	public ResponseEntity<Candidate> createCandidate(@RequestBody Candidate candidate){
		
		Candidate savedIndividual = candidateService.createCandidate(candidate);
		
		return  ResponseEntity.status(HttpStatus.CREATED).body(savedIndividual);
	}
	
	
	@Operation(summary = "Delete Candidate by Id", description = "Delete a candidate")
	@DeleteMapping("/api/candidates/{id}")
	public ResponseEntity<String> deleteCandidate(@PathVariable Long id){
		 Optional<Candidate> individual = candidateService.getCandidate(id);
		 if(individual.isEmpty()) {
			 return new ResponseEntity<String>("Candidate Not Found",HttpStatus.BAD_REQUEST);
		 }
		 candidateService.deleteCandidate(id);
		 return new ResponseEntity<String>("Candidate Deleted Successfully",HttpStatus.OK);
	}
	
	@Operation(summary = "Update Candidate by Id", description = "Update the candidate information")
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
