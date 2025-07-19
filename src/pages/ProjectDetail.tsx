import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Users, Calendar, Code, ExternalLink, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { InterviewRequestForm } from "@/components/InterviewRequestForm";

const ProjectDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedCandidate, setSelectedCandidate] = useState<{name: string, id: number} | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [project, setProject] = useState<any>(null);

  // Load project data from localStorage based on ID
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const foundProject = savedProjects.find((p: any) => p.id === id);
    
    if (foundProject) {
      // Transform the stored project data to match the expected format
      const transformedProject = {
        id: foundProject.id,
        name: foundProject.projectName,
        groupName: foundProject.groupName,
        cohort: foundProject.cohort,
        startDate: new Date(foundProject.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        duration: "8 weeks", // Default duration
        description: foundProject.description || "No description available.",
        detailedDescription: foundProject.description || "No detailed description available.",
        technologies: foundProject.technologies ? foundProject.technologies.split(',').map((t: string) => t.trim()) : [],
        features: [
          "Project developed during bootcamp",
          "Collaborative team development",
          "Modern technology implementation",
          "Industry-standard practices"
        ],
        candidates: foundProject.candidates ? foundProject.candidates.split('\n').filter((c: string) => c.trim()).map((name: string, index: number) => ({
          id: index + 1,
          name: name.trim(),
          role: "Developer",
          bio: "Passionate developer working on innovative solutions.",
          image: `https://images.unsplash.com/photo-${1494790108755 + index}?w=150&h=150&fit=crop&crop=face`
        })) : [],
        category: foundProject.category || "Development",
        demoUrl: foundProject.projectUrl || "#",
        githubUrl: "#"
      };
      setProject(transformedProject);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
          <Link to="/projects">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInterviewRequest = (candidateName: string, candidateId: number) => {
    setSelectedCandidate({ name: candidateName, id: candidateId });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-capaciti-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/projects">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Projects
                </Button>
              </Link>
              <img 
                src="/lovable-uploads/3a6c0701-3e05-4bae-a4a2-cfea7f370969.png" 
                alt="Capaciti Logo" 
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Project Header */}
        <div className="bg-capaciti-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-capaciti-purple text-white">
                  {project.cohort}
                </Badge>
                <Badge variant="outline">
                  {project.category}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-capaciti-navy mb-2">
                {project.name}
              </h1>
              <p className="text-xl text-capaciti-red mb-4">
                Created by: {project.groupName}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="lg:ml-8 mt-6 lg:mt-0">
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                {project.demoUrl && project.demoUrl !== "#" ? (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-capaciti-purple hover:bg-capaciti-purple/90 w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Demo
                    </Button>
                  </a>
                ) : (
                  <Button disabled className="bg-gray-400 w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo Not Available
                  </Button>
                )}
                <Button variant="outline" className="border-capaciti-navy text-capaciti-navy hover:bg-capaciti-navy hover:text-white">
                  <Code className="h-4 w-4 mr-2" />
                  Source Code
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-capaciti-purple mr-3" />
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">{project.startDate}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-capaciti-purple mr-3" />
              <div>
                <p className="text-sm text-gray-500">Team Size</p>
                <p className="font-medium">{project.candidates.length} members</p>
              </div>
            </div>
            <div className="flex items-center">
              <Code className="h-5 w-5 text-capaciti-purple mr-3" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{project.duration}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-capaciti-navy">Project Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.detailedDescription}
                </p>
                
                <h4 className="font-semibold text-capaciti-navy mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-capaciti-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-capaciti-navy">Technologies Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-capaciti-navy flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {project.candidates.map((candidate, index) => (
                  <div key={candidate.id}>
                    <div className="flex items-start space-x-4">
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <Link 
                            to={`/candidate/${candidate.id}`}
                            className="font-medium text-capaciti-navy hover:text-capaciti-purple transition-colors"
                          >
                            {candidate.name}
                          </Link>
                          <Link to={`/candidate/${candidate.id}`}>
                            <Button variant="ghost" size="sm">
                              <User className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                        <p className="text-sm text-capaciti-red mb-2">{candidate.role}</p>
                        <p className="text-xs text-gray-600 mb-3">{candidate.bio}</p>
                        <Button 
                          size="sm" 
                          className="w-full bg-capaciti-red hover:bg-capaciti-red/90 text-white"
                          onClick={() => handleInterviewRequest(candidate.name, candidate.id)}
                        >
                          Request Interview
                        </Button>
                      </div>
                    </div>
                    {index < project.candidates.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {selectedCandidate && (
        <InterviewRequestForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          candidateName={selectedCandidate.name}
          candidateId={selectedCandidate.id}
        />
      )}
    </div>
  );
};

export default ProjectDetail;
