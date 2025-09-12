package com.system.hr.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.hr.dto.ApplicationDataDto;
import com.system.hr.entity.Application;
import com.system.hr.entity.Candidate;
import com.system.hr.entity.Job;
import com.system.hr.repository.ApplicationRepository;
import com.system.hr.repository.CandidateRepository;
import com.system.hr.repository.JobRepository;

@Service
public class ApplicationService {
    
	
	@Autowired
	ApplicationRepository applicationRepository;
	
	@Autowired
	CandidateRepository candidateRepository;
	
	@Autowired
	JobRepository jobRepository;
	
	public Application postJob(ApplicationDataDto dataDto,Long jobId) {
		  String email = dataDto.getEmail();
		  
		  Candidate candidate =  candidateRepository.getByEmail(email);
		  Job job = jobRepository.getById(jobId);
		  
		  
		   Application app = new Application();
		   app.setCandidateId(candidate.getId());
		   app.setJobId(job.getId());
		   
		   return applicationRepository.save(app);   
		  
	}
	
	public List<String> getNames(Long jobId){
		 return applicationRepository.fetchNames(jobId);
	}
}
