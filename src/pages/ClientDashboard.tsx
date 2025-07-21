import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  ArrowLeft, 
  Github, 
  Globe, 
  User, 
  Calendar,
  Code,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  skills: string[];
  githubLink?: string;
  liveDemoLink?: string;
}

interface Project {
  id: string;
  projectName: string;
  groupName: string;
  cohort: string;
  category: string;
  technologies: string;
  description: string;
  projectUrl: string;
  githubLink: string;
  teamMembers?: any[];
  createdAt: string;
}

const ClientDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load real projects from localStorage (approved team projects)
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(savedProjects);
  }, []);

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Capaciti Project Gallery</h1>
          <p className="text-muted-foreground">
            Discover innovative projects created by our talented cohorts. Each project represents months of dedication, learning, and collaboration.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((project) => (
            <Card key={project.id} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                      🧠 {project.projectName}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                      <Badge variant="secondary">Approved</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {project.projectUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-1" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.githubLink && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-1" />
                          Source
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Team/Cohort Information */}
                <Card className="bg-muted/50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="font-medium">🧑‍🤝‍🧑 {project.groupName}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.cohort} • {project.category}</p>
                  </CardContent>
                </Card>
              </CardHeader>

              <CardContent>
                {/* Project Description */}
                <div className="mb-6">
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Technologies Used</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.split(',').map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Team Members */}
                {project.teamMembers && project.teamMembers.length > 0 ? (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">👥 Team Members</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.teamMembers.map((member, index) => (
                        <Card key={member.id || index} className="hover:shadow-md transition-shadow">
                          <CardContent className="pt-4">
                            <div className="text-center mb-3">
                              <img
                                src={member.photoUrl || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"}
                                alt={member.name}
                                className="w-16 h-16 rounded-full mx-auto mb-2 object-cover border-2 border-border"
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face";
                                }}
                              />
                              <h4 className="font-medium">{member.name}</h4>
                              <p className="text-sm text-primary font-medium">{member.role}</p>
                            </div>
                            
                            <p className="text-xs text-muted-foreground mb-3 text-center leading-relaxed">
                              {member.bio}
                            </p>
                            
                            {/* Skills */}
                            {member.skills && (
                              <div className="mb-3">
                                <div className="flex flex-wrap gap-1 justify-center">
                                  {(typeof member.skills === 'string' ? member.skills.split(',') : member.skills).slice(0, 3).map((skill, skillIndex) => (
                                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                                      {typeof skill === 'string' ? skill.trim() : skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Links */}
                            <div className="flex gap-2 justify-center">
                              {member.githubLink && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={member.githubLink} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-3 w-3" />
                                  </a>
                                </Button>
                              )}
                              {member.liveDemoLink && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={member.liveDemoLink} target="_blank" rel="noopener noreferrer">
                                    <Globe className="h-3 w-3" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Individual project submission</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Projects Available</h3>
              <p className="text-muted-foreground">
                Projects from our cohorts will appear here once they are completed and approved.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;