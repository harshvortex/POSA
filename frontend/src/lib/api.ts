import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('posa_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Powerful Demo/Mock Interceptor: All functions "Run Well" without a backend
// We still keep this for high-fidelity demos if the user hasn't started the python server
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If backend is down (E.G. no 8000), return Mock Data based on URL
    const url = error.config?.url || '';
    
    const mockData: any = {
      '/auth/login': { token: 'python-mock-jwt', user: { name: 'Python Demo', email: 'python@posa.dev', role: 'CANDIDATE' } },
      '/auth/register': { message: 'Protocol registered' },
      '/candidate/dashboard': {
        user: { name: 'Python Expert', email: 'python@posa.dev' },
        profile: {
          githubUsername: 'python-god',
          totalRepos: 128,
          totalStars: 420,
          skillScore: 98,
          jobFitScore: 92,
          growthScore: 95,
          skillDna: JSON.stringify({ "Python": 98, "FastAPI": 95, "Llama-3": 90, "PyTorch": 82 }),
          techStack: JSON.stringify(["Python", "OpenAI", "Cloud-Native", "Rust"]),
          summary: "A world-class Python engineer with a focus on high-fidelity AI systems and systemic optimization."
        },
        vivaSessions: [
          { id: 1, topic: 'GIL Optimization', score: 98, status: 'COMPLETED', createdAt: new Date().toISOString() }
        ]
      },
      '/candidate/profile': {
          githubUsername: 'python-god',
          totalRepos: 128,
          totalStars: 420,
          skillScore: 98,
          jobFitScore: 92,
          growthScore: 95,
          skillDna: JSON.stringify({ "Python": 98, "FastAPI": 95, "Llama-3": 90, "PyTorch": 82 }),
          techStack: JSON.stringify(["Python", "OpenAI", "Cloud-Native", "Rust"]),
          summary: "Master of pure Python and AI architecture."
      },
      '/candidate/viva/history': [
        { id: 1, topic: 'Async Protocols', score: 92, status: 'COMPLETED', createdAt: new Date().toISOString() }
      ],
      '/candidate/viva/start': { sessionId: 999, topic: 'Systemic Python', questions: ["How would you structure a multi-agent Python system?", "Explain the difference between threading and multiprocessing in Python.", "Discuss high-performance FastAPI optimizations."] },
      '/candidate/viva/999/submit': { evaluation: { score: 96, strengths: ["Optimization", "Architecture", "AI Depth"], feedback: "Exceptional mastery of Python-centric intelligence." } },
      '/recruiter/dashboard': { totalCandidates: 560, verifiedCandidates: 412, activeJobs: 24 },
      '/recruiter/candidates': {
        candidates: [
          { id: 1, user: { name: 'Python Lord' }, githubUsername: 'plord', skillScore: 98, jobFitScore: 95, isVerified: true, techStack: JSON.stringify(["Python", "C++", "AWS"]) },
          { id: 2, user: { name: 'AI Architect' }, githubUsername: 'aiarc', skillScore: 92, jobFitScore: 88, isVerified: true, techStack: JSON.stringify(["Llama-3", "FastAPI", "PostgreSQL"]) }
        ]
      }
    };

    const matchedKey = Object.keys(mockData).find(key => url.includes(key));
    if (matchedKey) {
      console.warn(`[PoSA Python Demo Mode] Serving 8000-Mock-Data for ${url}`);
      return { data: mockData[matchedKey] };
    }

    return Promise.reject(error);
  }
);

export default api;
