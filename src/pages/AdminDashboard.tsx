import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Users, 
  FolderOpen, 
  CheckCircle, 
  Eye,
  Trash2,
  MessageCircle,
  Clock,
  User,
  Building,
  Mail,
  FileText,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Github
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getInterviewRequests, updateInterviewRequestStatus, type InterviewRequest } from "@/lib/interview-requests";

interface CandidateSubmission {
  id: string;
  name: string;
  role: string;
  skills: string;
  bio: string;
  projectTitle: string;
  projectDescription: string;
  technologies: string;
  photoUrl: string;
  githubLink: string;
  liveDemoLink: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [interviewRequests, setInterviewRequests] = useState<InterviewRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<InterviewRequest | null>(null);
  const [submissions, setSubmissions] = useState<CandidateSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<CandidateSubmission | null>(null);
  const [projects, setProjects] = useState<any[]>([]);

  // Get real data from storage
  const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
  const stats = {
    totalProjects: savedProjects.length,
    pendingSubmissions: submissions.filter(s => s.status === "pending").length,
    approvedSubmissions: submissions.filter(s => s.status === "approved").length
  };

  const recentProjects = savedProjects.slice(-2);

  // Load interview requests, submissions, and projects from storage
  useEffect(() => {
    setInterviewRequests(getInterviewRequests());
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(savedProjects);
    
    // Load all candidate submissions
    const allSubmissions: CandidateSubmission[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('candidateSubmission')) {
        try {
          const submission = JSON.parse(localStorage.getItem(key) || '{}');
          if (submission.id) {
            allSubmissions.push(submission);
          }
        } catch (e) {
          console.warn('Failed to parse submission:', key);
        }
      }
    }
    setSubmissions(allSubmissions);
  }, [activeTab]);

  const handleApproveSubmission = (submissionId: string) => {
    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return;

    const updatedSubmission = { ...submission, status: "approved" as const };
    localStorage.setItem(`candidateSubmission_${submissionId}`, JSON.stringify(updatedSubmission));
    
    // Also save to projects for client visibility
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const newProject = {
      id: `project_${submissionId}`,
      projectName: submission.projectTitle,
      groupName: submission.name,
      cohort: "Candidate Submission",
      category: "Individual",
      technologies: submission.technologies,
      candidates: submission.name,
      description: submission.projectDescription,
      projectUrl: submission.liveDemoLink,
      githubLink: submission.githubLink,
      photoUrl: submission.photoUrl,
      candidateData: submission,
      createdAt: new Date().toISOString()
    };
    savedProjects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(savedProjects));

    setSubmissions(prev => prev.map(s => 
      s.id === submissionId ? updatedSubmission : s
    ));

    toast({
      title: "Submission Approved",
      description: "The submission has been approved and is now visible to clients.",
    });
  };

  const handleRejectSubmission = (submissionId: string) => {
    const submission = submissions.find(s => s.id === submissionId);
    if (!submission) return;

    const updatedSubmission = { ...submission, status: "rejected" as const };
    localStorage.setItem(`candidateSubmission_${submissionId}`, JSON.stringify(updatedSubmission));

    setSubmissions(prev => prev.map(s => 
      s.id === submissionId ? updatedSubmission : s
    ));

    toast({
      title: "Submission Rejected",
      description: "The submission has been rejected.",
      variant: "destructive"
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
    window.open(`/project/${projectId}`, '_blank');
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
          <p className="text-lg text-gray-600">Manage projects, review submissions, and handle client requests</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="overview" className="data-[state=active]:bg-capaciti-purple data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-capaciti-purple data-[state=active]:text-white">
              Projects
            </TabsTrigger>
            <TabsTrigger value="submissions" className="data-[state=active]:bg-capaciti-purple data-[state=active]:text-white">
              Review Submissions
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
                  <p className="text-xs text-gray-600">Live in gallery</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Submissions</CardTitle>
                  <Clock className="h-4 w-4 text-capaciti-purple" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-capaciti-navy">{stats.pendingSubmissions}</div>
                  <p className="text-xs text-gray-600">Awaiting review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Approved Submissions</CardTitle>
                  <CheckCircle className="h-4 w-4 text-capaciti-purple" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-capaciti-navy">{stats.approvedSubmissions}</div>
                  <p className="text-xs text-gray-600">Currently visible</p>
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

          {/* Review Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-capaciti-navy">Candidate Submissions</CardTitle>
                <CardDescription>Review and approve candidate project submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No submissions yet</p>
                    </div>
                  ) : (
                    submissions.map((submission) => (
                      <div key={submission.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-medium text-capaciti-navy">{submission.name}</h3>
                              <Badge 
                                variant={
                                  submission.status === "approved" ? "default" : 
                                  submission.status === "rejected" ? "destructive" : "secondary"
                                }
                                className={
                                  submission.status === "approved" ? "bg-green-100 text-green-800" :
                                  submission.status === "rejected" ? "bg-red-100 text-red-800" :
                                  "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {submission.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                                {submission.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                                {submission.status === "rejected" && <ThumbsDown className="h-3 w-3 mr-1" />}
                                {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{submission.role}</p>
                            <p className="text-sm font-medium text-capaciti-navy mb-2">{submission.projectTitle}</p>
                            <p className="text-sm text-gray-500">
                              Technologies: {submission.technologies || "Not specified"}
                            </p>
                            <p className="text-xs text-gray-400">
                              Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedSubmission(submission)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Submission Details</DialogTitle>
                                  <DialogDescription>
                                    Review candidate information and project details
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedSubmission && (
                                  <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                      <div className="space-y-4">
                                        <div>
                                          <h4 className="font-medium text-capaciti-navy mb-2">Candidate Information</h4>
                                          <div className="space-y-2">
                                            <p><strong>Name:</strong> {selectedSubmission.name}</p>
                                            <p><strong>Role:</strong> {selectedSubmission.role}</p>
                                            <p><strong>Skills:</strong> {selectedSubmission.skills}</p>
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="font-medium text-capaciti-navy mb-2">Bio</h4>
                                          <p className="text-sm text-gray-600">{selectedSubmission.bio || "No bio provided"}</p>
                                        </div>
                                      </div>
                                      <div className="space-y-4">
                                        <div>
                                          <h4 className="font-medium text-capaciti-navy mb-2">Project Information</h4>
                                          <div className="space-y-2">
                                            <p><strong>Title:</strong> {selectedSubmission.projectTitle}</p>
                                            <p><strong>Technologies:</strong> {selectedSubmission.technologies}</p>
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="font-medium text-capaciti-navy mb-2">Description</h4>
                                          <p className="text-sm text-gray-600">{selectedSubmission.projectDescription || "No description provided"}</p>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {selectedSubmission.photoUrl && (
                                      <div>
                                        <h4 className="font-medium text-capaciti-navy mb-2">Photo</h4>
                                        <img 
                                          src={selectedSubmission.photoUrl} 
                                          alt={selectedSubmission.name}
                                          className="w-32 h-32 rounded-lg object-cover"
                                        />
                                      </div>
                                    )}
                                    
                                    <div className="flex flex-wrap gap-4">
                                      {selectedSubmission.githubLink && (
                                        <a 
                                          href={selectedSubmission.githubLink} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="flex items-center text-blue-600 hover:text-blue-800"
                                        >
                                          <Github className="h-4 w-4 mr-1" />
                                          GitHub Repository
                                        </a>
                                      )}
                                      {selectedSubmission.liveDemoLink && (
                                        <a 
                                          href={selectedSubmission.liveDemoLink} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="flex items-center text-blue-600 hover:text-blue-800"
                                        >
                                          <ExternalLink className="h-4 w-4 mr-1" />
                                          Live Demo
                                        </a>
                                      )}
                                    </div>
                                    
                                    {selectedSubmission.status === "pending" && (
                                      <div className="flex space-x-4 pt-4 border-t">
                                        <Button 
                                          className="bg-green-600 hover:bg-green-700 text-white"
                                          onClick={() => {
                                            handleApproveSubmission(selectedSubmission.id);
                                            setSelectedSubmission(null);
                                          }}
                                        >
                                          <ThumbsUp className="h-4 w-4 mr-2" />
                                          Approve
                                        </Button>
                                        <Button 
                                          variant="destructive"
                                          onClick={() => {
                                            handleRejectSubmission(selectedSubmission.id);
                                            setSelectedSubmission(null);
                                          }}
                                        >
                                          <ThumbsDown className="h-4 w-4 mr-2" />
                                          Reject
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            {submission.status === "pending" && (
                              <>
                                <Button 
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => handleApproveSubmission(submission.id)}
                                >
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleRejectSubmission(submission.id)}
                                >
                                  <ThumbsDown className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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
                              <Building className="h-4 w-4" />
                              <span>{request.companyName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>{request.clientEmail}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span>Phone: {request.phoneNumber}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEmailClient(request)}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Email Client
                          </Button>
                          {request.status === 'pending' && (
                            <Button 
                              size="sm"
                              className="bg-capaciti-purple hover:bg-capaciti-purple/90"
                              onClick={() => handleContactCandidate(request.id)}
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Contact Candidate
                            </Button>
                          )}
                        </div>
                      </div>
                      {request.message && (
                        <div className="bg-gray-50 rounded p-3">
                          <p className="text-sm text-gray-700">{request.message}</p>
                        </div>
                      )}
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