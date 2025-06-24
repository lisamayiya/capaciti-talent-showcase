
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, MapPin, Calendar, Code, User, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CandidateProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock candidate data (in real app, this would be fetched based on ID)
  const candidate = {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    location: "Cape Town, South Africa",
    joinedDate: "January 2024",
    bio: "Passionate full-stack developer with a strong focus on creating sustainable and environmentally conscious technology solutions. I believe in the power of code to make a positive impact on our planet and communities. My journey in tech started with a fascination for problem-solving and has evolved into a mission to build applications that matter.",
    longBio: "Throughout my time at Capaciti, I have developed expertise in modern web technologies while working on meaningful projects that address real-world challenges. I thrive in collaborative environments and enjoy mentoring other developers. My approach to development emphasizes clean code, user experience, and environmental responsibility.",
    skills: [
      "JavaScript", "React", "React Native", "Node.js", "MongoDB", 
      "Firebase", "Git", "Agile Methodologies", "UI/UX Design", 
      "Environmental Tech", "Mobile Development", "API Development"
    ],
    projects: [
      {
        id: 1,
        name: "EcoTracker Mobile App",
        groupName: "Green Warriors",
        role: "Lead Full-Stack Developer",
        technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
        description: "Led the development of a mobile app helping users track their carbon footprint.",
        cohort: "Cohort 2024-1"
      },
      {
        id: 5,
        name: "Community Garden Network",
        groupName: "Eco Builders",
        role: "Frontend Developer",
        technologies: ["React", "Express.js", "PostgreSQL"],
        description: "Built a platform connecting local gardeners and promoting urban agriculture.",
        cohort: "Cohort 2024-1"
      }
    ],
    achievements: [
      "Best Collaborative Project Award - Cohort 2024-1",
      "Environmental Impact Recognition",
      "Peer Mentorship Excellence"
    ],
    interests: ["Sustainable Technology", "Mobile Development", "Environmental Conservation", "Community Building"]
  };

  const handleInterviewRequest = () => {
    toast({
      title: "Interview Request Sent",
      description: `Your interview request for ${candidate.name} has been forwarded to the Capaciti team. You will be contacted within 24 hours.`,
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-capaciti-purple/20"
                  />
                  <h1 className="text-2xl font-bold text-capaciti-navy mb-2">
                    {candidate.name}
                  </h1>
                  <div className="flex items-center justify-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {candidate.location}
                  </div>
                  <Button 
                    className="w-full bg-capaciti-red hover:bg-capaciti-red/90 text-white mb-4"
                    onClick={handleInterviewRequest}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Request Interview
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Joined {candidate.joinedDate}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <span>Capaciti Candidate</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-capaciti-navy">Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-capaciti-navy">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {candidate.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-capaciti-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-capaciti-navy">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {candidate.bio}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {candidate.longBio}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-capaciti-navy">Project Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {candidate.projects.map((project, index) => (
                    <div key={project.id}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Link 
                              to={`/project/${project.id}`}
                              className="text-lg font-semibold text-capaciti-navy hover:text-capaciti-purple transition-colors"
                            >
                              {project.name}
                            </Link>
                            <ExternalLink className="h-4 w-4 text-gray-400" />
                          </div>
                          <p className="text-capaciti-red font-medium mb-1">
                            {project.groupName} • {project.role}
                          </p>
                          <Badge variant="secondary" className="bg-capaciti-purple/10 text-capaciti-purple mb-3">
                            {project.cohort}
                          </Badge>
                          <p className="text-gray-600 mb-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      {index < candidate.projects.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-capaciti-navy">Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="bg-capaciti-navy/10 text-capaciti-navy">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-capaciti-purple/5 border-capaciti-purple/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-capaciti-navy mb-2">
                    Interested in {candidate.name}?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Request an interview through Capaciti to connect with this talented candidate.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-capaciti-red hover:bg-capaciti-red/90 text-white"
                    onClick={handleInterviewRequest}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Request Interview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateProfile;
