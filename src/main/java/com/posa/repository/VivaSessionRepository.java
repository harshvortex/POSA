package com.posa.repository;
import com.posa.entity.VivaSession;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface VivaSessionRepository extends JpaRepository<VivaSession,Long> {
List<VivaSession> findByCandidateId(Long candidateId);
List<VivaSession> findByCandidateIdAndStatus(Long candidateId,String status);
}
