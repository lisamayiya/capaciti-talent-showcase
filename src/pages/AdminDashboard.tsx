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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  Building,
  Mail,
  Save,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getInterviewRequests, updateInterviewRequestStatus, type InterviewRequest } from "@/lib/interview-requests";

interface ProjectForm {
  projectName: string;
  groupName: string;
  cohort: string;
  category: string;
  technologies: string;
  candidates: string;
  description: string;
  projectUrl: string;
}

interface Draft extends ProjectForm {
  id: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [interviewRequests, setInterviewRequests] = useState<InterviewRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<InterviewRequest | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [projectForm, setProjectForm] = useState<ProjectForm>({
    projectName: "",
    groupName: "",
    cohort: "",
    category: "",
    technologies: "",
    candidates: "",
    description: "",
    projectUrl: ""
  });

  // State for projects and editing
  const [projects, setProjects] = useState<any[]>([]);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Get real data from storage
  const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
  const stats = {
    totalProjects: savedProjects.length,
    activeCandidates: savedProjects.reduce((count: number, project: any) => {
      const candidateCount = project.candidates ? project.candidates.split('\n').filter((c: string) => c.trim()).length : 0;
      return count + candidateCount;
    }, 0),
    completedCohorts: [...new Set(savedProjects.map((p: any) => p.cohort))].length
  };

  const recentProjects = savedProjects.slice(-2);

  // Load interview requests, drafts, and projects from storage
  useEffect(() => {
    setInterviewRequests(getInterviewRequests());
    const savedDrafts = JSON.parse(localStorage.getItem('project-drafts') || '[]');
    setDrafts(savedDrafts);
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(savedProjects);
  }, [activeTab]);

  const handleUploadProject = () => {
    if (!projectForm.projectName || !projectForm.groupName || !projectForm.cohort) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Save project (in real app, this would be an API call)
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const newProject = {
      ...projectForm,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    savedProjects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(savedProjects));

    // Clear form
    setProjectForm({
      projectName: "",
      groupName: "",
      cohort: "",
      category: "",
      technologies: "",
      candidates: "",
      description: "",
      projectUrl: ""
    });

    toast({
      title: "Project Uploaded",
      description: "New project has been successfully uploaded and is now live in the gallery.",
    });
  };

  const handleSaveAsDraft = () => {
    const newDraft: Draft = {
      ...projectForm,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedDrafts = [...drafts, newDraft];
    setDrafts(updatedDrafts);
    localStorage.setItem('project-drafts', JSON.stringify(updatedDrafts));

    // Clear form
    setProjectForm({
      projectName: "",
      groupName: "",
      cohort: "",
      category: "",
      technologies: "",
      candidates: "",
      description: "",
      projectUrl: ""
    });

    toast({
      title: "Draft Saved",
      description: "Project has been saved as draft.",
    });
  };

  const handleLoadDraft = (draft: Draft) => {
    setProjectForm({
      projectName: draft.projectName,
      groupName: draft.groupName,
      cohort: draft.cohort,
      category: draft.category,
      technologies: draft.technologies,
      candidates: draft.candidates,
      description: draft.description,
      projectUrl: draft.projectUrl
    });
    setActiveTab("upload");
  };

  const handleDeleteDraft = (draftId: string) => {
    const updatedDrafts = drafts.filter(d => d.id !== draftId);
    setDrafts(updatedDrafts);
    localStorage.setItem('project-drafts', JSON.stringify(updatedDrafts));
    
    toast({
      title: "Draft Deleted",
      description: "Draft has been removed.",
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

  const handleEmailClient = (request: InterviewRequest) => {
    const subject = `Re: Interview Request for ${request.candidateName}`;
    const body = `Dear ${request.companyName} team,\n\nThank you for your interest in ${request.candidateName}. We have received your interview request and will coordinate with the candidate.\n\nBest regards,\nCapaciti Team`;
    
    const mailtoLink = `mailto:${request.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    
    toast({
      title: "Email Client Opened",
      description: "Email client opened with pre-filled message.",
    });
  };

  const handleViewProject = (projectId: string) => {
    // Navigate to project detail page or open in new tab
    window.open(`/project/${projectId}`, '_blank');
  };

  const handleEditProject = (project: any) => {
    setProjectForm({
      projectName: project.projectName,
      groupName: project.groupName,
      cohort: project.cohort,
      category: project.category || "",
      technologies: project.technologies || "",
      candidates: project.candidates || "",
      description: project.description || "",
      projectUrl: project.projectUrl || ""
    });
    setEditingProjectId(project.id);
    setIsEditingProject(true);
    setActiveTab("upload");
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    toast({
      title: "Project Deleted",
      description: "Project has been removed from the gallery.",
    });
  };

  const handleUpdateProject = () => {
    if (!editingProjectId) return;
    
    const updatedProjects = projects.map(p => 
      p.id === editingProjectId 
        ? { ...p, ...projectForm, updatedAt: new Date().toISOString() }
        : p
    );
    
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    // Clear form and editing state
    setProjectForm({
      projectName: "",
      groupName: "",
      cohort: "",
      category: "",
      technologies: "",
      candidates: "",
      description: "",
      projectUrl: ""
    });
    setIsEditingProject(false);
    setEditingProjectId(null);
    
    toast({
      title: "Project Updated",
      description: "Project has been successfully updated.",
    });
  };

  const handleCancelEdit = () => {
    setProjectForm({
      projectName: "",
      groupName: "",
      cohort: "",
      category: "",
      technologies: "",
      candidates: "",
      description: "",
      projectUrl: ""
    });
    setIsEditingProject(false);
    setEditingProjectId(null);
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
          <TabsList className="grid w-full grid-cols-5 bg-white">
            <TabsTrigger value="overview" className="data-[state=active]:bg-capaciti-purple data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-capaciti-purple data-[state=active]:text-white">
              Projects
            </TabsTrigger>
            <TabsTrigger value="upload" className="data-[state=active]:bg-capaciti-purple data-[state=active]:text-white">
              Upload New
            </TabsTrigger>
            <TabsTrigger value="drafts" className="data-[state=active]:bg-capaciti-purple data-[state=active]:text-white">
              Drafts
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
                    {recentProjects.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        <p>No projects uploaded yet</p>
                      </div>
                    ) : (
                      recentProjects.map((project) => (
                        <div 
                          key={project.id} 
                          className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                          onClick={() => handleViewProject(project.id)}
                        >
                          <div>
                            <p className="font-medium text-capaciti-navy">{project.projectName}</p>
                            <p className="text-sm text-gray-600">{project.groupName} • {project.cohort}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Active
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
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
                  {projects.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No projects uploaded yet</p>
                    </div>
                  ) : (
                    projects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-capaciti-navy">{project.projectName}</h3>
                          </div>
                          <p className="text-sm text-gray-600">{project.groupName} • {project.cohort}</p>
                          <p className="text-sm text-gray-500">Created: {new Date(project.createdAt).toLocaleDateString()}</p>
                          {project.projectUrl && (
                            <p className="text-sm text-blue-600">URL: {project.projectUrl}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewProject(project.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditProject(project)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-capaciti-navy">
                  {isEditingProject ? "Edit Project" : "Upload New Project"}
                </CardTitle>
                <CardDescription>
                  {isEditingProject ? "Update project information" : "Add a new group project to the platform"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="projectName">Project Name *</Label>
                      <Input 
                        id="projectName" 
                        placeholder="Enter project name" 
                        value={projectForm.projectName}
                        onChange={(e) => setProjectForm({...projectForm, projectName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="groupName">Group Name *</Label>
                      <Input 
                        id="groupName" 
                        placeholder="Enter group name" 
                        value={projectForm.groupName}
                        onChange={(e) => setProjectForm({...projectForm, groupName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cohort">Cohort *</Label>
                      <Select value={projectForm.cohort} onValueChange={(value) => setProjectForm({...projectForm, cohort: value})}>
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
                      <Select value={projectForm.category} onValueChange={(value) => setProjectForm({...projectForm, category: value})}>
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
                      <Label htmlFor="projectUrl">Project URL</Label>
                      <Input 
                        id="projectUrl" 
                        placeholder="https://project-demo.com" 
                        type="url"
                        value={projectForm.projectUrl}
                        onChange={(e) => setProjectForm({...projectForm, projectUrl: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="technologies">Technologies Used</Label>
                      <Input 
                        id="technologies" 
                        placeholder="React, Node.js, MongoDB..." 
                        value={projectForm.technologies}
                        onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="candidates">Team Members</Label>
                      <Textarea 
                        id="candidates" 
                        placeholder="Enter candidate names (one per line)"
                        className="min-h-[100px]"
                        value={projectForm.candidates}
                        onChange={(e) => setProjectForm({...projectForm, candidates: e.target.value})}
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
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  />
                </div>

                <Separator />

                <div className="flex justify-end space-x-4">
                  {isEditingProject && (
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  )}
                  {!isEditingProject && (
                    <Button variant="outline" onClick={handleSaveAsDraft}>
                      <Save className="h-4 w-4 mr-2" />
                      Save as Draft
                    </Button>
                  )}
                  <Button 
                    className="bg-capaciti-purple hover:bg-capaciti-purple/90"
                    onClick={isEditingProject ? handleUpdateProject : handleUploadProject}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isEditingProject ? "Update Project" : "Upload Project"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Drafts Tab */}
          <TabsContent value="drafts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-capaciti-navy flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Project Drafts
                </CardTitle>
                <CardDescription>Manage saved project drafts</CardDescription>
              </CardHeader>
              <CardContent>
                {drafts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No drafts saved yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {drafts.map((draft) => (
                      <div key={draft.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-capaciti-navy">{draft.projectName || "Untitled Project"}</h3>
                            <p className="text-sm text-gray-600">{draft.groupName} • {draft.cohort}</p>
                            <p className="text-xs text-gray-500">Saved: {new Date(draft.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleLoadDraft(draft)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteDraft(draft.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                        {draft.description && (
                          <div className="bg-gray-50 rounded p-3">
                            <p className="text-sm text-gray-700">{draft.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Interview Request Details</DialogTitle>
                              <DialogDescription>
                                Full details of the interview request from {request.companyName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Candidate Name</Label>
                                  <p className="text-sm text-gray-700">{request.candidateName}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Company</Label>
                                  <p className="text-sm text-gray-700">{request.companyName}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Client Email</Label>
                                  <p className="text-sm text-gray-700">{request.clientEmail}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Project</Label>
                                  <p className="text-sm text-gray-700">{request.projectName || "Not specified"}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Request Date</Label>
                                  <p className="text-sm text-gray-700">{new Date(request.requestDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Status</Label>
                                  <Badge variant={request.status === 'pending' ? 'secondary' : 'default'} 
                                         className={request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                                    {request.status === 'pending' ? 'Pending' : 'Contacted'}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Message</Label>
                                <div className="bg-gray-50 rounded-lg p-4 mt-2">
                                  <p className="text-sm text-gray-700">{request.message}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEmailClient(request)}
                        >
                          <Mail className="h-4 w-4 mr-1" />
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
