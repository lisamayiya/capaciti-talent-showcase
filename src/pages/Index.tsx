
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchProject, setSearchProject] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("");

  const handleSearch = () => {
    // Navigate to projects page with filters
    const params = new URLSearchParams();
    if (searchProject) params.set('project', searchProject);
    if (selectedCohort) params.set('cohort', selectedCohort);
    
    window.location.href = `/projects?${params.toString()}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with geometric shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Geometric shapes */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-red-400 to-pink-400 rounded-3xl rotate-45 opacity-80"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl rotate-12 opacity-70"></div>
        <div className="absolute bottom-32 left-20 w-28 h-28 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-20 right-64 w-20 h-20 bg-gradient-to-br from-pink-400 to-red-400 transform rotate-45 opacity-70"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/3a6c0701-3e05-4bae-a4a2-cfea7f370969.png" 
              alt="CAPACITI Logo" 
              className="h-8 w-auto"
            />
          </div>
          <nav className="flex items-center space-x-6">
            <Link to="/select-role" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Login
            </Link>
            <Link to="/select-role" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-center">
          <div className="max-w-2xl w-full">
            <div className="space-y-8 text-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Discover Talent.<br />
                Empower Innovation.
              </h1>
              <p className="text-lg text-gray-600 max-w-lg mx-auto">
                CAPACITI online expo to discover upcoming technical talent
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Search a project"
                      value={searchProject}
                      onChange={(e) => setSearchProject(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="relative">
                    <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Cohort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cloud-academy">Cloud Academy</SelectItem>
                        <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSearch}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                  size="lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
