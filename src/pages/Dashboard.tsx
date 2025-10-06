import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Bell,
  Calendar,
  MessageSquare,
  BookmarkIcon,
  PlusCircle,
  BarChart3,
  Settings,
  Search,
  MapPin,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!profile) {
      return; // Wait for profile to load
    }

    // Set theme based on role - only if not already set
    const currentTheme = localStorage.getItem('theme');
    if (!currentTheme || currentTheme === 'system') {
      if (profile?.role === 'student') {
        setTheme('casual');
      } else if (profile?.role === 'recruiter') {
        setTheme('professional');
      } else if (profile?.role === 'admin') {
        setTheme('light');
      }
    }

    setLoading(false);
  }, [user, profile, navigate, setTheme]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Setup Required</CardTitle>
            <CardDescription>Please complete your profile setup</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/profile')} className="w-full">
              Complete Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {profile.full_name}!
            </h1>
            <p className="text-muted-foreground">
              {profile.role === 'student' && "Ready to find your next opportunity?"}
              {profile.role === 'recruiter' && "Let's find great talent today!"}
              {profile.role === 'admin' && "Manage your platform efficiently."}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="capitalize">
              {profile.role}
            </Badge>
            <Avatar>
              <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
              <AvatarFallback>
                {profile.full_name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Student Dashboard */}
        {profile.role === 'student' && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Applications</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">+2 this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
                  <BookmarkIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">+12 this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">1 upcoming</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">+24% this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="h-5 w-5" />
                    <span>Find Jobs</span>
                  </CardTitle>
                  <CardDescription>Discover new opportunities that match your skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/jobs')} className="w-full">
                    Browse Jobs
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5" />
                    <span>Internships</span>
                  </CardTitle>
                  <CardDescription>Gain experience with internship opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/internships')} className="w-full" variant="outline">
                    View Internships
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Profile</span>
                  </CardTitle>
                  <CardDescription>Keep your profile updated and attractive</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/profile')} className="w-full" variant="outline">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Recruiter Dashboard */}
        {profile.role === 'recruiter' && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 this month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Applications</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">189</div>
                  <p className="text-xs text-muted-foreground">+47 this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">8 this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hired</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">+6 this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PlusCircle className="h-5 w-5" />
                    <span>Post Job</span>
                  </CardTitle>
                  <CardDescription>Create a new job posting to attract talent</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/recruiter/post-job')} className="w-full">
                    Post New Job
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Manage Applications</span>
                  </CardTitle>
                  <CardDescription>Review and manage candidate applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/recruiter/applications')} className="w-full" variant="outline">
                    View Applications
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Analytics</span>
                  </CardTitle>
                  <CardDescription>View performance metrics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/recruiter/analytics')} className="w-full" variant="outline">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Admin Dashboard */}
        {profile.role === 'admin' && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15,234</div>
                  <p className="text-xs text-muted-foreground">+180 this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">+94 this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Companies</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">456</div>
                  <p className="text-xs text-muted-foreground">+23 this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">+1.2% this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Admin Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>User Management</span>
                  </CardTitle>
                  <CardDescription>Manage users, recruiters, and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/admin/users')} className="w-full">
                    Manage Users
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5" />
                    <span>Job Moderation</span>
                  </CardTitle>
                  <CardDescription>Review and approve job postings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/admin/jobs')} className="w-full" variant="outline">
                    Review Jobs
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Platform Analytics</span>
                  </CardTitle>
                  <CardDescription>View comprehensive platform metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/admin/analytics')} className="w-full" variant="outline">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;