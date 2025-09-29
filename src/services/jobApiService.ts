import axios from 'axios';

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'full_time' | 'part_time' | 'internship' | 'contract';
  workMode: 'remote' | 'onsite' | 'hybrid';
  salary?: string;
  stipend?: string;
  description: string;
  skills: string[];
  posted: string;
  isExternal: boolean;
  externalUrl?: string;
  source: string;
  experience?: string;
  duration?: string;
  isUrgent?: boolean;
  isSaved?: boolean;
  applicationDeadline?: string;
}

export interface JobFilters {
  query?: string;
  location?: string;
  type?: string;
  workMode?: string;
  skills?: string[];
  experience?: string;
  postedWithin?: string;
  salaryRange?: {
    min?: number;
    max?: number;
  };
}

class JobApiService {
  private baseURL = import.meta.env.VITE_API_URL || '';

  // Real-time job data from multiple global platforms
  async fetchJobs(filters: JobFilters = {}): Promise<JobListing[]> {
    // Import real-time API service
    const { realTimeJobApi } = await import('./realTimeJobApi');
    
    // Fetch from all platforms in real-time
    return await realTimeJobApi.fetchAllJobs(filters);
  }

  async fetchInternships(filters: JobFilters = {}): Promise<JobListing[]> {
    // Import real-time API service
    const { realTimeJobApi } = await import('./realTimeJobApi');
    
    // Fetch internships from all platforms in real-time
    return await realTimeJobApi.fetchAllInternships(filters);
  }

  async fetchJobById(id: string): Promise<JobListing | null> {
    const jobs = await this.fetchJobs();
    return jobs.find(job => job.id === id) || null;
  }
}

export const jobApiService = new JobApiService();