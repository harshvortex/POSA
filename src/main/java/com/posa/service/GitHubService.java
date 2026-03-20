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
            throw new RuntimeException("GitHub user not found: " + username);
        }
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getRepositories(String username) {
        if (demoMode && (token == null || token.contains("your_github_token"))) {
            return List.of(
                Map.of("name", "DemoRepo1", "stargazers_count", 10, "language", "Java"),
                Map.of("name", "DemoRepo2", "stargazers_count", 5, "language", "Python")
            );
        }
        try {
            List list = getClient().get()
                    .uri("/users/" + username + "/repos?sort=updated&per_page=50")
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
        List<Map<String, Object>> topProjects = new ArrayList<>();

        for (Map<String, Object> repo : repos) {
            Object starsObj = repo.get("stargazers_count");
            int stars = starsObj instanceof Integer ? (Integer) starsObj : 0;
            totalStars += stars;

            String lang = (String) repo.get("language");
            if (lang != null && !lang.isBlank()) {
                langCount.merge(lang, 1, Integer::sum);
            }

            Map<String, Object> proj = new LinkedHashMap<>();
            proj.put("name", repo.get("name"));
            proj.put("stars", stars);
            proj.put("language", lang != null ? lang : "Unknown");
            proj.put("url", repo.get("html_url"));
            proj.put("description", repo.get("description"));
            proj.put("forks", repo.getOrDefault("forks_count", 0));
            topProjects.add(proj);
        }

        // Sort top projects by stars
        topProjects.sort((a, b) -> Integer.compare((Integer) b.get("stars"), (Integer) a.get("stars")));

        // Calculate skill percentages from language frequency
        int totalLangRepos = langCount.values().stream().mapToInt(Integer::intValue).sum();
        Map<String, Integer> skillPercentages = new LinkedHashMap<>();
        langCount.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(8)
                .forEach(e -> {
                    int pct = totalLangRepos > 0 ? (int) Math.round((e.getValue() * 100.0) / totalLangRepos) : 0;
                    skillPercentages.put(e.getKey(), pct);
                });

        List<String> techStack = new ArrayList<>(langCount.keySet().stream()
                .sorted(Comparator.comparingInt(langCount::get).reversed())
                .limit(10)
                .toList());

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("username", username);
        result.put("totalRepos", repos.size());
        result.put("totalStars", totalStars);
        result.put("skillPercentages", skillPercentages);
        result.put("techStack", techStack);
        result.put("topProjects", topProjects.subList(0, Math.min(5, topProjects.size())));
        return result;
    }

    public double calculateSkillScore(Map<String, Object> data) {
        int repos = (Integer) data.getOrDefault("totalRepos", 0);
        int stars = (Integer) data.getOrDefault("totalStars", 0);
        @SuppressWarnings("unchecked")
        Map<String, Integer> skills = (Map<String, Integer>) data.getOrDefault("skillPercentages", Map.of());
        int langDiversity = skills.size();

        double repoScore = Math.min(repos * 2.0, 35);
        double starScore = Math.min(stars * 1.5, 25);
        double diversityScore = Math.min(langDiversity * 3.0, 15);
        double base = 25;
        double score = repoScore + starScore + diversityScore + base;
        return Math.min(Math.round(score * 10.0) / 10.0, 100.0);
    }
}

}
