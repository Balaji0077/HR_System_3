package com.system.hr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.hr.entity.Candidate;
import com.system.hr.repository.CandidateRepository;

@Service
public class CandidateService {
	
	@Autowired
	private CandidateRepository candidateRepository;
     
	public List<Candidate> getCandidates(){
		 return candidateRepository.findAll();
	}
	
	public Candidate createCandidate(Candidate individual) {
		
		return candidateRepository.save(individual);
	}
	
	public Optional<Candidate> getCandidate(Long id) {
		 return candidateRepository.findById(id);
	}
	
	public void deleteCandidate(Long id) {
		candidateRepository.deleteById(id);
	}
	
	public Candidate updateCandidate(Candidate updateData) {
		 return candidateRepository.save(updateData);
	}
}
