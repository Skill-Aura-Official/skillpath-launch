import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Users, 
  Trophy, 
  Clock,
  ArrowRight,
  Search,
  Filter,
  Download,
  Heart,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'template' | 'guide';
  category: string;
  readTime: string;
  downloads?: number;
  views: number;
  featured?: boolean;
}

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'resume', label: 'Resume Building' },
    { value: 'interview', label: 'Interview Prep' },
    { value: 'career', label: 'Career Development' },
    { value: 'skills', label: 'Skill Building' },
    { value: 'networking', label: 'Networking' },
  ];

  const resources: Resource[] = [
    {
      id: '1',
      title: 'The Ultimate Resume Template for 2024',
      description: 'ATS-friendly resume template that gets you noticed by recruiters and hiring managers.',
      type: 'template',
      category: 'resume',
      readTime: '15 min setup',
      downloads: 15420,
      views: 42300,
      featured: true,
    },
    {
      id: '2',
      title: 'Top 50 Interview Questions and How to Answer Them',
      description: 'Comprehensive guide covering the most common interview questions with expert answers.',
      type: 'guide',
      category: 'interview',
      readTime: '45 min read',
      views: 38200,
      featured: true,
    },
    {
      id: '3',
      title: 'Mastering the Virtual Interview',
      description: 'Complete video course on excelling in virtual interviews and video calls.',
      type: 'video',
      category: 'interview',
      readTime: '2 hr course',
      views: 23100,
    },
    {
      id: '4',
      title: 'Building Your Personal Brand on LinkedIn',
      description: 'Step-by-step guide to creating a compelling LinkedIn profile that attracts recruiters.',
      type: 'article',
      category: 'networking',
      readTime: '20 min read',
      views: 19800,
    },
    {
      id: '5',
      title: 'Salary Negotiation Strategies for New Graduates',
      description: 'Learn how to negotiate your first salary and benefits package with confidence.',
      type: 'guide',
      category: 'career',
      readTime: '30 min read',
      views: 16500,
    },
    {
      id: '6',
      title: 'Cover Letter Templates That Get Results',
      description: 'Collection of proven cover letter templates for different industries and roles.',
      type: 'template',
      category: 'resume',
      readTime: '10 min setup',
      downloads: 8930,
      views: 14200,
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'template':
        return <Download className="h-5 w-5" />;
      case 'guide':
        return <BookOpen className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'template':
        return 'bg-green-100 text-green-800';
      case 'guide':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              Career{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert guides, templates, and tools to accelerate your career growth
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Trophy className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Featured Resources</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {filteredResources.filter(r => r.featured).map((resource) => (
              <Card key={resource.id} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${getTypeColor(resource.type)} flex items-center gap-1`}>
                          {getTypeIcon(resource.type)}
                          {resource.type}
                        </Badge>
                        <Badge variant="secondary">{resource.category}</Badge>
                      </div>
                      <CardTitle className="text-lg mb-2">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {resource.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {resource.views.toLocaleString()}
                      </div>
                      {resource.downloads && (
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {resource.downloads.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      View Resource
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">All Resources</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.filter(r => !r.featured).map((resource) => (
              <Card key={resource.id} className="hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${getTypeColor(resource.type)} flex items-center gap-1`}>
                      {getTypeIcon(resource.type)}
                      {resource.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {resource.readTime}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No resources found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Resources;