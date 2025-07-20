import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SelectRole = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handleClientClick = () => {
    navigate("/projects");
  };

  const handleCandidateClick = () => {
    navigate("/candidate-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="mb-16">
        <img 
          src="/lovable-uploads/3a6c0701-3e05-4bae-a4a2-cfea7f370969.png" 
          alt="Capaciti Logo" 
          className="h-12 w-auto mx-auto"
        />
      </div>

      {/* Content */}
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Select Role
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-16 max-w-md mx-auto">
          Please choose your role to continue.
        </p>

        {/* Role Buttons */}
        <div className="flex gap-6 justify-center flex-wrap">
          <Button
            onClick={handleAdminClick}
            className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-6 text-xl font-semibold rounded-xl min-w-44 h-16"
          >
            Admin
          </Button>
          
          <Button
            onClick={handleClientClick}
            variant="outline"
            className="border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-900 px-10 py-6 text-xl font-semibold rounded-xl min-w-44 h-16"
          >
            Client
          </Button>

          <Button
            onClick={handleCandidateClick}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-6 text-xl font-semibold rounded-xl min-w-44 h-16"
          >
            Candidate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;