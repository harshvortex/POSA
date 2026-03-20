# PoSA - Proof of Skill Analysis

PoSA is an AI-driven platform that analyzes technical skills through GitHub integration and conducts automated technical interviews (Viva) using Hugging Face LLMs.

## Features

- **GitHub Integration**: Analyze repositories, stars, and languages to determine a candidate's Skill DNA and Tech Stack.
- **AI-Managed Interview (Viva)**: Automatically generate technical questions based on a topic and evaluate candidate responses using LLMs.
- **Recruiter Dashboard**: Filter and manage candidates based on verified skill scores and job fit.
- **Role-Based Access Control**: Secure endpoints for Candidates, Recruiters, and Admins.

## Technology Stack

- **Backend**: Spring Boot 3.3.0 (Java 21)
- **AI/LLM**: Hugging Face Inference API
- **Database**: MySQL 8.x
- **Security**: JWT (JSON Web Token) with Spring Security
- **Data**: Spring Data JPA

## Setup Instructions

### 1. Prerequisites
- Java 21 JDK
- Maven 3.x
- MySQL Server
- Hugging Face API Key (Access Token)

### 2. Configuration
Update `src/main/resources/application.properties` with your credentials:

```properties
# MySQL Configuration
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

# GitHub Configuration
github.api.token=your_github_token_here

# Hugging Face Configuration
huggingface.api.key=your_huggingface_token_here
huggingface.model.id=meta-llama/Llama-3-8B-Instruct
```

### 3. Build & Run
```bash
mvn clean install
mvn spring-boot:run
```

## API Documentation

### Auth
- `POST /api/auth/register`: Create a new user (Candidate or Recruiter).
- `POST /api/auth/login`: Authenticate and receive a JWT.

### Candidate
- `GET /api/candidate/profile`: View profile details.
- `POST /api/candidate/github/connect`: Analyze GitHub skills.
- `GET /api/candidate/dashboard`: Overview of stats and interview sessions.
- `POST /api/candidate/viva/start`: Start a new technical interview.
- `POST /api/candidate/viva/{sessionId}/submit`: Submit answers for evaluation.

### Recruiter
- `GET /api/recruiter/dashboard`: View talent pool overview.
- `GET /api/recruiter/candidates`: Search and filter candidates by skill/score.
- `POST /api/recruiter/jobs`: Create new job postings.

## Project Restructuring
The project has been restructured to merge the backend into the root directory, removing redundancy and improving maintainability. We have also added **Lombok** support to reduce boilerplate code.
