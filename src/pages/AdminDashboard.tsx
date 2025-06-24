
import { useState } from "react";
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
  XCircle,
  Eye,
  Trash2,
  Edit
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = {
    totalProjects: 12,
    activeCandidates: 48,
    pendingApprovals: 3,
    completedCohorts: 2
  };

  const pendingProjects = [
    {
      id: 5,
      name: "Smart City Dashboard",
      groupName: "Urban Innovators",
      cohort: "Cohort 2024-2",
      submittedDate: "2024-01-15",
      status: "pending"
    },
    {
      id: 6,
      name: "Mental Health Companion",
      groupName: "Wellness Warriors", 
      cohort: "Cohort 2024-2",
      submittedDate: "2024-01-12",
      status: "pending"
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: "EcoTracker Mobile App",
      groupName: "Green Warriors",
      cohort: "Cohort 2024-1",
      status: "approved",
      views: 145
    },
    {
      id: 2,
      name: "SmartFinance Dashboard",
      groupName: "DataMinds",
      cohort: "Cohort 2024-1", 
      status: "approved",
      views: 98
    }
  ];

  const handleApproveProject = (projectId: number, projectName: string) => {
    toast({
      title: "Project Approved",
      description: `${projectName} has been approved and is now live in the gallery.`,
    });
  };

  const handleRejectProject = (projectId: number, projectName: string) => {
    toast({
      title: "Project Rejected",
      description: `${projectName} has been rejected and the team has been notified.`,
      variant: "destructive"
    });
  };

  const handleUploadProject = () => {
    toast({
      title: "Project Uploaded",
      description: "New project has been successfully uploaded and is pending approval.",
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
            <TabsTrigger value="approvals" className="data-[state=active]:bg-capaciti-purple data-[state=active]:text-white">
              Approvals ({pendingProjects.length})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
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
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <CheckCircle className="h-4 w-4 text-capaciti-red" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-capaciti-red">{stats.pendingApprovals}</div>
                  <p className="text-xs text-gray-600">Requires attention</p>
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

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-capaciti-navy">Recent Projects</CardTitle>
                  <CardDescription>Latest approved projects in the gallery</CardDescription>
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
                          <Badge className="bg-capaciti-purple text-white">
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-capaciti-navy">Pending Actions</CardTitle>
                  <CardDescription>Items requiring your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingProjects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-capaciti-navy">{project.name}</p>
                          <p className="text-sm text-gray-600">{project.groupName}</p>
                        </div>
                        <Badge variant="outline" className="border-capaciti-red text-capaciti-red">
                          Pending Review
                        </Badge>
                      </div>
                    ))}
                    <Button 
                      className="w-full mt-4 bg-capaciti-red hover:bg-capaciti-red/90"
                      onClick={() => setActiveTab("approvals")}
                    >
                      Review Pending Projects
                    </Button>
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
                          <Badge className="bg-capaciti-purple text-white">
                            {project.status}
                          </Badge>
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

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-capaciti-navy">Pending Approvals</CardTitle>
                <CardDescription>Review and approve projects for public viewing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pendingProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-capaciti-navy mb-1">
                            {project.name}
                          </h3>
                          <p className="text-capaciti-red font-medium mb-2">
                            Group: {project.groupName}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{project.cohort}</span>
                            <span>Submitted: {project.submittedDate}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-capaciti-red text-capaciti-red">
                          {project.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleApproveProject(project.id, project.name)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                          onClick={() => handleRejectProject(project.id, project.name)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {pendingProjects.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No pending approvals</p>
                      <p className="text-sm">All projects have been reviewed</p>
                    </div>
                  )}
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
