import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState("all");

  // Mock project data
  const projects = [
    {
      id: 1,
      name: "EcoTracker Mobile App",
      groupName: "Green Warriors",
      cohort: "Cohort 2024-1",
      description: "A mobile application that helps users track their carbon footprint and suggests eco-friendly alternatives.",
      technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
      candidates: ["Sarah Johnson", "Michael Chen", "Priya Patel", "James Wilson"],
      category: "Mobile Development",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=240&fit=crop&crop=top"
    },
    {
      id: 2,
      name: "SmartFinance Dashboard",
      groupName: "DataMinds",
      cohort: "Cohort 2024-1",
      description: "A comprehensive financial dashboard for small businesses with AI-powered insights and predictions.",
      technologies: ["React", "Python", "PostgreSQL", "TensorFlow"],
      candidates: ["Emma Thompson", "David Rodriguez", "Aisha Okafor"],
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=240&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "HealthConnect Platform",
      groupName: "MedTech Innovators",
      cohort: "Cohort 2024-2",
      description: "A telemedicine platform connecting patients with healthcare providers in underserved areas.",
      technologies: ["Vue.js", "Express.js", "MySQL", "WebRTC"],
      candidates: ["Carlos Martinez", "Lisa Zhang", "Ahmed Hassan", "Rachel Cooper"],
      category: "Healthcare Tech",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=240&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "EduQuest Learning Platform",
      groupName: "Learning Labs",
      cohort: "Cohort 2024-2",
      description: "An interactive e-learning platform with gamification elements for K-12 education.",
      technologies: ["Angular", "Java Spring", "Redis", "AWS"],
      candidates: ["Jennifer Lee", "Mark Thompson", "Nina Johansson"],
      category: "EdTech",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=240&fit=crop&crop=center"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.candidates.some(candidate => candidate.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCohort = selectedCohort === "all" || project.cohort === selectedCohort;
    const matchesSkill = selectedSkill === "all" || project.technologies.includes(selectedSkill);
    
    return matchesSearch && matchesCohort && matchesSkill;
  });

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
              <img 
                src="/lovable-uploads/3a6c0701-3e05-4bae-a4a2-cfea7f370969.png" 
                alt="Capaciti Logo" 
                className="h-8 w-auto"
              />
            </div>
            <Link to="/admin">
              <Button variant="outline" className="border-capaciti-purple text-capaciti-purple hover:bg-capaciti-purple hover:text-white">
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-capaciti-navy mb-2">Project Gallery</h1>
          <p className="text-lg text-gray-600">Discover innovative projects created by our talented cohorts</p>
        </div>

        {/* Filters */}
        <div className="bg-capaciti-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects, groups, or candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCohort} onValueChange={setSelectedCohort}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Cohort" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Cohorts</SelectItem>
                <SelectItem value="Cohort 2024-1">Cohort 2024-1</SelectItem>
                <SelectItem value="Cohort 2024-2">Cohort 2024-2</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Technology" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Technologies</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="React Native">React Native</SelectItem>
                <SelectItem value="Vue.js">Vue.js</SelectItem>
                <SelectItem value="Angular">Angular</SelectItem>
                <SelectItem value="Node.js">Node.js</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-500 flex items-center">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-capaciti-purple cursor-pointer group overflow-hidden"
            >
              <Link to={`/project/${project.id}`}>
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 left-3 bg-capaciti-purple/90 text-white backdrop-blur-sm"
                  >
                    {project.cohort}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs"
                  >
                    {project.category}
                  </Badge>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-capaciti-navy group-hover:text-capaciti-purple transition-colors">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-capaciti-red font-medium">
                    Group: {project.groupName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center mb-3">
                    <Users className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">
                      {project.candidates.length} team member{project.candidates.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="text-sm text-gray-500">
                    Team: {project.candidates.slice(0, 2).join(", ")}
                    {project.candidates.length > 2 && ` +${project.candidates.length - 2} more`}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg">No projects found matching your criteria</p>
              <p className="text-sm">Try adjusting your search terms or filters</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectGallery;
