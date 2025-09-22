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

  // Simulate real-time job data from multiple platforms
  async fetchJobs(filters: JobFilters = {}): Promise<JobListing[]> {
    // In a real implementation, this would make API calls to:
    // - Internshala API
    // - Naukri API
    // - Indeed API
    // - LinkedIn API
    // - Apna API
    // For now, we'll return enhanced mock data

    const mockJobs: JobListing[] = [
      // Internshala Jobs
      {
        id: 'int-1',
        title: 'Software Development Intern',
        company: 'TechStart India',
        location: 'Bangalore, India',
        type: 'internship',
        workMode: 'hybrid',
        stipend: '₹15,000-25,000/month',
        description: 'Work on real-world projects using React, Node.js, and MongoDB. Perfect for computer science students.',
        skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
        posted: '1 hour ago',
        isExternal: true,
        externalUrl: 'https://internshala.com/internship/detail/software-development-intern-work-from-home-job-internship-at-techstart-india1234',
        source: 'Internshala',
        duration: '3 months',
        isUrgent: true,
      },
      {
        id: 'int-2',
        title: 'Digital Marketing Intern',
        company: 'GrowthHack Solutions',
        location: 'Mumbai, India',
        type: 'internship',
        workMode: 'remote',
        stipend: '₹10,000-18,000/month',
        description: 'Learn digital marketing strategies, social media management, and analytics.',
        skills: ['Digital Marketing', 'Social Media', 'Analytics', 'SEO'],
        posted: '3 hours ago',
        isExternal: true,
        externalUrl: 'https://internshala.com/internship/detail/digital-marketing-intern-work-from-home-job-internship-at-growthhack-solutions2345',
        source: 'Internshala',
        duration: '2 months',
      },
      // PM Internship Scheme
      {
        id: 'pm-1',
        title: 'Product Management Intern - PM Scheme',
        company: 'Innovation Labs (Govt of India)',
        location: 'Delhi, India',
        type: 'internship',
        workMode: 'onsite',
        stipend: '₹50,000/month',
        description: 'Government PM Internship Scheme for product management in technology sector.',
        skills: ['Product Management', 'Strategy', 'Analytics', 'Communication'],
        posted: '2 days ago',
        isExternal: true,
        externalUrl: 'https://pminternship.gov.in/apply/pm-intern-2024-3456',
        source: 'PM Internship Scheme',
        duration: '12 months',
        isUrgent: true,
      },
      // LinkedIn Jobs
      {
        id: 'li-1',
        title: 'Junior Software Engineer',
        company: 'Microsoft',
        companyLogo: 'https://logo.clearbit.com/microsoft.com',
        location: 'Seattle, WA',
        type: 'full_time',
        workMode: 'hybrid',
        salary: '$85,000-110,000',
        description: 'Entry-level software engineer position working on Azure cloud services.',
        skills: ['C#', 'Azure', '.NET', 'Cloud Computing'],
        posted: '1 day ago',
        isExternal: true,
        externalUrl: 'https://linkedin.com/jobs/view/3456789012',
        source: 'LinkedIn',
        experience: '0-2 years',
      },
      // Naukri Jobs
      {
        id: 'naukri-1',
        title: 'Data Analyst',
        company: 'Infosys',
        companyLogo: 'https://logo.clearbit.com/infosys.com',
        location: 'Pune, India',
        type: 'full_time',
        workMode: 'onsite',
        salary: '₹4-6 LPA',
        description: 'Analyze business data and create insights for decision making.',
        skills: ['Python', 'SQL', 'Tableau', 'Excel'],
        posted: '2 days ago',
        isExternal: true,
        externalUrl: 'https://naukri.com/job-listings/data-analyst-infosys-pune-4567890',
        source: 'Naukri',
        experience: '0-1 years',
      },
      // Indeed Jobs
      {
        id: 'indeed-1',
        title: 'Frontend Developer',
        company: 'Shopify',
        companyLogo: 'https://logo.clearbit.com/shopify.com',
        location: 'Remote',
        type: 'full_time',
        workMode: 'remote',
        salary: '$70,000-95,000',
        description: 'Build beautiful e-commerce interfaces using React and TypeScript.',
        skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
        posted: '3 days ago',
        isExternal: true,
        externalUrl: 'https://indeed.com/viewjob?jk=abcd1234567890',
        source: 'Indeed',
        experience: '1-3 years',
      },
      // Apna Jobs
      {
        id: 'apna-1',
        title: 'Sales Executive',
        company: 'Local Business Network',
        location: 'Multiple Cities, India',
        type: 'full_time',
        workMode: 'onsite',
        salary: '₹3-5 LPA + Incentives',
        description: 'Drive sales for local businesses and build customer relationships.',
        skills: ['Sales', 'Communication', 'Customer Service', 'Hindi'],
        posted: '1 day ago',
        isExternal: true,
        externalUrl: 'https://apna.co/jobs/sales-executive-local-business-network-567890',
        source: 'Apna',
        experience: '0-2 years',
      },
    ];

    // Apply filters
    let filteredJobs = mockJobs;

    if (filters.query) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(filters.query!.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.query!.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(filters.query!.toLowerCase()))
      );
    }

    if (filters.location && filters.location !== 'all') {
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(filters.location!.toLowerCase()) ||
        (filters.location === 'remote' && job.workMode === 'remote')
      );
    }

    if (filters.type && filters.type !== 'all') {
      filteredJobs = filteredJobs.filter(job => job.type === filters.type);
    }

    if (filters.workMode && filters.workMode !== 'all') {
      filteredJobs = filteredJobs.filter(job => job.workMode === filters.workMode);
    }

    if (filters.skills && filters.skills.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        filters.skills!.some(skill =>
          job.skills.some(jobSkill =>
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    if (filters.experience && filters.experience !== 'all') {
      filteredJobs = filteredJobs.filter(job => {
        if (!job.experience) return filters.experience === 'entry';
        const exp = job.experience.toLowerCase();
        switch (filters.experience) {
          case 'entry': return exp.includes('0') || exp.includes('entry') || exp.includes('fresher');
          case 'mid': return exp.includes('1-3') || exp.includes('2-4') || exp.includes('3-5');
          case 'senior': return exp.includes('5+') || exp.includes('senior') || exp.includes('lead');
          default: return true;
        }
      });
    }

    if (filters.postedWithin && filters.postedWithin !== 'all') {
      filteredJobs = filteredJobs.filter(job => {
        const posted = job.posted.toLowerCase();
        switch (filters.postedWithin) {
          case '24h': return posted.includes('hour') || posted.includes('today');
          case '3d': return posted.includes('day') && !posted.includes('week');
          case '7d': return posted.includes('day') || posted.includes('week');
          default: return true;
        }
      });
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return filteredJobs;
  }

  async fetchInternships(filters: JobFilters = {}): Promise<JobListing[]> {
    const jobs = await this.fetchJobs(filters);
    return jobs.filter(job => job.type === 'internship');
  }

  async fetchJobById(id: string): Promise<JobListing | null> {
    const jobs = await this.fetchJobs();
    return jobs.find(job => job.id === id) || null;
  }
}

export const jobApiService = new JobApiService();