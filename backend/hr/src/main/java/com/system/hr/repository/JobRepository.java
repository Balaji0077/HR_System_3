package com.system.hr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.system.hr.entity.Job;

@Repository

public interface JobRepository extends JpaRepository<Job,Long>{
  
}
