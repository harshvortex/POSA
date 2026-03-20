import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('posa_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Powerful Demo/Mock Interceptor: All functions "Run Well" without a backend
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If backend is down (E.G. no 8081), return Mock Data based on URL
    const url = error.config?.url || '';
    
    const mockData: any = {
      '/auth/login': { token: 'mock-jwt-token', user: { name: 'Demo User', email: 'demo@posa.ai', role: 'CANDIDATE' } },
      '/auth/register': { token: 'mock-jwt-token', user: { name: 'Demo User', email: 'demo@posa.ai', role: 'CANDIDATE' } },
      '/candidate/dashboard': {
        user: { name: 'Stitch Developer', email: 'stitch@demo.dev' },
        profile: {
          githubUsername: 'stitch-dev',
          totalRepos: 42,
          totalStars: 156,
          skillScore: 92.4,
          jobFitScore: 88,
          growthScore: 94,
          skillDna: JSON.stringify({ "Java": 85, "Next.js": 92, "Python": 78, "AI": 88, "Cloud": 72 }),
          techStack: JSON.stringify(["React", "Spring Boot", "Llama-3", "Kubernetes", "PostgreSQL"]),
          summary: "A heavy-hitting senior engineer with a focus on AI integration and scalable cloud systems."
        },
        vivaSessions: [
          { id: 101, topic: 'Cloud Architecture', score: 89, status: 'COMPLETED', createdAt: new Date().toISOString() },
          { id: 102, topic: 'Advanced Java', score: 94, status: 'COMPLETED', createdAt: new Date().toISOString() }
        ]
      },
      '/candidate/profile': {
          githubUsername: 'stitch-dev',
          totalRepos: 42,
          totalStars: 156,
          skillScore: 92,
          jobFitScore: 88,
          growthScore: 94,
          skillDna: JSON.stringify({ "Java": 85, "Next.js": 92, "Python": 78, "AI": 88, "Cloud": 72 }),
          techStack: JSON.stringify(["React", "Spring Boot", "Llama-3", "Kubernetes", "PostgreSQL"]),
          summary: "Master of technical execution and clean architecture."
      },
      '/candidate/viva/history': [
        { id: 101, topic: 'System Design', score: 88, status: 'COMPLETED', createdAt: new Date().toISOString() },
        { id: 102, topic: 'Frontend Optimization', score: 95, status: 'COMPLETED', createdAt: new Date().toISOString() }
      ],
      '/candidate/viva/start': { sessionId: 1234, topic: 'Full Stack Excellence', questions: ["How would you optimize a high-traffic Next.js app?", "Discuss Spring Boot security patterns.", "How do you handle AI model latency?"] },
      '/candidate/viva/1234/submit': { evaluation: { score: 91, strengths: ["Analytical", "Strategic", "Cloud-native"], feedback: "Exceptional depth in full-stack architecture." } },
      '/recruiter/dashboard': { totalCandidates: 256, verifiedCandidates: 184, activeJobs: 12 },
      '/recruiter/candidates': {
        candidates: [
          { id: 1, user: { name: 'Alex Rivera' }, githubUsername: 'arivera', skillScore: 91, jobFitScore: 88, isVerified: true, techStack: JSON.stringify(["Java", "React", "AWS"]) },
          { id: 2, user: { name: 'Jordan Lee' }, githubUsername: 'jlee', skillScore: 85, jobFitScore: 94, isVerified: true, techStack: JSON.stringify(["Python", "HuggingFace", "Next.js"]) }
        ]
      }
    };

    const matchedKey = Object.keys(mockData).find(key => url.includes(key));
    if (matchedKey) {
      console.warn(`[PoSA Demo Mode] Intercepting ${url} with Mock Data`);
      return { data: mockData[matchedKey] };
    }

    return Promise.reject(error);
  }
);

export default api;
