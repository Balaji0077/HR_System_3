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
import org.springframework.web.bind.annotation.RestController;
import com.system.hr.entity.Job;
import com.system.hr.service.JobService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@Tag(name = "Jobs API", description = "Operations related to jobs")
public class JobController {
   
	@Autowired
	private JobService jobService;
  
	@Operation(summary = "Get Jobs", description = "Returns Jobs")
	@GetMapping("/api/jobs")
	public ResponseEntity<List<Job>> getCandidates() {
		
		  List<Job> listJobs = jobService.getJobs();
		 
		 return new ResponseEntity<List<Job>>(listJobs,HttpStatus.OK);
	}
	
	@Operation(summary = "Get Job by Id", description = "Returns a Job By Id")
	@GetMapping("/api/jobs/{id}")
	public ResponseEntity<Job> getCandidate(@PathVariable Long id){
		 Optional<Job> individual = jobService.getJob(id);
		 if(individual.isEmpty()) {
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		 }
		return ResponseEntity.status(HttpStatus.OK).body(individual.get());
	}
	
	@Operation(summary = "Post a Job", description = "Save a  Job")
	@PostMapping("/api/jobs")
	public ResponseEntity<Job> createCandidate(@RequestBody Job job){
		
		Job savedIndividual = jobService.createJob(job);
		
		return  ResponseEntity.status(HttpStatus.CREATED).body(savedIndividual);
	}
	
	@Operation(summary = "Remove a  Job By Id", description = "Remove a Job")
	@DeleteMapping("/api/jobs/{id}")
	public ResponseEntity<String> deleteCandidate(@PathVariable Long id){
		 Optional<Job> individual = jobService.getJob(id);
		 if(individual.isEmpty()) {
			 return new ResponseEntity<String>("Candidate Not Found",HttpStatus.BAD_REQUEST);
		 }
		 jobService.deleteJob(id);
		 return new ResponseEntity<String>("Candidate Deleted Successfully",HttpStatus.OK);
	}
	
	@Operation(summary = "Update Job detials by Id", description = "Update a Job when provided by Id")
	@PutMapping("/api/jobs/{id}")
	public ResponseEntity<Job> updateCandidate(@RequestBody Job job ,@PathVariable Long id){
		
		 Optional<Job> individual = jobService.getJob(id);
		 if(individual.isEmpty()) {
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		 }
		 Job updateIndividual = jobService.updateJob(job);
		 return ResponseEntity.status(HttpStatus.OK).body(updateIndividual);
		 
	}
}
