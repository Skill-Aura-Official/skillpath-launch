import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, Briefcase, Bookmark, ExternalLink, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: string;
  workMode: string;
  salary: string;
  description: string;
  skills: string[];
  posted: string;
  isExternal: boolean;
  externalUrl?: string;
  isSaved?: boolean;
  isUrgent?: boolean;
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [workModeFilter, setWorkModeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Sample job data
  const sampleJobs: Job[] = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'internship',
      workMode: 'remote',
      salary: '$25-30/hr',
      description: 'Join our dynamic team as a Frontend Developer Intern. Work on cutting-edge projects using React, TypeScript, and modern web technologies.',
      skills: ['React', 'TypeScript', 'HTML/CSS', 'JavaScript'],
      posted: '2 days ago',
      isExternal: false,
      isUrgent: true,
    },
    {
      id: '2',
      title: 'Marketing Associate',
      company: 'Growth Co',
      location: 'New York, NY',
      type: 'full_time',
      workMode: 'hybrid',
      salary: '$45,000-55,000',
      description: 'Looking for a creative Marketing Associate to help drive our growth initiatives and brand awareness campaigns.',
      skills: ['Digital Marketing', 'Social Media', 'Analytics', 'Content Creation'],
      posted: '1 week ago',
      isExternal: false,
    },
    {
      id: '3',
      title: 'Data Analyst Intern',
      company: 'DataFlow',
      location: 'Remote',
      type: 'internship',
      workMode: 'remote',
      salary: '$20-25/hr',
      description: 'Analyze complex datasets and create meaningful insights to drive business decisions. Perfect for students with analytical skills.',
      skills: ['Python', 'SQL', 'Excel', 'Tableau'],
      posted: '3 days ago',
      isExternal: true,
      externalUrl: 'https://example.com/apply',
    },
    {
      id: '4',
      title: 'Software Engineer - Entry Level',
      company: 'InnovateTech',
      location: 'Austin, TX',
      type: 'full_time',
      workMode: 'onsite',
      salary: '$70,000-85,000',
      description: 'Entry-level software engineer position working on cloud infrastructure and microservices architecture.',
      skills: ['Java', 'Spring Boot', 'AWS', 'Docker'],
      posted: '5 days ago',
      isExternal: false,
    },
    {
      id: '5',
      title: 'UX/UI Design Intern',
      company: 'DesignStudio',
      location: 'Los Angeles, CA',
      type: 'internship',
      workMode: 'hybrid',
      salary: '$22-28/hr',
      description: 'Create beautiful and intuitive user experiences for our mobile and web applications.',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      posted: '1 day ago',
      isExternal: false,
      isUrgent: true,
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(sampleJobs);
      setFilteredJobs(sampleJobs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(job => {
        if (locationFilter === 'remote') {
          return job.location.toLowerCase().includes('remote') || job.workMode === 'remote';
        }
        return job.location.toLowerCase().includes(locationFilter.toLowerCase());
      });
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(job => job.type === typeFilter);
    }

    // Work mode filter
    if (workModeFilter !== 'all') {
      filtered = filtered.filter(job => job.workMode === workModeFilter);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, locationFilter, typeFilter, workModeFilter]);

  const handleSaveJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
    ));
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'full_time': 'Full-time',
      'part_time': 'Part-time',
      'internship': 'Internship',
      'contract': 'Contract'
    };
    return labels[type] || type;
  };

  const getWorkModeLabel = (mode: string) => {
    const labels: { [key: string]: string } = {
      'remote': 'Remote',
      'onsite': 'On-site',
      'hybrid': 'Hybrid'
    };
    return labels[mode] || mode;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Job Opportunities</h1>
        <p className="text-muted-foreground">
          Discover amazing career opportunities from top companies
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="san francisco">San Francisco</SelectItem>
              <SelectItem value="new york">New York</SelectItem>
              <SelectItem value="austin">Austin</SelectItem>
              <SelectItem value="los angeles">Los Angeles</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full_time">Full-time</SelectItem>
              <SelectItem value="part_time">Part-time</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>

          <Select value={workModeFilter} onValueChange={setWorkModeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Work Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modes</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>
      </div>

      {/* Job Listings */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {job.isUrgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                    {job.isExternal && (
                      <Badge variant="outline" className="text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        External
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
                  <p className="text-primary font-semibold">{job.company}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSaveJob(job.id)}
                  className={job.isSaved ? 'text-primary' : ''}
                >
                  <Bookmark className={`h-5 w-5 ${job.isSaved ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {getTypeLabel(job.type)} • {getWorkModeLabel(job.workMode)}
                </div>
                <div className="flex items-center text-sm font-semibold text-success">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {job.salary}
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {job.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {job.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{job.skills.length - 3} more
                  </Badge>
                )}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {job.posted}
                </div>
                <Button 
                  size="sm" 
                  variant={job.isExternal ? "outline" : "default"}
                  onClick={() => {
                    if (job.isExternal && job.externalUrl) {
                      window.open(job.externalUrl, '_blank');
                    } else {
                      // Handle internal application
                      console.log('Apply to job:', job.id);
                    }
                  }}
                >
                  {job.isExternal ? (
                    <>
                      Apply
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    'Apply Now'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default Jobs;