package com.system.hr.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.system.hr.entity.Candidate;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate,Long>{
      
	public Candidate getByEmail(String email);
}
