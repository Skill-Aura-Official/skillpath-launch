import { useState, useEffect } from 'react';
import { Search, MapPin, Users, Briefcase, ExternalLink, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website: string;
  industry: string;
  location: string;
  companySize: string;
  foundedYear: number;
  openJobs: number;
  isVerified: boolean;
  rating?: number;
}

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Sample company data
  const sampleCompanies: Company[] = [
    {
      id: '1',
      name: 'TechCorp',
      description: 'Leading technology company specializing in cloud infrastructure and AI solutions. We are building the future of digital transformation.',
      website: 'https://techcorp.com',
      industry: 'Technology',
      location: 'San Francisco, CA',
      companySize: '1,000-5,000',
      foundedYear: 2015,
      openJobs: 15,
      isVerified: true,
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Growth Co',
      description: 'Fast-growing marketing agency helping startups and enterprises scale their digital presence with innovative strategies.',
      website: 'https://growthco.com',
      industry: 'Marketing',
      location: 'New York, NY',
      companySize: '100-500',
      foundedYear: 2018,
      openJobs: 8,
      isVerified: true,
      rating: 4.6,
    },
    {
      id: '3',
      name: 'DataFlow',
      description: 'Data analytics platform providing businesses with real-time insights and advanced machine learning capabilities.',
      website: 'https://dataflow.com',
      industry: 'Data & Analytics',
      location: 'Remote',
      companySize: '50-100',
      foundedYear: 2020,
      openJobs: 12,
      isVerified: true,
      rating: 4.7,
    },
    {
      id: '4',
      name: 'InnovateTech',
      description: 'Software development company focused on creating cutting-edge mobile and web applications for enterprise clients.',
      website: 'https://innovatetech.com',
      industry: 'Software Development',
      location: 'Austin, TX',
      companySize: '500-1,000',
      foundedYear: 2012,
      openJobs: 25,
      isVerified: true,
      rating: 4.5,
    },
    {
      id: '5',
      name: 'DesignStudio',
      description: 'Creative design agency specializing in UX/UI design, branding, and digital experiences for modern businesses.',
      website: 'https://designstudio.com',
      industry: 'Design',
      location: 'Los Angeles, CA',
      companySize: '20-50',
      foundedYear: 2019,
      openJobs: 6,
      isVerified: true,
      rating: 4.9,
    },
    {
      id: '6',
      name: 'FinTech Solutions',
      description: 'Financial technology company revolutionizing digital payments and banking solutions for the next generation.',
      website: 'https://fintechsolutions.com',
      industry: 'Financial Technology',
      location: 'Chicago, IL',
      companySize: '200-500',
      foundedYear: 2016,
      openJobs: 18,
      isVerified: true,
      rating: 4.4,
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCompanies(sampleCompanies);
      setFilteredCompanies(sampleCompanies);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = companies;

    if (searchQuery) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCompanies(filtered);
  }, [companies, searchQuery]);

  const getCompanyInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-muted rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
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
        <h1 className="text-3xl font-bold mb-4">Top Companies</h1>
        <p className="text-muted-foreground">
          Discover amazing companies and their open positions
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search companies, industries, or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredCompanies.length} of {companies.length} companies
        </p>
      </div>

      {/* Company Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={company.logo} alt={company.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                    {getCompanyInitials(company.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg truncate">{company.name}</CardTitle>
                    {company.isVerified && (
                      <Badge variant="secondary" className="text-xs">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-primary font-medium">{company.industry}</p>
                  {company.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm font-medium">{company.rating}</span>
                      <div className="flex text-warning">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${i < Math.floor(company.rating!) ? '★' : '☆'}`}>
                            {i < Math.floor(company.rating!) ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="line-clamp-3">
                {company.description}
              </CardDescription>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{company.location}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                  {company.companySize} employees
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
                  {company.openJobs} open positions
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">
                  Founded {company.foundedYear}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(company.website, '_blank')}
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    Website
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      // Navigate to company jobs
                      console.log('View jobs for company:', company.id);
                    }}
                  >
                    View Jobs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No companies found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search query
          </p>
        </div>
      )}
    </div>
  );
};

export default Companies;