import { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Globe, Github, Linkedin, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';

const Profile = () => {
  const { user, profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user || !profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
          <Button onClick={() => window.location.href = '/login'}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  // Sample data for demonstration
  const sampleData = {
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Git'],
    education: [
      {
        degree: 'Bachelor of Computer Science',
        institution: 'University of Technology',
        year: '2024',
        gpa: '3.8/4.0'
      }
    ],
    experience: [
      {
        title: 'Frontend Developer Intern',
        company: 'TechCorp',
        duration: 'Jun 2023 - Aug 2023',
        description: 'Worked on React-based web applications and improved user interface components.'
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-accent text-white">
                  {getInitials(profile.full_name)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                onClick={() => setIsEditing(true)}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold">{profile.full_name}</h1>
                  <p className="text-muted-foreground text-lg">{profile.bio || 'Add your bio'}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {profile.role}
                  </Badge>
                  {profile.is_verified && (
                    <Badge variant="default">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {profile.phone}
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.website && (
                  <Button variant="outline" size="sm" onClick={() => window.open(profile.website, '_blank')}>
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </Button>
                )}
                {profile.linkedin_url && (
                  <Button variant="outline" size="sm" onClick={() => window.open(profile.linkedin_url, '_blank')}>
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                )}
                {profile.github_url && (
                  <Button variant="outline" size="sm" onClick={() => window.open(profile.github_url, '_blank')}>
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Your technical and professional skills</CardDescription>
          </CardHeader>
          <CardContent>
            {profile.skills && profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {sampleData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resume */}
        <Card>
          <CardHeader>
            <CardTitle>Resume</CardTitle>
            <CardDescription>Your current resume document</CardDescription>
          </CardHeader>
          <CardContent>
            {profile.resume_url ? (
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Resume.pdf</p>
                  <p className="text-sm text-muted-foreground">Last updated: 2 days ago</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                <p className="text-muted-foreground mb-4">No resume uploaded</p>
                <Button variant="outline">
                  Upload Resume
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
            <CardDescription>Your educational background</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleData.education.map((edu, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Class of {edu.year}</span>
                    <span className="font-medium">GPA: {edu.gpa}</span>
                  </div>
                  {index < sampleData.education.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
            <CardDescription>Your work experience and internships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleData.experience.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold">{exp.title}</h4>
                  <p className="text-sm text-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.duration}</p>
                  <p className="text-sm">{exp.description}</p>
                  {index < sampleData.experience.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your job search and applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="justify-start">
              View Applications
            </Button>
            <Button variant="outline" className="justify-start">
              Saved Jobs
            </Button>
            <Button variant="outline" className="justify-start">
              Messages
            </Button>
            <Button variant="outline" className="justify-start">
              Account Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;