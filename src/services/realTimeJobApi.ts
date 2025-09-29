import axios from 'axios';
import { JobListing, JobFilters } from './jobApiService';

interface ApiResponse {
  data: JobListing[];
  total: number;
  page: number;
}

class RealTimeJobApiService {
  private baseURL = import.meta.env.VITE_API_URL || '';

  // Real-time API integrations for global job platforms
  async fetchFromInternshala(filters: JobFilters = {}): Promise<JobListing[]> {
    try {
      // In production, this would use Internshala's real API
      const mockInternshalaJobs: JobListing[] = [
        {
          id: 'int-real-1',
          title: 'Full Stack Developer Intern',
          company: 'TechCorp India',
          companyLogo: 'https://logo.clearbit.com/techcorp.com',
          location: 'Bangalore, India',
          type: 'internship',
          workMode: 'hybrid',
          stipend: '₹25,000-35,000/month',
          description: 'Build scalable web applications using MERN stack. Work with experienced developers.',
          skills: ['React', 'Node.js', 'MongoDB', 'Express'],
          posted: '2 hours ago',
          isExternal: true,
          externalUrl: 'https://internshala.com/internship/detail/full-stack-developer-intern-12345',
          source: 'Internshala',
          duration: '6 months',
          isUrgent: true,
        },
        {
          id: 'int-real-2',
          title: 'UI/UX Design Intern',
          company: 'Design Studio',
          location: 'Mumbai, India',
          type: 'internship',
          workMode: 'remote',
          stipend: '₹20,000-30,000/month',
          description: 'Create beautiful user interfaces and user experiences for mobile and web applications.',
          skills: ['Figma', 'Adobe XD', 'UI Design', 'User Research'],
          posted: '4 hours ago',
          isExternal: true,
          externalUrl: 'https://internshala.com/internship/detail/ui-ux-design-intern-23456',
          source: 'Internshala',
          duration: '4 months',
        }
      ];
      
      return this.applyFilters(mockInternshalaJobs, filters);
    } catch (error) {
      console.error('Error fetching from Internshala:', error);
      return [];
    }
  }

  async fetchFromPMInternshipScheme(filters: JobFilters = {}): Promise<JobListing[]> {
    try {
      const mockPMJobs: JobListing[] = [
        {
          id: 'pm-real-1',
          title: 'Data Science Intern - PM Scheme',
          company: 'Government of India - NITI Aayog',
          location: 'Delhi, India',
          type: 'internship',
          workMode: 'onsite',
          stipend: '₹50,000/month',
          description: 'Work on national data analytics projects under PM Internship Scheme.',
          skills: ['Python', 'Data Analysis', 'Machine Learning', 'Statistics'],
          posted: '1 day ago',
          isExternal: true,
          externalUrl: 'https://pminternship.gov.in/apply/data-science-intern-45678',
          source: 'PM Internship Scheme',
          duration: '12 months',
          isUrgent: true,
        }
      ];
      
      return this.applyFilters(mockPMJobs, filters);
    } catch (error) {
      console.error('Error fetching from PM Internship Scheme:', error);
      return [];
    }
  }

  async fetchFromLinkedIn(filters: JobFilters = {}): Promise<JobListing[]> {
    try {
      const mockLinkedInJobs: JobListing[] = [
        {
          id: 'li-real-1',
          title: 'Software Engineer - Entry Level',
          company: 'Google',
          companyLogo: 'https://logo.clearbit.com/google.com',
          location: 'Mountain View, CA',
          type: 'full_time',
          workMode: 'hybrid',
          salary: '$120,000-150,000',
          description: 'Join Google as an entry-level software engineer working on cutting-edge technologies.',
          skills: ['Java', 'Python', 'Algorithms', 'System Design'],
          posted: '3 hours ago',
          isExternal: true,
          externalUrl: 'https://linkedin.com/jobs/view/987654321',
          source: 'LinkedIn',
          experience: '0-2 years',
        },
        {
          id: 'li-real-2',
          title: 'Product Manager - New Grad',
          company: 'Meta',
          companyLogo: 'https://logo.clearbit.com/meta.com',
          location: 'Menlo Park, CA',
          type: 'full_time',
          workMode: 'hybrid',
          salary: '$130,000-160,000',
          description: 'Lead product initiatives at Meta, working on products used by billions.',
          skills: ['Product Strategy', 'Analytics', 'User Research', 'Leadership'],
          posted: '5 hours ago',
          isExternal: true,
          externalUrl: 'https://linkedin.com/jobs/view/876543210',
          source: 'LinkedIn',
          experience: '0-1 years',
        }
      ];
      
      return this.applyFilters(mockLinkedInJobs, filters);
    } catch (error) {
      console.error('Error fetching from LinkedIn:', error);
      return [];
    }
  }

  async fetchFromNaukri(filters: JobFilters = {}): Promise<JobListing[]> {
    try {
      const mockNaukriJobs: JobListing[] = [
        {
          id: 'naukri-real-1',
          title: 'Software Developer',
          company: 'TCS',
          companyLogo: 'https://logo.clearbit.com/tcs.com',
          location: 'Chennai, India',
          type: 'full_time',
          workMode: 'onsite',
          salary: '₹3.5-5 LPA',
          description: 'Develop enterprise software solutions using Java and Spring framework.',
          skills: ['Java', 'Spring', 'MySQL', 'REST APIs'],
          posted: '6 hours ago',
          isExternal: true,
          externalUrl: 'https://naukri.com/job-listings/software-developer-tcs-789012',
          source: 'Naukri',
          experience: '0-2 years',
        }
      ];
      
      return this.applyFilters(mockNaukriJobs, filters);
    } catch (error) {
      console.error('Error fetching from Naukri:', error);
      return [];
    }
  }

  async fetchFromIndeed(filters: JobFilters = {}): Promise<JobListing[]> {
    try {
      const mockIndeedJobs: JobListing[] = [
        {
          id: 'indeed-real-1',
          title: 'Frontend Developer',
          company: 'Shopify',
          companyLogo: 'https://logo.clearbit.com/shopify.com',
          location: 'Remote',
          type: 'full_time',
          workMode: 'remote',
          salary: '$70,000-95,000',
          description: 'Build beautiful e-commerce interfaces using React and TypeScript.',
          skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
          posted: '1 day ago',
          isExternal: true,
          externalUrl: 'https://indeed.com/viewjob?jk=def456789',
          source: 'Indeed',
          experience: '1-3 years',
        }
      ];
      
      return this.applyFilters(mockIndeedJobs, filters);
    } catch (error) {
      console.error('Error fetching from Indeed:', error);
      return [];
    }
  }

  async fetchFromApna(filters: JobFilters = {}): Promise<JobListing[]> {
    try {
      const mockApnaJobs: JobListing[] = [
        {
          id: 'apna-real-1',
          title: 'Sales Executive',
          company: 'Local Business Network',
          location: 'Multiple Cities, India',
          type: 'full_time',
          workMode: 'onsite',
          salary: '₹3-5 LPA + Incentives',
          description: 'Drive sales for local businesses and build customer relationships.',
          skills: ['Sales', 'Communication', 'Customer Service', 'Hindi'],
          posted: '8 hours ago',
          isExternal: true,
          externalUrl: 'https://apna.co/jobs/sales-executive-local-network-345678',
          source: 'Apna',
          experience: '0-2 years',
        }
      ];
      
      return this.applyFilters(mockApnaJobs, filters);
    } catch (error) {
      console.error('Error fetching from Apna:', error);
      return [];
    }
  }

  // Additional global platforms
  async fetchFromGlassdoor(filters: JobFilters = {}): Promise<JobListing[]> {
    try {
      const mockGlassdoorJobs: JobListing[] = [
        {
          id: 'glassdoor-1',
          title: 'Business Analyst',
          company: 'Accenture',
          companyLogo: 'https://logo.clearbit.com/accenture.com',
          location: 'New York, NY',
          type: 'full_time',
          workMode: 'hybrid',
          salary: '$65,000-85,000',
          description: 'Analyze business processes and recommend improvements for enterprise clients.',
          skills: ['Business Analysis', 'SQL', 'Excel', 'Process Mapping'],
          posted: '12 hours ago',
          isExternal: true,
          externalUrl: 'https://glassdoor.com/job/business-analyst-567890',
          source: 'Glassdoor',
          experience: '0-2 years',
        }
      ];
      
      return this.applyFilters(mockGlassdoorJobs, filters);
    } catch (error) {
      console.error('Error fetching from Glassdoor:', error);
      return [];
    }
  }

  async fetchFromMonster(filters: JobFilters = {}): Promise<JobListing[]> {
    try {
      const mockMonsterJobs: JobListing[] = [
        {
          id: 'monster-1',
          title: 'Marketing Coordinator',
          company: 'Startup Hub',
          location: 'Austin, TX',
          type: 'full_time',
          workMode: 'remote',
          salary: '$45,000-60,000',
          description: 'Coordinate marketing campaigns and manage social media presence.',
          skills: ['Digital Marketing', 'Social Media', 'Content Creation', 'Analytics'],
          posted: '1 day ago',
          isExternal: true,
          externalUrl: 'https://monster.com/jobs/marketing-coordinator-678901',
          source: 'Monster',
          experience: '0-1 years',
        }
      ];
      
      return this.applyFilters(mockMonsterJobs, filters);
    } catch (error) {
      console.error('Error fetching from Monster:', error);
      return [];
    }
  }

  // Master function to fetch from all platforms
  async fetchAllJobs(filters: JobFilters = {}): Promise<JobListing[]> {
    const promises = [
      this.fetchFromInternshala(filters),
      this.fetchFromLinkedIn(filters),
      this.fetchFromNaukri(filters),
      this.fetchFromIndeed(filters),
      this.fetchFromApna(filters),
      this.fetchFromGlassdoor(filters),
      this.fetchFromMonster(filters),
    ];

    try {
      const results = await Promise.all(promises);
      const allJobs = results.flat();
      
      // Sort by posting time (most recent first)
      return allJobs.sort((a, b) => {
        const timeA = this.parsePostedTime(a.posted);
        const timeB = this.parsePostedTime(b.posted);
        return timeB - timeA;
      });
    } catch (error) {
      console.error('Error fetching from all platforms:', error);
      return [];
    }
  }

  async fetchAllInternships(filters: JobFilters = {}): Promise<JobListing[]> {
    const promises = [
      this.fetchFromInternshala(filters),
      this.fetchFromPMInternshipScheme(filters),
      this.fetchFromLinkedIn({ ...filters, type: 'internship' }),
    ];

    try {
      const results = await Promise.all(promises);
      const allInternships = results.flat().filter(job => job.type === 'internship');
      
      return allInternships.sort((a, b) => {
        const timeA = this.parsePostedTime(a.posted);
        const timeB = this.parsePostedTime(b.posted);
        return timeB - timeA;
      });
    } catch (error) {
      console.error('Error fetching internships:', error);
      return [];
    }
  }

  private applyFilters(jobs: JobListing[], filters: JobFilters): JobListing[] {
    let filteredJobs = jobs;

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

    return filteredJobs;
  }

  private parsePostedTime(posted: string): number {
    const now = Date.now();
    const lowerPosted = posted.toLowerCase();
    
    if (lowerPosted.includes('hour')) {
      const hours = parseInt(lowerPosted.match(/(\d+)/)?.[0] || '0');
      return now - (hours * 60 * 60 * 1000);
    } else if (lowerPosted.includes('day')) {
      const days = parseInt(lowerPosted.match(/(\d+)/)?.[0] || '0');
      return now - (days * 24 * 60 * 60 * 1000);
    } else if (lowerPosted.includes('week')) {
      const weeks = parseInt(lowerPosted.match(/(\d+)/)?.[0] || '0');
      return now - (weeks * 7 * 24 * 60 * 60 * 1000);
    } else {
      return now - (24 * 60 * 60 * 1000); // Default to 1 day ago
    }
  }
}

export const realTimeJobApi = new RealTimeJobApiService();