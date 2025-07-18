
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("");

  const handleSearch = () => {
    // Navigate to projects page with filters
    const params = new URLSearchParams();
    if (selectedProject) params.set('project', selectedProject);
    if (selectedCohort) params.set('cohort', selectedCohort);
    
    window.location.href = `/projects?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 py-4 border-b">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/3a6c0701-3e05-4bae-a4a2-cfea7f370969.png" 
              alt="Capaciti Logo" 
              className="h-8 w-auto"
            />
          </div>
          <nav className="flex space-x-6">
            <Link to="/select-role" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Login
            </Link>
            <Link to="/select-role" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Signup
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Discover Talent. Empower Innovation.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Connect to your one-stop centre for thousands of hiring decisions and technical jobs.
            </p>

            {/* Search Form */}
            <div className="bg-white border rounded-lg p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reserve a project
                  </label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger>
                      <SelectValue placeholder="All about programming" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="programming">All about programming</SelectItem>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="mobile-apps">Mobile Apps</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cohort
                  </label>
                  <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cohort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cloud-academy">Cloud Academy</SelectItem>
                      <SelectItem value="artificial-intelligence">Artificial Intelligence (AI)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                onClick={handleSearch}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

          {/* Right Content - Background Image */}
          <div className="relative">
            <img 
              src="/lovable-uploads/bb9a3c09-aa71-476a-add0-ab1eb6cc5f16.png" 
              alt="Hero Background" 
              className="w-full h-96 object-cover rounded-3xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
