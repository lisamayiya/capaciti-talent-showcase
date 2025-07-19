
import { useState, useEffect } from "react";
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
  const [projects, setProjects] = useState<any[]>([]);

  // Load projects and candidates from localStorage
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(savedProjects);
  }, []);

  // Get unique cohorts and technologies from actual projects
  const uniqueCohorts = [...new Set(projects.map(p => p.cohort))];
  const uniqueTechnologies = [...new Set(projects.flatMap(p => 
    p.technologies ? p.technologies.split(',').map((t: string) => t.trim()) : []
  ))];

  const filteredProjects = projects.filter(project => {
    const projectTechnologies = project.technologies ? project.technologies.split(',').map((t: string) => t.trim()) : [];
    
    // Get candidates from new candidate system for search
    const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    const projectCandidates = savedCandidates.filter((c: any) => c.projectId === project.id);
    
    const matchesSearch = project.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.groupName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         projectCandidates.some((candidate: any) => candidate.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCohort = selectedCohort === "all" || project.cohort === selectedCohort;
    const matchesSkill = selectedSkill === "all" || projectTechnologies.includes(selectedSkill);
    
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
                {uniqueCohorts.map(cohort => (
                  <SelectItem key={cohort} value={cohort}>{cohort}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Technology" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Technologies</SelectItem>
                {uniqueTechnologies.map(tech => (
                  <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-500 flex items-center">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg">No projects found</p>
                <p className="text-sm">No projects have been uploaded yet or none match your criteria</p>
              </div>
            </div>
          ) : (
            filteredProjects.map((project) => {
              const projectTechnologies = project.technologies ? project.technologies.split(',').map((t: string) => t.trim()) : [];
              // Get candidates from new candidate system
              const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
              const projectCandidates = savedCandidates.filter((c: any) => c.projectId === project.id);
              const defaultImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=240&fit=crop&crop=top";
              
              return (
                <Card 
                  key={project.id} 
                  className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-capaciti-purple cursor-pointer group overflow-hidden"
                >
                  <Link to={`/project/${project.id}`}>
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={defaultImage} 
                        alt={project.projectName}
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
                        {project.category || "General"}
                      </Badge>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl text-capaciti-navy group-hover:text-capaciti-purple transition-colors">
                        {project.projectName}
                      </CardTitle>
                      <CardDescription className="text-capaciti-red font-medium">
                        Group: {project.groupName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {project.description || "No description available."}
                      </p>
                      
                      <div className="flex items-center mb-3">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          {projectCandidates.length} team member{projectCandidates.length !== 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {projectTechnologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {projectTechnologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{projectTechnologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="text-sm text-gray-500">
                        Team: {projectCandidates.slice(0, 2).map((c: any) => c.name).join(", ")}
                        {projectCandidates.length > 2 && ` +${projectCandidates.length - 2} more`}
                      </div>
                      
                      {project.projectUrl && (
                        <div className="mt-2">
                          <a 
                            href={project.projectUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Live Demo
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Link>
                </Card>
              );
            })
          )}
        </div>

      </main>
    </div>
  );
};

export default ProjectGallery;
