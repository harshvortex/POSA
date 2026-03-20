package com.posa.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "viva_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VivaSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    private User candidate;

    private String topic;

    @Column(columnDefinition = "TEXT")
    private String questions;

    @Column(columnDefinition = "TEXT")
    private String answers;

    @Column(columnDefinition = "TEXT")
    private String evaluation;

    private Double score;
    private String status;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private LocalDateTime createdAt = LocalDateTime.now();
}