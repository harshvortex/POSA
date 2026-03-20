package com.posa.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.posa.entity.*;
import com.posa.repository.*;
import com.posa.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;
@RestController
@RequestMapping("/api/candidate")
public class CandidateController {
@Autowired private UserRepository userRepository;
@Autowired private CandidateProfileRepository profileRepository;
@Autowired private VivaSessionRepository vivaRepository;
@Autowired private GitHubService gitHubService;
@Autowired private VivaService vivaService;
private final ObjectMapper mapper=new ObjectMapper();
@GetMapping("/profile")
public ResponseEntity<?> getProfile(Authentication auth){
User user=getUser(auth);
CandidateProfile profile=profileRepository.findByUser(user).orElse(null);
if(profile==null) return ResponseEntity.ok(Map.of("message","Profile not created yet"));
return ResponseEntity.ok(profile);}
@PostMapping("/github/connect")
public ResponseEntity<?> connectGitHub(@RequestBody Map<String,String> req,Authentication auth){
String githubUsername=req.get("githubUsername");
User user=getUser(auth);
try{Map<String,Object> analysis=gitHubService.analyzeSkills(githubUsername);
double skillScore=gitHubService.calculateSkillScore(analysis);
CandidateProfile profile=profileRepository.findByUser(user).orElse(new CandidateProfile());
profile.setUser(user);profile.setGithubUsername(githubUsername);
profile.setTotalRepos((Integer)analysis.get("totalRepos"));
profile.setTotalStars((Integer)analysis.get("totalStars"));
profile.setSkillScore(skillScore);profile.setJobFitScore(skillScore*0.95);profile.setGrowthScore(skillScore*0.97);
profile.setSkillDna(mapper.writeValueAsString(analysis.get("skillPercentages")));
profile.setTechStack(mapper.writeValueAsString(analysis.get("techStack")));
profile.setSummary((String)analysis.get("summary"));
profile.setTopProjects(mapper.writeValueAsString(analysis.get("topProjects")));

profile.setIsVerified(true);profile.setLastSynced(LocalDateTime.now());
profileRepository.save(profile);user.setGithubUsername(githubUsername);userRepository.save(user);
return ResponseEntity.ok(Map.of("message","GitHub connected!","profile",profile));
}catch(Exception e){return ResponseEntity.badRequest().body(Map.of("error",e.getMessage()));}}
@GetMapping("/dashboard")
public ResponseEntity<?> getDashboard(Authentication auth){
User user=getUser(auth);
CandidateProfile profile=profileRepository.findByUser(user).orElse(null);
List<VivaSession> vivas=vivaRepository.findByCandidateId(user.getId());
return ResponseEntity.ok(Map.of("user",Map.of("name",user.getName(),"email",user.getEmail()),"profile",profile!=null?profile:"not created","vivaSessions",vivas));}
@PostMapping("/viva/start")
public ResponseEntity<?> startViva(@RequestBody Map<String,String> req,Authentication auth){
User user=getUser(auth);
String topic=req.get("topic");
List<String> questions=vivaService.generateQuestions(topic,List.of());
VivaSession session=new VivaSession();
session.setCandidate(user);session.setTopic(topic);
try{session.setQuestions(mapper.writeValueAsString(questions));}catch(Exception e){}  
session.setStatus("IN_PROGRESS");session.setStartedAt(LocalDateTime.now());
vivaRepository.save(session);
return ResponseEntity.ok(Map.of("sessionId",session.getId(),"topic",topic,"questions",questions));}
@PostMapping("/viva/{sessionId}/submit")
public ResponseEntity<?> submitViva(@PathVariable Long sessionId,@RequestBody Map<String,List<String>> req,Authentication auth){
VivaSession session=vivaRepository.findById(sessionId).orElseThrow();
try{List<String> answers=req.get("answers");
Map<String,Object> eval=vivaService.evaluateAnswers(session.getTopic(),List.of(),answers);
session.setAnswers(mapper.writeValueAsString(answers));
session.setEvaluation(mapper.writeValueAsString(eval));
session.setScore(Double.valueOf(eval.get("score").toString()));
session.setStatus("COMPLETED");session.setCompletedAt(LocalDateTime.now());
vivaRepository.save(session);
return ResponseEntity.ok(Map.of("message","Viva completed!","score",session.getScore(),"evaluation",eval));
}catch(Exception e){return ResponseEntity.badRequest().body(Map.of("error",e.getMessage()));}}
@GetMapping("/viva/history")
public ResponseEntity<?> getVivaHistory(Authentication auth){return ResponseEntity.ok(vivaRepository.findByCandidateId(getUser(auth).getId()));}
private User getUser(Authentication auth){return userRepository.findByEmail(auth.getName()).orElseThrow();}}
