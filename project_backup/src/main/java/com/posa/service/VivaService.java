package com.posa.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
public class VivaService {

    @Value("${huggingface.api.key}")
    private String hfKey;

    @Value("${huggingface.api.url}")
    private String hfUrl;

    @Value("${huggingface.model.id:meta-llama/Meta-Llama-3-70B-Instruct}")
    private String modelId;


    @Value("${app.demo-mode:false}")
    private boolean demoMode;

    private final ObjectMapper mapper = new ObjectMapper();

    private WebClient getClient() {
        return WebClient.builder()
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + hfKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public List<String> generateQuestions(String topic, List<String> techStack) {
        if (demoMode && (hfKey == null || hfKey.contains("your_huggingface_token"))) {
            return getFallbackQuestions(topic);
        }
        String stackInfo = techStack != null && !techStack.isEmpty()
                ? "Tech stack: " + String.join(", ", techStack) + ". "
                : "";
        String prompt = "Generate exactly 5 technical interview questions for topic: '" + topic + "'. "
                + stackInfo
                + "Respond ONLY with a JSON array of strings. Do not include any other text.";

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("inputs", prompt);
        body.put("parameters", Map.of("max_new_tokens", 500, "return_full_text", false));

        try {
            List<Map<String, Object>> resList = getClient().post()
                    .uri(hfUrl + modelId)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {})
                    .block();

            String content = (String) resList.get(0).get("generated_text");
            content = extractJson(content);

            if (content.startsWith("[")) {
                return mapper.readValue(content, new TypeReference<List<String>>() {});
            }
        } catch (Exception e) {
            System.err.println("HF API Error: " + e.getMessage());
        }
        return getFallbackQuestions(topic);
    }

    public Map<String, Object> evaluateAnswers(String topic, List<String> questions, List<String> answers) {
        if (demoMode || hfKey == null || hfKey.contains("your_huggingface_token")) {
            return getMockEvaluation(topic, answers);
        }

        StringBuilder prompt = new StringBuilder();
        prompt.append("Task: Evaluate interview answers for topic '").append(topic).append("'.\n");
        for (int i = 0; i < Math.min(questions.size(), answers.size()); i++) {
            prompt.append("Q: ").append(questions.get(i)).append("\nA: ").append(answers.get(i)).append("\n");
        }
        prompt.append("\nReturn ONLY a JSON object with: score (0-100), feedback (string), strengths (array), improvements (array).");

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("inputs", prompt.toString());
        body.put("parameters", Map.of("max_new_tokens", 600, "return_full_text", false));

        try {
            List<Map<String, Object>> resList = getClient().post()
                    .uri(hfUrl + modelId)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {})
                    .block();

            String content = (String) resList.get(0).get("generated_text");
            content = extractJson(content);

            if (content.startsWith("{")) {
                return mapper.readValue(content, new TypeReference<Map<String, Object>>() {});
            }
        } catch (Exception e) {
            System.err.println("HF API Evaluation Error: " + e.getMessage());
        }

        return getMockEvaluation(topic, answers);
    }



    public Map<String, Object> analyzeGithubPortfolio(String username, List<Map<String, String>> repos) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Analyze this GitHub portfolio for user '").append(username).append("'.\nRepositories:\n");
        for (var r : repos) {
            prompt.append("- ").append(r.get("name")).append(" (").append(r.get("lang")).append("): ").append(r.get("desc")).append("\n");
        }
        prompt.append("\nReturn ONLY a JSON object with: skills (map of lang/skill to percentage 0-100), techStack (list of strings), summary (short professional bio).");

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("inputs", prompt.toString());
        body.put("parameters", Map.of("max_new_tokens", 800, "return_full_text", false));

        try {
            List<Map<String, Object>> resList = getClient().post()
                    .uri(hfUrl + modelId)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {})
                    .block();

            String content = extractJson((String) resList.get(0).get("generated_text"));
            return mapper.readValue(content, new TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            System.err.println("GitHub Portfolio LLM Error: " + e.getMessage());
        }
        return null;
    }

    private String extractJson(String text) {

        if (text == null) return "";
        int startArr = text.indexOf("[");
        int startObj = text.indexOf("{");
        int start = -1;
        if (startArr != -1 && (startObj == -1 || startArr < startObj)) start = startArr;
        else if (startObj != -1) start = startObj;

        if (start == -1) return text.trim();

        int endArr = text.lastIndexOf("]");
        int endObj = text.lastIndexOf("}");
        int end = -1;
        if (endArr != -1 && endArr > endObj) end = endArr;
        else if (endObj != -1) end = endObj;

        if (end == -1) return text.substring(start).trim();
        return text.substring(start, end + 1).trim();
    }


    private Map<String, Object> getMockEvaluation(String topic, List<String> answers) {
        int filledAnswers = (int) answers.stream().filter(a -> a != null && a.length() > 20).count();
        int score = 40 + (filledAnswers * 12);
        score = Math.min(score, 95);
        return Map.of(
                "score", score,
                "feedback", "Good effort on " + topic + ". Your answers show understanding of core concepts.",
                "strengths", List.of("Clear communication", "Practical examples used"),
                "improvements", List.of("Add more depth to technical explanations", "Include edge cases")
        );
    }

    private List<String> getFallbackQuestions(String topic) {
        return List.of(
                "Explain the core concepts of " + topic + " and how they work together.",
                "What are the best practices you follow when working with " + topic + "?",
                "Describe a challenging problem you solved using " + topic + ".",
                "How do you handle errors and edge cases in " + topic + "?",
                "What performance considerations do you keep in mind when using " + topic + "?"
        );
    }
}
