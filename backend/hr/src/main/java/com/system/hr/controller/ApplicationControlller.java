package com.system.hr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.system.hr.dto.ApplicationDataDto;
import com.system.hr.entity.Application;
import com.system.hr.service.ApplicationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin(origins="http://localhost:5173/")
@Tag(name = "Application API", description = "Operations related to Application")
public class ApplicationControlller {
	
	@Autowired 
	ApplicationService applicationService;
   
	@Operation(summary = "Apply for job", description = "Apply for a job with job id and candidate id")	
	 @PostMapping("/api/jobs/{jobId}/apply")
	 public ResponseEntity<Application> postJob(@RequestBody ApplicationDataDto dataDto,@PathVariable Long jobId){
		  
		  Application app = applicationService.postJob(dataDto, jobId);
		  
		  return ResponseEntity.status(HttpStatus.OK).body(app);
	 }
	
	@Operation(summary = "Get Job Details", description = "Return a Job") 
	 @GetMapping("/api/jobs/names/{jobId}")
	 public ResponseEntity<List<String>> getNames(@PathVariable Long jobId){
		  
		 List<String> names = applicationService.getNames(jobId);
		 
		 return new ResponseEntity<List<String>>(names,HttpStatus.OK);
		 
	 }
}
