package com.posa.controller;

import com.posa.entity.JobPosting;
import com.posa.repository.JobPostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs/public")
public class PublicController {

    @Autowired
    private JobPostingRepository jobRepository;

    @GetMapping
    public ResponseEntity<?> getPublicJobs(
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String type) {
        List<JobPosting> jobs = jobRepository.findByIsActiveTrueOrderByCreatedAtDesc();
        if (skill != null && !skill.isBlank()) {
            final String s = skill.toLowerCase();
            jobs = jobs.stream()
                    .filter(j -> j.getRequiredSkills() != null && j.getRequiredSkills().toLowerCase().contains(s))
                    .toList();
        }
        if (location != null && !location.isBlank()) {
            final String l = location.toLowerCase();
            jobs = jobs.stream()
                    .filter(j -> j.getLocation() != null && j.getLocation().toLowerCase().contains(l))
                    .toList();
        }
        if (type != null && !type.isBlank()) {
            final String t = type.toLowerCase();
            jobs = jobs.stream()
                    .filter(j -> j.getJobType() != null && j.getJobType().toLowerCase().contains(t))
                    .toList();
        }
        return ResponseEntity.ok(Map.of("jobs", jobs, "total", jobs.size()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJob(@PathVariable Long id) {
        return jobRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
