import { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone,
  ChevronDown,
  ChevronRight,
  Book,
  Users,
  Lightbulb,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  articles: number;
}

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQs, setOpenFAQs] = useState<string[]>([]);

  const categories: HelpCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of using our platform',
      icon: Book,
      articles: 12,
    },
    {
      id: 'job-search',
      title: 'Job Search & Applications',
      description: 'Tips for finding and applying to jobs',
      icon: Search,
      articles: 18,
    },
    {
      id: 'profile',
      title: 'Profile & Resume',
      description: 'Optimize your profile and resume',
      icon: Users,
      articles: 15,
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Solve common issues and problems',
      icon: Lightbulb,
      articles: 9,
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Learn about data protection and security',
      icon: Shield,
      articles: 6,
    },
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking the "Get Started" button on our homepage. Choose whether you\'re a student/fresher or recruiter, then fill out the registration form with your details.',
      category: 'getting-started',
    },
    {
      id: '2',
      question: 'How do I search for jobs?',
      answer: 'Use the search bar on our Jobs page to find opportunities. You can filter by location, job type, salary range, and required skills. Save interesting jobs to apply later.',
      category: 'job-search',
    },
    {
      id: '3',
      question: 'How do I upload my resume?',
      answer: 'Go to your Profile page and click on "Upload Resume" in the Documents section. We accept PDF, DOC, and DOCX files up to 5MB in size.',
      category: 'profile',
    },
    {
      id: '4',
      question: 'Can I apply to jobs without a resume?',
      answer: 'While you can browse jobs without a resume, most employers require a resume for applications. We recommend uploading your resume or using our AI Resume Builder.',
      category: 'job-search',
    },
    {
      id: '5',
      question: 'How do I track my job applications?',
      answer: 'Visit the "My Applications" section in your dashboard to see all jobs you\'ve applied to, their current status, and any updates from employers.',
      category: 'job-search',
    },
    {
      id: '6',
      question: 'Is my personal information secure?',
      answer: 'Yes, we use industry-standard encryption to protect your data. Your information is never shared without your consent, and you can control your privacy settings.',
      category: 'privacy',
    },
    {
      id: '7',
      question: 'How do I contact employers?',
      answer: 'You can message employers directly through our built-in messaging system once you\'ve applied to their jobs or if they reach out to you first.',
      category: 'job-search',
    },
    {
      id: '8',
      question: 'What if I forgot my password?',
      answer: 'Click "Forgot Password" on the login page and enter your email address. We\'ll send you a link to reset your password securely.',
      category: 'troubleshooting',
    },
    {
      id: '9',
      question: 'How do I update my profile information?',
      answer: 'Go to your Profile page and click "Edit Profile." You can update your personal information, skills, education, and experience at any time.',
      category: 'profile',
    },
    {
      id: '10',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account by going to Settings > Account > Delete Account. Note that this action is permanent and cannot be undone.',
      category: 'privacy',
    },
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (faqId: string) => {
    setOpenFAQs(prev =>
      prev.includes(faqId)
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              Help{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Center
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions and get the support you need
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Help Categories */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-6">Browse by Category</h2>
            <div className="space-y-4">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{category.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          {category.articles} articles
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id}>
                  <Collapsible
                    open={openFAQs.includes(faq.id)}
                    onOpenChange={() => toggleFAQ(faq.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium text-left">
                            {faq.question}
                          </CardTitle>
                          {openFAQs.includes(faq.id) ? (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground">{faq.answer}</p>
                        <Badge variant="outline" className="mt-3">
                          {categories.find(c => c.id === faq.category)?.title}
                        </Badge>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No FAQs found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <section className="mt-20 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-muted-foreground mb-8">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with our support team
                  </p>
                  <Button variant="outline" size="sm">Start Chat</Button>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get help via email
                  </p>
                  <Button variant="outline" size="sm">Send Email</Button>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Call us directly
                  </p>
                  <Button variant="outline" size="sm">Call Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Help;