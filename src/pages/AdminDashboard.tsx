import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Plus, 
  Upload, 
  Users, 
  FolderOpen, 
  CheckCircle, 
  Eye,
  Trash2,
  Edit,
  MessageCircle,
  Clock,
  User,
  Building
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getInterviewRequests, updateInterviewRequestStatus, type InterviewRequest } from "@/lib/interview-requests";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [interviewRequests, setInterviewRequests] = useState<InterviewRequest[]>([]);

  // Mock data
  const stats = {
    totalProjects: 12,
    activeCandidates: 48,
    completedCohorts: 2
  };

  const recentProjects = [
    {
      id: 1,
      name: "EcoTracker Mobile App",
      groupName: "Green Warriors",
      cohort: "Cohort 2024-1",
      views: 145
    },
    {
      id: 2,
      name: "SmartFinance Dashboard",
      groupName: "DataMinds",
      cohort: "Cohort 2024-1", 
      views: 98
    }
  ];

  // Load interview requests from storage
  useEffect(() => {
    setInterviewRequests(getInterviewRequests());
  }, [activeTab]); // Refresh when switching to interviews tab

  const handleUploadProject = () => {
    toast({
      title: "Project Uploaded",
      description: "New project has been successfully uploaded and is now live in the gallery.",
    });
  };

  const handleContactCandidate = (requestId: string) => {
    updateInterviewRequestStatus(requestId, 'contacted');
    setInterviewRequests(getInterviewRequests());
    toast({
      title: "Candidate Contacted",
      description: "The candidate has been notified about the interview request.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-capaciti-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-capaciti-purple rounded-full flex items-center justify-center">
                  <span className="text-capaciti-white font-bold text-lg">C</span>
                </div>
                <span className="text-capaciti-navy font-bold text-xl">Capaciti Admin</span>
              </div>
            </div>
            <Badge className="bg-capaciti-red text-white">
              Admin Access
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-capaciti-navy mb-2">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">Manage projects, candidates, and platform content</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="overview" className="data-[state=active]:bg-capaciti-purple data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-capaciti-purple data-[state=active]:text-white">
              Projects
            </TabsTrigger>
            <TabsTrigger value="upload" className="data-[state=active]:bg-capaciti-purple data-[state=active]:text-white">
              Upload New
            </TabsTrigger>
            <TabsTrigger value="interviews" className="data-[state=active]:bg-capaciti-purple data-[state=active]:text-white">
              Interview Requests
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                  <FolderOpen className="h-4 w-4 text-capaciti-purple" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-capaciti-navy">{stats.totalProjects}</div>
                  <p className="text-xs text-gray-600">Across all cohorts</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Candidates</CardTitle>
                  <Users className="h-4 w-4 text-capaciti-purple" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-capaciti-navy">{stats.activeCandidates}</div>
                  <p className="text-xs text-gray-600">Currently enrolled</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Cohorts</CardTitle>
                  <CheckCircle className="h-4 w-4 text-capaciti-purple" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-capaciti-navy">{stats.completedCohorts}</div>
                  <p className="text-xs text-gray-600">Successfully graduated</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-capaciti-navy">Recent Projects</CardTitle>
                  <CardDescription>Latest projects in the gallery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentProjects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-capaciti-navy">{project.name}</p>
                          <p className="text-sm text-gray-600">{project.groupName} • {project.cohort}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {project.views} views
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-capaciti-navy">All Projects</CardTitle>
                <CardDescription>Manage existing projects and their visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-capaciti-navy">{project.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{project.groupName} • {project.cohort}</p>
                        <p className="text-sm text-gray-500">{project.views} views</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-capaciti-navy">Upload New Project</CardTitle>
                <CardDescription>Add a new group project to the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input id="projectName" placeholder="Enter project name" />
                    </div>
                    <div>
                      <Label htmlFor="groupName">Group Name</Label>
                      <Input id="groupName" placeholder="Enter group name" />
                    </div>
                    <div>
                      <Label htmlFor="cohort">Cohort</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cohort" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="2024-1">Cohort 2024-1</SelectItem>
                          <SelectItem value="2024-2">Cohort 2024-2</SelectItem>
                          <SelectItem value="2024-3">Cohort 2024-3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="web">Web Development</SelectItem>
                          <SelectItem value="mobile">Mobile Development</SelectItem>
                          <SelectItem value="data">Data Science</SelectItem>
                          <SelectItem value="ai">AI/ML</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="technologies">Technologies Used</Label>
                      <Input id="technologies" placeholder="React, Node.js, MongoDB..." />
                    </div>
                    <div>
                      <Label htmlFor="candidates">Team Members</Label>
                      <Textarea 
                        id="candidates" 
                        placeholder="Enter candidate names (one per line)"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide a detailed description of the project..."
                    className="min-h-[120px]"
                  />
                </div>

                <Separator />

                <div className="flex justify-end space-x-4">
                  <Button variant="outline">
                    Save as Draft
                  </Button>
                  <Button 
                    className="bg-capaciti-purple hover:bg-capaciti-purple/90"
                    onClick={handleUploadProject}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interview Requests Tab */}
          <TabsContent value="interviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-capaciti-navy flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Interview Requests
                </CardTitle>
                <CardDescription>Manage client interview requests for candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interviewRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <User className="h-4 w-4 text-capaciti-purple" />
                            <h3 className="font-semibold text-capaciti-navy">{request.candidateName}</h3>
                            <Badge variant={request.status === 'pending' ? 'secondary' : 'default'} 
                                   className={request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                              {request.status === 'pending' ? 'Pending' : 'Contacted'}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center space-x-2">
                              <Building className="h-3 w-3" />
                              <span>{request.companyName}</span>
                              <span>•</span>
                              <span>{request.clientEmail}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FolderOpen className="h-3 w-3" />
                              <span>Project: {request.projectName || "Not specified"}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-3 w-3" />
                              <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded p-3">
                        <p className="text-sm text-gray-700">{request.message}</p>
                      </div>
                      <div className="flex space-x-2">
                        {request.status === 'pending' && (
                          <Button 
                            size="sm" 
                            className="bg-capaciti-purple hover:bg-capaciti-purple/90"
                            onClick={() => handleContactCandidate(request.id)}
                          >
                            Contact Candidate
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Email Client
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
