package com.posa.repository;
import com.posa.entity.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface JobPostingRepository extends JpaRepository<JobPosting,Long> {
List<JobPosting> findByRecruiterId(Long recruiterId);
List<JobPosting> findByIsActiveTrue();
List<JobPosting> findByIsActiveTrueOrderByCreatedAtDesc();
}
