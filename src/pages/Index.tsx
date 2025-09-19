import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Shield,
  Search,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import heroImage from '@/assets/hero-image.jpg';

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  urgent?: boolean;
}

interface Stat {
  label: string;
  value: string;
  icon: any;
}

interface Feature {
  title: string;
  description: string;
  icon: any;
}

const Index = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const stats: Stat[] = [
    { label: 'Active Jobs', value: '15,000+', icon: Briefcase },
    { label: 'Students Placed', value: '50,000+', icon: Users },
    { label: 'Success Rate', value: '95%', icon: TrendingUp },
    { label: 'Top Companies', value: '2,500+', icon: Shield },
  ];

  const features: Feature[] = [
    {
      title: 'Smart Job Matching',
      description: 'AI-powered recommendations based on your skills and preferences',
      icon: Zap,
    },
    {
      title: 'Verified Companies',
      description: 'All companies are verified to ensure legitimate opportunities',
      icon: Shield,
    },
    {
      title: 'Career Guidance',
      description: 'Expert advice and resources to accelerate your career growth',
      icon: TrendingUp,
    },
    {
      title: 'Instant Applications',
      description: 'Apply to multiple jobs with one-click using your profile',
      icon: CheckCircle,
    },
  ];

  const featuredJobs: JobListing[] = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Internship',
      salary: '$25-30/hr',
      posted: '2 days ago',
      urgent: true,
    },
    {
      id: '2',
      title: 'Marketing Associate',
      company: 'Growth Co',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$45-55K',
      posted: '1 week ago',
    },
    {
      id: '3',
      title: 'Data Analyst Intern',
      company: 'DataFlow',
      location: 'Remote',
      type: 'Internship',
      salary: '$20-25/hr',
      posted: '3 days ago',
    },
  ];

  const handleSearch = () => {
    navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleGetStarted = () => {
    if (user) {
      if (profile?.role === 'student') {
        navigate('/jobs');
      } else if (profile?.role === 'recruiter') {
        navigate('/recruiter/jobs');
      } else {
        navigate('/profile');
      }
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background"></div>
        <div className="container relative mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🎓 For Students & Freshers
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Find Your{' '}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent">
                    Dream Job
                  </span>{' '}
                  Today
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Connect with top companies, discover exciting opportunities, and kickstart your career with AI-powered job matching.
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs, companies, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  size="lg" 
                  variant="gradient" 
                  onClick={handleSearch}
                  className="h-12 px-8"
                >
                  Search Jobs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  variant="hero" 
                  onClick={handleGetStarted}
                  className="h-14 px-8"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/companies')}
                  className="h-14 px-8"
                >
                  Browse Companies
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <img
                src={heroImage}
                alt="Students and professionals collaborating"
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                JobPortal?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're more than just a job board. We're your career growth partner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-4 mx-auto">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Featured Opportunities</h2>
              <p className="text-muted-foreground">Handpicked jobs from top companies</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/jobs')}>
              View All Jobs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
                      <p className="text-primary font-semibold">{job.company}</p>
                    </div>
                    {job.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">{job.type}</Badge>
                    <span className="font-semibold text-success">{job.salary}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.posted}
                    </div>
                    <Button size="sm" variant="outline">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-accent to-primary-glow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Launch Your Career?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students and freshers who have found their dream jobs through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={handleGetStarted}
                className="h-14 px-8"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="h-14 px-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                I'm a Recruiter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;