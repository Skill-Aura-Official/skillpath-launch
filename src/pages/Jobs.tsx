import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, Briefcase, Bookmark, ExternalLink, DollarSign, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { jobApiService, JobListing, JobFilters } from '@/services/jobApiService';

const Jobs = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilters>({});

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobApiService.fetchJobs({
        ...filters,
        type: filters.type === 'internship' ? undefined : filters.type, // Exclude internships from main jobs page
      });
      const nonInternshipJobs = data.filter(job => job.type !== 'internship');
      setJobs(nonInternshipJobs);
      setFilteredJobs(nonInternshipJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value
    }));
  };

  const handleSearchChange = (query: string) => {
    setFilters(prev => ({
      ...prev,
      query: query || undefined
    }));
  };

  const handleSaveJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
    ));
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'linkedin': return 'bg-blue-600 text-white';
      case 'indeed': return 'bg-blue-500 text-white';
      case 'naukri': return 'bg-purple-100 text-purple-800';
      case 'apna': return 'bg-orange-100 text-orange-800';
      case 'glassdoor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Job Opportunities</h1>
        </div>
        <p className="text-muted-foreground">
          Discover amazing career opportunities from top platforms including LinkedIn, Naukri, Indeed, Apna, and more
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-blue-50">💼 Connected to LinkedIn</Badge>
          <Badge variant="outline" className="bg-purple-50">🔍 Naukri Integration</Badge>
          <Badge variant="outline" className="bg-blue-50">📋 Indeed API</Badge>
          <Badge variant="outline" className="bg-orange-50">📱 Apna Jobs</Badge>
        </div>
      </div>

      {/* Advanced Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, or skills..."
              value={filters.query || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Select value={filters.location || 'all'} onValueChange={(value) => handleFilterChange('location', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="san francisco">San Francisco</SelectItem>
              <SelectItem value="new york">New York</SelectItem>
              <SelectItem value="austin">Austin</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.type || 'all'} onValueChange={(value) => handleFilterChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full_time">Full-time</SelectItem>
              <SelectItem value="part_time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.workMode || 'all'} onValueChange={(value) => handleFilterChange('workMode', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Work Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modes</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.experience || 'all'} onValueChange={(value) => handleFilterChange('experience', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
              <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
              <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.postedWithin || 'all'} onValueChange={(value) => handleFilterChange('postedWithin', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Posted" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Time</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="3d">Last 3 days</SelectItem>
              <SelectItem value="7d">Last week</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="naukri">Naukri</SelectItem>
              <SelectItem value="indeed">Indeed</SelectItem>
              <SelectItem value="apna">Apna</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredJobs.length} jobs from {new Set(jobs.map(j => j.source)).size} platforms
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
                    <Badge className={getSourceBadgeColor(job.source)}>
                      {job.source}
                    </Badge>
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
                  <div className="flex items-center gap-2">
                    {job.companyLogo && (
                      <img src={job.companyLogo} alt={job.company} className="h-6 w-6 rounded" />
                    )}
                    <p className="text-primary font-semibold">{job.company}</p>
                  </div>
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
                {(job.salary || job.stipend) && (
                  <div className="flex items-center text-sm font-semibold text-success">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {job.salary || job.stipend}
                  </div>
                )}
                {job.experience && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {job.experience} experience
                  </div>
                )}
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