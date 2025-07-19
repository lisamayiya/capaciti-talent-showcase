import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Briefcase, Code, Globe, Github, CheckCircle, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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
  status: "pending" | "approved";
  submittedAt: string;
}

const CandidateDashboard = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    skills: "",
    bio: "",
    projectTitle: "",
    projectDescription: "",
    technologies: "",
    photoUrl: "",
    githubLink: "",
    liveDemoLink: "",
  });

  const [submission, setSubmission] = useState<CandidateSubmission | null>(null);

  useEffect(() => {
    // Load existing submission if any
    const savedSubmission = localStorage.getItem("candidateSubmission");
    if (savedSubmission) {
      const parsed = JSON.parse(savedSubmission);
      setSubmission(parsed);
      setFormData({
        name: parsed.name || "",
        role: parsed.role || "",
        skills: parsed.skills || "",
        bio: parsed.bio || "",
        projectTitle: parsed.projectTitle || "",
        projectDescription: parsed.projectDescription || "",
        technologies: parsed.technologies || "",
        photoUrl: parsed.photoUrl || "",
        githubLink: parsed.githubLink || "",
        liveDemoLink: parsed.liveDemoLink || "",
      });
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role || !formData.projectTitle) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in name, role, and project title.",
        variant: "destructive",
      });
      return;
    }

    const newSubmission: CandidateSubmission = {
      id: Date.now().toString(),
      ...formData,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem("candidateSubmission", JSON.stringify(newSubmission));
    setSubmission(newSubmission);

    toast({
      title: "Submission Successful!",
      description: "Your profile and project have been submitted for review.",
    });
  };

  const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(s => s);
  const techArray = formData.technologies.split(",").map(s => s.trim()).filter(s => s);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Candidate Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome! Submit your profile and project details for review and approval.
          </p>
        </div>

        {/* Status Banner */}
        {submission && (
          <Card className="mb-8 border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {submission.status === "approved" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  <div>
                    <p className="font-medium">
                      Submission Status: {" "}
                      <Badge variant={submission.status === "approved" ? "default" : "secondary"}>
                        {submission.status === "approved" ? "Approved" : "Pending Review"}
                      </Badge>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile & Project Submission
              </CardTitle>
              <CardDescription>
                Fill out your details and project information for review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role *</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => handleInputChange("role", e.target.value)}
                        placeholder="Frontend Developer"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="skills">Skills (comma-separated)</Label>
                    <Input
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => handleInputChange("skills", e.target.value)}
                      placeholder="React, TypeScript, Node.js"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Short Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="photoUrl">Photo URL</Label>
                    <Input
                      id="photoUrl"
                      value={formData.photoUrl}
                      onChange={(e) => handleInputChange("photoUrl", e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      type="url"
                    />
                  </div>
                </div>

                <Separator />

                {/* Project Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Project Information
                  </h3>

                  <div>
                    <Label htmlFor="projectTitle">Project Title *</Label>
                    <Input
                      id="projectTitle"
                      value={formData.projectTitle}
                      onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                      placeholder="My Awesome Project"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="projectDescription">Project Description</Label>
                    <Textarea
                      id="projectDescription"
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                      placeholder="Describe your project..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="technologies">Technologies Used (comma-separated)</Label>
                    <Input
                      id="technologies"
                      value={formData.technologies}
                      onChange={(e) => handleInputChange("technologies", e.target.value)}
                      placeholder="React, Tailwind CSS, Firebase"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="githubLink">GitHub Link</Label>
                      <Input
                        id="githubLink"
                        value={formData.githubLink}
                        onChange={(e) => handleInputChange("githubLink", e.target.value)}
                        placeholder="https://github.com/username/repo"
                        type="url"
                      />
                    </div>
                    <div>
                      <Label htmlFor="liveDemoLink">Live Demo Link</Label>
                      <Input
                        id="liveDemoLink"
                        value={formData.liveDemoLink}
                        onChange={(e) => handleInputChange("liveDemoLink", e.target.value)}
                        placeholder="https://myproject.com"
                        type="url"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  {submission ? "Update Submission" : "Submit for Review"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                This is how your profile will appear to admins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Profile Preview */}
                <div className="text-center">
                  {formData.photoUrl ? (
                    <img
                      src={formData.photoUrl}
                      alt={formData.name || "Profile"}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-border"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop&crop=face";
                      }}
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-muted flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold">{formData.name || "Your Name"}</h3>
                  <p className="text-primary font-medium">{formData.role || "Your Role"}</p>
                </div>

                {/* Skills */}
                {skillsArray.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillsArray.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bio */}
                {formData.bio && (
                  <div>
                    <h4 className="font-semibold mb-2">Bio</h4>
                    <p className="text-sm text-muted-foreground">{formData.bio}</p>
                  </div>
                )}

                <Separator />

                {/* Project Preview */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Featured Project
                  </h4>
                  
                  <div className="border rounded-lg p-4 space-y-3">
                    <h5 className="font-medium">{formData.projectTitle || "Project Title"}</h5>
                    
                    {formData.projectDescription && (
                      <p className="text-sm text-muted-foreground">{formData.projectDescription}</p>
                    )}

                    {techArray.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {techArray.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      {formData.githubLink && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={formData.githubLink} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3 mr-1" />
                            Code
                          </a>
                        </Button>
                      )}
                      {formData.liveDemoLink && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={formData.liveDemoLink} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-3 w-3 mr-1" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;