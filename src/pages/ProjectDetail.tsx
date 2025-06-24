
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Users, Calendar, Code, ExternalLink, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ProjectDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock project data (in real app, this would be fetched based on ID)
  const project = {
    id: 1,
    name: "EcoTracker Mobile App",
    groupName: "Green Warriors",
    cohort: "Cohort 2024-1",
    startDate: "March 2024",
    duration: "8 weeks",
    description: "EcoTracker is a comprehensive mobile application designed to help users monitor and reduce their carbon footprint. The app features an intuitive interface that tracks daily activities, calculates environmental impact, and provides personalized recommendations for sustainable living. Users can set goals, track progress, and connect with a community of environmentally conscious individuals.",
    detailedDescription: "The application addresses the growing need for personal environmental accountability by making carbon footprint tracking accessible and engaging. Our team implemented advanced algorithms to calculate emissions from various activities including transportation, energy consumption, and lifestyle choices. The app also features a social component where users can share achievements and participate in environmental challenges.",
    technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "Google Maps API", "Chart.js"],
    features: [
      "Real-time carbon footprint calculation",
      "Activity tracking and categorization",
      "Personalized sustainability recommendations",
      "Social features and community challenges",
      "Data visualization and progress tracking",
      "Integration with fitness and transportation apps"
    ],
    candidates: [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Full-Stack Developer",
        bio: "Passionate about environmental technology and sustainable solutions.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Mobile Developer",
        bio: "Specialized in React Native with a focus on user experience design.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 3,
        name: "Priya Patel",
        role: "Backend Developer",
        bio: "Expert in Node.js and database optimization for mobile applications.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 4,
        name: "James Wilson",
        role: "UI/UX Designer",
        bio: "Creating intuitive and accessible designs for environmental awareness.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      }
    ],
    category: "Mobile Development",
    demoUrl: "#",
    githubUrl: "#"
  };

  const handleInterviewRequest = (candidateName: string) => {
    toast({
      title: "Interview Request Sent",
      description: `Your interview request for ${candidateName} has been forwarded to the Capaciti team. You will be contacted within 24 hours.`,
    });
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-capaciti-purple rounded-full flex items-center justify-center">
                  <span className="text-capaciti-white font-bold text-lg">C</span>
                </div>
                <span className="text-capaciti-navy font-bold text-xl">Capaciti</span>
              </div>
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
                <Button className="bg-capaciti-purple hover:bg-capaciti-purple/90">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Demo
                </Button>
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
                          onClick={() => handleInterviewRequest(candidate.name)}
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
    </div>
  );
};

export default ProjectDetail;
