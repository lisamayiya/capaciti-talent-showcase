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
  id: number;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  skills: string[];
  githubLink?: string;
  liveDemoLink?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  cohortName: string;
  cohortPeriod: string;
  technologies: string[];
  teamMembers: TeamMember[];
  demoLink: string;
  sourceCodeLink: string;
  status: string;
  completedDate: string;
}

const ClientDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load projects data - this would typically come from an API
    const mockProjects: Project[] = [
      {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with React frontend, Node.js backend, and PostgreSQL database. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard.",
        cohortName: "Capaciti Web Development Cohort 2024-Q1",
        cohortPeriod: "January - March 2024",
        technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
        teamMembers: [
          {
            id: 1,
            name: "Sarah Johnson",
            role: "Frontend Lead",
            bio: "Passionate frontend developer with expertise in React and modern JavaScript. Loves creating intuitive user experiences.",
            photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b9c79bb0?w=150&h=150&fit=crop&crop=face",
            skills: ["React", "TypeScript", "CSS", "UI/UX Design"],
            githubLink: "https://github.com/sarahjohnson",
            liveDemoLink: "https://sarah-portfolio.com"
          },
          {
            id: 2,
            name: "Michael Chen",
            role: "Backend Developer",
            bio: "Full-stack developer focused on backend architecture and database design. Experienced in building scalable APIs.",
            photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            skills: ["Node.js", "PostgreSQL", "API Design", "DevOps"],
            githubLink: "https://github.com/michaelchen"
          },
          {
            id: 3,
            name: "Priya Patel",
            role: "Full-Stack Developer",
            bio: "Versatile developer with strong problem-solving skills. Enjoys working on both frontend and backend challenges.",
            photoUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face",
            skills: ["React", "Node.js", "JavaScript", "MongoDB"],
            githubLink: "https://github.com/priyapatel"
          }
        ],
        demoLink: "https://ecommerce-demo.capaciti.dev",
        sourceCodeLink: "https://github.com/capaciti-org/ecommerce-platform",
        status: "Completed",
        completedDate: "March 15, 2024"
      },
      {
        id: 2,
        title: "Healthcare Management System",
        description: "A comprehensive healthcare management platform for clinics and hospitals. Includes patient records, appointment scheduling, billing, and telemedicine features.",
        cohortName: "Capaciti Full-Stack Bootcamp 2024-Q2",
        cohortPeriod: "April - June 2024",
        technologies: ["Vue.js", "Python", "Django", "MySQL", "WebRTC", "Bootstrap"],
        teamMembers: [
          {
            id: 4,
            name: "David Rodriguez",
            role: "Project Manager & Frontend",
            bio: "Experienced in project management and frontend development. Strong leadership and communication skills.",
            photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            skills: ["Vue.js", "Project Management", "JavaScript", "CSS"],
            githubLink: "https://github.com/davidrodriguez"
          },
          {
            id: 5,
            name: "Aisha Mohammed",
            role: "Backend Lead",
            bio: "Backend specialist with expertise in Python and database optimization. Passionate about clean, efficient code.",
            photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
            skills: ["Python", "Django", "MySQL", "API Development"],
            githubLink: "https://github.com/aishamohammed"
          },
          {
            id: 6,
            name: "James Wilson",
            role: "DevOps & Security",
            bio: "Focused on deployment, security, and system architecture. Ensures applications are secure and scalable.",
            photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            skills: ["DevOps", "Security", "Docker", "AWS"],
            githubLink: "https://github.com/jameswilson"
          }
        ],
        demoLink: "https://healthcare-demo.capaciti.dev",
        sourceCodeLink: "https://github.com/capaciti-org/healthcare-system",
        status: "Completed",
        completedDate: "June 20, 2024"
      }
    ];

    setProjects(mockProjects);
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
                      🧠 {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>Completed: {project.completedDate}</span>
                      <Badge variant="secondary">{project.status}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-1" />
                        Demo
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.sourceCodeLink} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        Source
                      </a>
                    </Button>
                  </div>
                </div>
                
                {/* Cohort Information */}
                <Card className="bg-muted/50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="font-medium">🧑‍🤝‍🧑 {project.cohortName}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.cohortPeriod}</p>
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
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Team Members */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">👥 Team Members</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.teamMembers.map((member) => (
                      <Card key={member.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-4">
                          <div className="text-center mb-3">
                            <img
                              src={member.photoUrl}
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
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1 justify-center">
                              {member.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
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