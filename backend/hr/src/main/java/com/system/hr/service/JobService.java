package com.system.hr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.system.hr.entity.Job;

import com.system.hr.repository.JobRepository;

@Service
public class JobService {
	@Autowired
	private JobRepository jobRepository;
     
	public List<Job> getJobs(){
		 return jobRepository.findAll();
	}
	
	public Job createJob(Job individual) {
		
		return jobRepository.save(individual);
	}
	
	public Optional<Job> getJob(Long id) {
		 return jobRepository.findById(id);
	}
	
	public void deleteJob(Long id) {
		jobRepository.deleteById(id);
	}
	
	public Job updateJob(Job updateData) {
		 return jobRepository.save(updateData);
	}
}
