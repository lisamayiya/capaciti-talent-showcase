
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Briefcase, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-capaciti-purple via-capaciti-navy to-capaciti-red">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-capaciti-white rounded-full flex items-center justify-center">
              <span className="text-capaciti-purple font-bold text-lg">C</span>
            </div>
            <span className="text-capaciti-white font-bold text-xl">Capaciti</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/projects" className="text-capaciti-white hover:text-gray-200 transition-colors">
              Projects
            </Link>
            <Link to="/admin" className="text-capaciti-white hover:text-gray-200 transition-colors">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-capaciti-white mb-6">
            Cohort Connect
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Discover exceptional talent through collaborative projects. Connect with our 
            talented candidates and see their innovative work in action.
          </p>
          <Link to="/projects">
            <Button 
              size="lg" 
              className="bg-capaciti-white text-capaciti-purple hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Browse Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="p-8 bg-capaciti-white/10 backdrop-blur-sm border-capaciti-white/20 hover:bg-capaciti-white/20 transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-capaciti-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-capaciti-white" />
              </div>
              <h3 className="text-xl font-semibold text-capaciti-white mb-3">
                Group Collaboration
              </h3>
              <p className="text-gray-200">
                Explore projects created by talented teams working together to solve real-world challenges.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-capaciti-white/10 backdrop-blur-sm border-capaciti-white/20 hover:bg-capaciti-white/20 transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-capaciti-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-capaciti-white" />
              </div>
              <h3 className="text-xl font-semibold text-capaciti-white mb-3">
                Professional Projects
              </h3>
              <p className="text-gray-200">
                View high-quality work that demonstrates technical skills and creative problem-solving abilities.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-capaciti-white/10 backdrop-blur-sm border-capaciti-white/20 hover:bg-capaciti-white/20 transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-capaciti-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-capaciti-white" />
              </div>
              <h3 className="text-xl font-semibold text-capaciti-white mb-3">
                Talent Development
              </h3>
              <p className="text-gray-200">
                Connect with candidates who have proven their abilities through intensive training and mentorship.
              </p>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center">
        <p className="text-gray-300">
          © 2024 Capaciti. Empowering talent through collaborative learning.
        </p>
      </footer>
    </div>
  );
};

export default Index;
