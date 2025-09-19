import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar,
  Users,
  FileText,
  Zap,
  Check,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    workMode: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    duration: '',
    applicationDeadline: '',
    description: '',
    responsibilities: '',
    requirements: '',
    skills: [] as string[],
    isExternal: false,
    externalUrl: '',
  });

  const steps = [
    { number: 1, title: 'Job Basics', description: 'Title, company, location' },
    { number: 2, title: 'Job Details', description: 'Type, salary, requirements' },
    { number: 3, title: 'Description', description: 'Job description and skills' },
    { number: 4, title: 'Review', description: 'Review and publish' },
  ];

  const jobTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
  ];

  const workModes = [
    { value: 'remote', label: 'Remote' },
    { value: 'onsite', label: 'On-site' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'INR', label: 'INR (₹)' },
  ];

  const skillSuggestions = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'TypeScript',
    'HTML/CSS', 'Git', 'AWS', 'Docker', 'SQL', 'MongoDB',
    'Communication', 'Teamwork', 'Problem Solving', 'Leadership'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillAdd = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate job posting
    toast({
      title: "Job posted successfully!",
      description: "Your job listing is now live and visible to candidates.",
    });
    navigate('/recruiter/jobs');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Frontend Developer, Marketing Intern"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                placeholder="Your company name"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workMode">Work Mode *</Label>
                <Select value={formData.workMode} onValueChange={(value) => handleInputChange('workMode', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {workModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type *</Label>
              <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryMin">Min Salary</Label>
                <Input
                  id="salaryMin"
                  type="number"
                  placeholder="50000"
                  value={formData.salaryMin}
                  onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryMax">Max Salary</Label>
                <Input
                  id="salaryMax"
                  type="number"
                  placeholder="80000"
                  value={formData.salaryMax}
                  onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                />
              </div>
            </div>

            {formData.jobType === 'internship' && (
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (months)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="6"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="applicationDeadline">Application Deadline</Label>
              <Input
                id="applicationDeadline"
                type="date"
                value={formData.applicationDeadline}
                onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the role, company culture, and what makes this opportunity special..."
                rows={6}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities">Key Responsibilities</Label>
              <Textarea
                id="responsibilities"
                placeholder="List the main responsibilities and duties..."
                rows={4}
                value={formData.responsibilities}
                onChange={(e) => handleInputChange('responsibilities', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements & Qualifications</Label>
              <Textarea
                id="requirements"
                placeholder="List required education, experience, and qualifications..."
                rows={4}
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <Label>Required Skills</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => handleSkillRemove(skill)}>
                    {skill} ×
                  </Badge>
                ))}
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Suggested Skills (click to add)</Label>
                <div className="flex flex-wrap gap-2">
                  {skillSuggestions.filter(skill => !formData.skills.includes(skill)).map((skill) => (
                    <Badge key={skill} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground" onClick={() => handleSkillAdd(skill)}>
                      {skill} +
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isExternal"
                  checked={formData.isExternal}
                  onCheckedChange={(checked) => handleInputChange('isExternal', checked as boolean)}
                />
                <Label htmlFor="isExternal">External application (redirect to your site)</Label>
              </div>

              {formData.isExternal && (
                <div className="space-y-2">
                  <Label htmlFor="externalUrl">External Application URL</Label>
                  <Input
                    id="externalUrl"
                    placeholder="https://yourcompany.com/careers/apply"
                    value={formData.externalUrl}
                    onChange={(e) => handleInputChange('externalUrl', e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Job Preview</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium">{formData.title}</h4>
                  <p className="text-muted-foreground">{formData.company}</p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {formData.location} • {workModes.find(m => m.value === formData.workMode)?.label}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {jobTypes.find(t => t.value === formData.jobType)?.label}
                  </div>
                  {formData.salaryMin && formData.salaryMax && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {formData.currency} {formData.salaryMin} - {formData.salaryMax}
                    </div>
                  )}
                </div>

                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Before publishing, please confirm:</h4>
              <div className="space-y-3">
                {[
                  'Job details are accurate and complete',
                  'Salary range is competitive and fair',
                  'Requirements are clearly stated',
                  'Company information is up to date'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/recruiter/jobs')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Post a New Job</h1>
            <p className="text-muted-foreground">Attract the best talent to your company</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Progress Steps */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.number} className={`flex items-start gap-3 p-4 rounded-lg transition-colors ${
                  currentStep === step.number 
                    ? 'bg-primary/10 border border-primary/20' 
                    : currentStep > step.number 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-muted/30'
                }`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    currentStep === step.number 
                      ? 'bg-primary text-primary-foreground' 
                      : currentStep > step.number 
                        ? 'bg-green-600 text-white' 
                        : 'bg-muted-foreground/20 text-muted-foreground'
                  }`}>
                    {currentStep > step.number ? <Check className="h-4 w-4" /> : step.number}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{step.title}</h3>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription>
                  {steps[currentStep - 1].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 4 ? (
                    <Button variant="gradient" onClick={handleNext}>
                      Next Step
                    </Button>
                  ) : (
                    <Button variant="gradient" onClick={handleSubmit}>
                      Publish Job
                      <Briefcase className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;