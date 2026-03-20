package com.posa.repository;
import com.posa.entity.CandidateProfile;
import com.posa.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;
public interface CandidateProfileRepository extends JpaRepository<CandidateProfile,Long> {
Optional<CandidateProfile> findByUser(User user);
Optional<CandidateProfile> findByUserId(Long userId);
@Query("SELECT c FROM CandidateProfile c WHERE c.skillScore >= :minScore ORDER BY c.skillScore DESC")
List<CandidateProfile> findByMinSkillScore(Double minScore);
List<CandidateProfile> findAllByOrderBySkillScoreDesc();
}
