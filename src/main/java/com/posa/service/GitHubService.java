package com.posa.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GitHubService {

    @Value("${github.api.base-url}")
    private String baseUrl;

    @Value("${github.api.token}")
    private String token;

    @Value("${app.demo-mode:false}")
    private boolean demoMode;

    @Autowired private VivaService vivaService;

    private WebClient getClient() {
        return WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("Authorization", "Bearer " + token)
                .defaultHeader("Accept", "application/vnd.github.v3+json")
                .build();
    }

    public Map<String, Object> getUserInfo(String username) {
        if (demoMode && (token == null || token.contains("your_github_token"))) {
            return Map.of("login", username, "name", "Demo User", "bio", "Bio for " + username);
        }
        try {
            return getClient().get()
                    .uri("/users/" + username)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();
        } catch (Exception e) {
            System.err.println("GitHub User Info Error: " + e.getMessage());
            return Map.of("login", username, "name", username);
        }
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getRepositories(String username) {
        if (demoMode && (token == null || token.contains("your_github_token"))) {
            return List.of(
                Map.of("name", "DemoRepo1", "stargazers_count", 10, "language", "Java", "description", "A complex Java system"),
                Map.of("name", "DemoRepo2", "stargazers_count", 5, "language", "Python", "description", "AI data processing scripts")
            );
        }
        try {
            List list = getClient().get()
                    .uri("/users/" + username + "/repos?sort=updated&per_page=30")
                    .retrieve()
                    .bodyToFlux(Map.class)
                    .collectList()
                    .block();
            return list != null ? list : new ArrayList<>();
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> analyzeSkills(String username) {
        List<Map<String, Object>> repos = getRepositories(username);
        int totalStars = 0;
        Map<String, Integer> langCount = new LinkedHashMap<>();
        List<Map<String, String>> repoSummaries = new ArrayList<>();

        for (Map<String, Object> repo : repos) {
            Object starsObj = repo.get("stargazers_count");
            int stars = starsObj instanceof Integer ? (Integer) starsObj : 0;
            totalStars += stars;

            String lang = (String) repo.get("language");
            if (lang != null && !lang.isBlank()) langCount.merge(lang, 1, Integer::sum);
            
            repoSummaries.add(Map.of(
                "name", (String)repo.get("name"),
                "lang", lang != null ? lang : "Unknown",
                "desc", repo.get("description") != null ? (String)repo.get("description") : "No description"
            ));
        }

        // Use LLM for "Better Detection" of skills if not in demo mode
        Map<String, Object> llmAnalysis = null;
        if (!demoMode && token != null && !token.contains("your_github_token")) {
           llmAnalysis = vivaService.analyzeGithubPortfolio(username, repoSummaries);
        }

        Map<String, Integer> skillPercentages = llmAnalysis != null 
                ? (Map<String, Integer>) llmAnalysis.get("skills") 
                : calculateFallbackPercentages(langCount);

        List<String> techStack = llmAnalysis != null 
                ? (List<String>) llmAnalysis.get("techStack") 
                : new ArrayList<>(langCount.keySet());

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("username", username);
        result.put("totalRepos", repos.size());
        result.put("totalStars", totalStars);
        result.put("skillPercentages", skillPercentages);
        result.put("techStack", techStack);
        result.put("summary", llmAnalysis != null ? llmAnalysis.get("summary") : "Analysis based on repository metadata.");
        return result;
    }

    private Map<String, Integer> calculateFallbackPercentages(Map<String, Integer> langCount) {
        int total = langCount.values().stream().mapToInt(Integer::intValue).sum();
        Map<String, Integer> pct = new LinkedHashMap<>();
        langCount.forEach((k, v) -> pct.put(k, total > 0 ? (int) Math.round((v * 100.0) / total) : 0));
        return pct;
    }

    public double calculateSkillScore(Map<String, Object> data) {
        int repos = (Integer) data.getOrDefault("totalRepos", 0);
        int stars = (Integer) data.getOrDefault("totalStars", 0);
        @SuppressWarnings("unchecked")
        Map<String, Integer> skills = (Map<String, Integer>) data.getOrDefault("skillPercentages", Map.of());
        int langDiversity = skills.size();

        double repoScore = Math.min(repos * 2.0, 30);
        double starScore = Math.min(stars * 1.5, 20);
        double diversityScore = Math.min(langDiversity * 5.0, 20);
        double base = 30; // Better starting point
        double score = repoScore + starScore + diversityScore + base;
        return Math.min(Math.round(score * 10.0) / 10.0, 100.0);
    }
}

}

}
