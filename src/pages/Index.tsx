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
  Zap,
  Globe,
  Brain,
  Rocket,
  Target,
  PlayCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import heroImage from '@/assets/skillmatchr-hero.jpg';
import aiAssistantImage from '@/assets/ai-assistant.jpg';
import globalNetworkImage from '@/assets/global-network.jpg';

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
    { label: 'Active Jobs', value: '25,000+', icon: Briefcase },
    { label: 'Global Platforms', value: '15+', icon: Globe },
    { label: 'Students Placed', value: '75,000+', icon: Users },
    { label: 'Success Rate', value: '97%', icon: TrendingUp },
  ];

  const features: Feature[] = [
    {
      title: 'AI-Powered Matching',
      description: 'Advanced AI analyzes your skills and matches you with perfect opportunities',
      icon: Brain,
    },
    {
      title: 'Global Job Aggregation',
      description: 'Real-time jobs from 15+ platforms including LinkedIn, Naukri, Indeed, and more',
      icon: Globe,
    },
    {
      title: 'Smart Career Guidance',
      description: 'AI chatbot provides personalized career advice and interview preparation',
      icon: Rocket,
    },
    {
      title: 'Skill Gap Analysis',
      description: 'Identify missing skills and get recommendations for career advancement',
      icon: Target,
    },
  ];

  const featuredJobs: JobListing[] = [
    {
      id: '1',
      title: 'AI/ML Engineer Intern',
      company: 'Google',
      location: 'San Francisco, CA',
      type: 'Internship',
      salary: '$35-40/hr',
      posted: '1 hour ago',
      urgent: true,
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'Meta',
      location: 'Remote',
      type: 'Full-time',
      salary: '$95-120K',
      posted: '3 hours ago',
    },
    {
      id: '3',
      title: 'Product Manager - New Grad',
      company: 'Microsoft',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$110-140K',
      posted: '5 hours ago',
    },
  ];

  const handleSearch = () => {
    navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleGetStarted = () => {
    if (user) {
      if (profile?.role === 'student') {
        navigate('/dashboard');
      } else if (profile?.role === 'recruiter') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
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
                <Badge variant="secondary" className="w-fit animate-pulse">
                  🤖 AI-Powered • 🌍 Global • 🎯 Smart Matching
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Find Your{' '}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent">
                    Perfect Match
                  </span>{' '}
                  with SkillMatchr
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  AI-powered job matching connecting talented students with global opportunities. Real-time job feeds from 15+ platforms worldwide.
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
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/companies')}
                  className="h-14 px-8"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="font-semibold">4.9/5</span>
                    <span>from 10,000+ students</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <img
                src={heroImage}
                alt="SkillMatchr - AI-powered job matching platform"
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Students Worldwide</h2>
            <p className="text-muted-foreground">Real numbers from our global community</p>
          </div>
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

      {/* AI Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">🤖 AI-Powered Features</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Your Personal{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Career AI
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our advanced AI doesn't just find jobs - it understands your career goals, analyzes your skills, and guides you toward success.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Smart job recommendations based on your profile</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Resume analysis and improvement suggestions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Skill gap identification and learning paths</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>24/7 career guidance chatbot</span>
                </li>
              </ul>
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Try AI Features
                <Brain className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <img
                src={aiAssistantImage}
                alt="AI Career Assistant"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src={globalNetworkImage}
                alt="Global Job Network"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="secondary" className="mb-4">🌍 Global Platform</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Connected to{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  15+ Job Platforms
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We aggregate jobs from the world's top platforms in real-time, giving you access to opportunities you'd never find otherwise.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">LinkedIn</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Indeed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Naukri</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Internshala</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Glassdoor</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">And 10+ more</span>
                </div>
              </div>
              <Button size="lg" variant="outline">
                View All Platforms
                <Globe className="ml-2 h-5 w-5" />
              </Button>
            </div>
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
                SkillMatchr?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're the world's first AI-powered global job aggregator designed specifically for students and new graduates.
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
              <h2 className="text-3xl font-bold mb-4">Trending Opportunities</h2>
              <p className="text-muted-foreground">Fresh jobs from top companies, updated in real-time</p>
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
                      <Badge variant="destructive" className="text-xs animate-pulse">
                        Hot!
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
              Ready to Launch Your Career with SkillMatchr?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students who've found their dream jobs through our AI-powered global platform.
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