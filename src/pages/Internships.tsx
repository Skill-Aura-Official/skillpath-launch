import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, Briefcase, Bookmark, ExternalLink, DollarSign, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { jobApiService, JobListing, JobFilters } from '@/services/jobApiService';

const Internships = () => {
  const [internships, setInternships] = useState<JobListing[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilters>({});

  useEffect(() => {
    fetchInternships();
  }, [filters]);

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const data = await jobApiService.fetchInternships(filters);
      setInternships(data);
      setFilteredInternships(data);
    } catch (error) {
      console.error('Error fetching internships:', error);
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

  const handleSaveInternship = (internshipId: string) => {
    setInternships(prev => prev.map(internship => 
      internship.id === internshipId ? { ...internship, isSaved: !internship.isSaved } : internship
    ));
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'internshala': return 'bg-blue-100 text-blue-800';
      case 'pm internship scheme': return 'bg-green-100 text-green-800';
      case 'linkedin': return 'bg-blue-600 text-white';
      case 'indeed': return 'bg-blue-500 text-white';
      case 'naukri': return 'bg-purple-100 text-purple-800';
      case 'apna': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            <Award className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Internship Opportunities</h1>
        </div>
        <p className="text-muted-foreground">
          Discover amazing internship opportunities from top platforms including Internshala, PM Internship Scheme, LinkedIn, and more
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-blue-50">🔗 Connected to Internshala</Badge>
          <Badge variant="outline" className="bg-green-50">🏛️ PM Internship Scheme</Badge>
          <Badge variant="outline" className="bg-blue-50">💼 LinkedIn</Badge>
          <Badge variant="outline" className="bg-orange-50">📱 Indeed</Badge>
        </div>
      </div>

      {/* Advanced Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search internships, companies, or skills..."
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
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
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
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Duration</SelectItem>
              <SelectItem value="1-3">1-3 months</SelectItem>
              <SelectItem value="3-6">3-6 months</SelectItem>
              <SelectItem value="6+">6+ months</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="internshala">Internshala</SelectItem>
              <SelectItem value="pm-scheme">PM Scheme</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="indeed">Indeed</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Stipend" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Stipend</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
              <SelectItem value="5000-15000">₹5K-15K</SelectItem>
              <SelectItem value="15000-25000">₹15K-25K</SelectItem>
              <SelectItem value="25000+">₹25K+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredInternships.length} internships from {new Set(internships.map(i => i.source)).size} platforms
        </p>
      </div>

      {/* Internship Listings */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map((internship) => (
          <Card key={internship.id} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getSourceBadgeColor(internship.source)}>
                      {internship.source}
                    </Badge>
                    {internship.isUrgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      External
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mb-2">{internship.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    {internship.companyLogo && (
                      <img src={internship.companyLogo} alt={internship.company} className="h-6 w-6 rounded" />
                    )}
                    <p className="text-primary font-semibold">{internship.company}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSaveInternship(internship.id)}
                  className={internship.isSaved ? 'text-primary' : ''}
                >
                  <Bookmark className={`h-5 w-5 ${internship.isSaved ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {internship.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Internship • {internship.workMode.charAt(0).toUpperCase() + internship.workMode.slice(1)}
                </div>
                {internship.duration && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {internship.duration}
                  </div>
                )}
                {(internship.salary || internship.stipend) && (
                  <div className="flex items-center text-sm font-semibold text-success">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {internship.stipend || internship.salary}
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {internship.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {internship.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {internship.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{internship.skills.length - 3} more
                  </Badge>
                )}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {internship.posted}
                </div>
                <Button 
                  size="sm" 
                  variant="default"
                  onClick={() => {
                    if (internship.externalUrl) {
                      window.open(internship.externalUrl, '_blank');
                    }
                  }}
                >
                  Apply Now
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInternships.length === 0 && (
        <div className="text-center py-12">
          <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No internships found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default Internships;