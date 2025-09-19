import { Shield, Eye, Lock, FileText, Users, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Privacy = () => {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: FileText,
      content: [
        'Personal information you provide when creating an account (name, email, phone)',
        'Profile information including education, experience, and skills',
        'Resume and other documents you upload',
        'Job search and application history',
        'Communication with employers and our support team',
        'Usage data and analytics to improve our services'
      ]
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: Users,
      content: [
        'To provide and improve our job matching services',
        'To facilitate communication between job seekers and employers',
        'To send relevant job recommendations and notifications',
        'To provide customer support and respond to inquiries',
        'To analyze usage patterns and improve our platform',
        'To comply with legal obligations and prevent fraud'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Globe,
      content: [
        'With employers when you apply to their job postings',
        'With service providers who help us operate our platform',
        'When required by law or to protect our rights and safety',
        'In connection with a business transaction (merger, acquisition)',
        'With your explicit consent for specific purposes',
        'We never sell your personal information to third parties'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Shield,
      content: [
        'Industry-standard encryption for data transmission and storage',
        'Regular security audits and vulnerability assessments',
        'Access controls and authentication for our systems',
        'Employee training on data protection and privacy',
        'Incident response procedures for potential data breaches',
        'Compliance with applicable data protection regulations'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: Eye,
      content: [
        'Access and review your personal information',
        'Update or correct inaccurate information',
        'Request deletion of your account and data',
        'Control your communication preferences',
        'Opt-out of certain data processing activities',
        'Request a copy of your data in a portable format'
      ]
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: Lock,
      content: [
        'We retain your information as long as your account is active',
        'Job applications are kept for the duration specified by employers',
        'Communication records are retained for customer support purposes',
        'Some data may be retained for legal compliance requirements',
        'You can request deletion of your data at any time',
        'Aggregated, non-personal data may be retained indefinitely'
      ]
    }
  ];

  const keyPoints = [
    {
      title: 'Your Control',
      description: 'You have complete control over your privacy settings and data sharing preferences.',
      icon: Eye,
    },
    {
      title: 'Transparency',
      description: 'We\'re transparent about what data we collect and how we use it.',
      icon: FileText,
    },
    {
      title: 'Security First',
      description: 'Your data is protected with enterprise-grade security measures.',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Privacy{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <div className="flex justify-center mt-6">
              <Badge variant="secondary" className="text-sm">
                Last updated: January 15, 2024
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {keyPoints.map((point, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-4">
                    <point.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Sections */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <Card key={section.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <section.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Our Privacy Team</CardTitle>
                  <CardDescription>
                    Have questions about our privacy practices?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-sm text-muted-foreground">privacy@jobportal.com</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Mail</h4>
                      <p className="text-sm text-muted-foreground">
                        Privacy Officer<br />
                        JobPortal Inc.<br />
                        123 Business Ave, Suite 100<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Changes to This Policy</CardTitle>
                  <CardDescription>
                    How we handle updates to our privacy policy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• We may update this policy periodically</li>
                    <li>• We'll notify you of material changes via email</li>
                    <li>• Continued use indicates acceptance of changes</li>
                    <li>• Previous versions are archived and available upon request</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Questions About Your Privacy?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We're committed to transparency and protecting your privacy. If you have any questions 
                  or concerns about how we handle your data, please don't hesitate to reach out.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" className="inline-flex items-center justify-center h-10 px-6 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    Contact Privacy Team
                  </a>
                  <a href="/help" className="inline-flex items-center justify-center h-10 px-6 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                    View Help Center
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;