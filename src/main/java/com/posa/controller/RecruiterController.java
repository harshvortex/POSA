package com.posa.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.posa.entity.*;

import com.posa.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recruiter")
public class RecruiterController {

    @Autowired private UserRepository userRepository;
    @Autowired private CandidateProfileRepository profileRepository;
    @Autowired private JobPostingRepository jobRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(Authentication auth) {
        List<CandidateProfile> all = profileRepository.findAllByOrderBySkillScoreDesc();
        List<JobPosting> jobs = jobRepository.findByRecruiterId(getUser(auth).getId());
        return ResponseEntity.ok(Map.of(
                "totalCandidates", all.size(),
                "verifiedCandidates", all.stream().filter(CandidateProfile::getIsVerified).count(),
                "activeJobs", jobs.stream().filter(JobPosting::getIsActive).count(),
                "recentCandidates", all.stream().limit(10).collect(Collectors.toList()),
                "myJobs", jobs
        ));
    }

    @GetMapping("/candidates")
    public ResponseEntity<?> getCandidates(
            @RequestParam(required = false) Double minScore,
            @RequestParam(required = false) String skill) {
        List<CandidateProfile> profiles = minScore != null
                ? profileRepository.findByMinSkillScore(minScore)
                : profileRepository.findAllByOrderBySkillScoreDesc();
        if (skill != null && !skill.isEmpty()) {
            final String s = skill.toLowerCase();
            profiles = profiles.stream()
                    .filter(p -> p.getTechStack() != null && p.getTechStack().toLowerCase().contains(s))
                    .collect(Collectors.toList());
        }
        return ResponseEntity.ok(Map.of("candidates", profiles, "total", profiles.size()));
    }

    @GetMapping("/candidates/{id}")
    public ResponseEntity<?> getCandidateDetail(@PathVariable Long id) {
        return profileRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/jobs")
    public ResponseEntity<?> createJob(@RequestBody JobRequest req, Authentication auth) {
        User recruiter = getUser(auth);
        JobPosting job = new JobPosting();
        job.setRecruiter(recruiter);
        job.setTitle(req.getTitle());
        job.setCompany(req.getCompany());
        job.setLocation(req.getLocation());
        job.setSalaryRange(req.getSalaryRange());
        job.setDescription(req.getDescription());
        job.setRequiredSkills(req.getRequiredSkills());
        job.setMinSkillScore(req.getMinSkillScore());
        job.setIsActive(true);
        jobRepository.save(job);
        return ResponseEntity.ok(Map.of("message", "Job posted!", "job", job));
    }

    @GetMapping("/jobs")
    public ResponseEntity<?> getMyJobs(Authentication auth) {
        return ResponseEntity.ok(jobRepository.findByRecruiterId(getUser(auth).getId()));
    }

    private User getUser(Authentication auth) {
        return userRepository.findByEmail(auth.getName()).orElseThrow();
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class JobRequest {
        private String title;
        private String company;
        private String location;
        private String salaryRange;
        private String description;
        private String requiredSkills;
        private Integer minSkillScore;
    }
}