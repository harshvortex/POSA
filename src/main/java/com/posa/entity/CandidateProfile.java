package com.posa.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "candidate_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidateProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String githubUsername;
    private Integer totalRepos;
    private Integer totalStars;
    private Double skillScore;
    private Double jobFitScore;
    private Double growthScore;

    @Column(columnDefinition = "TEXT")
    private String skillDna;

    @Column(columnDefinition = "TEXT")
    private String techStack;

    @Column(columnDefinition = "TEXT")
    private String topProjects;

    private Boolean isVerified = false;
    private Boolean vivaCompleted = false;
    private LocalDateTime lastSynced;
    private LocalDateTime createdAt = LocalDateTime.now();
}