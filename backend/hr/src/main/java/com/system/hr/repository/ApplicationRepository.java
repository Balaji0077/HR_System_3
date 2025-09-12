package com.system.hr.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.system.hr.entity.Application;

@Repository
public interface ApplicationRepository  extends JpaRepository<Application,Long> {
	
	
	@Query(value="SELECT DISTINCT c.name FROM application a INNER JOIN candidate c ON a.candidate_id=c.id WHERE a.job_id=:job_id",nativeQuery=true)
	List<String> fetchNames(@Param("job_id") Long jobId);
    
}
