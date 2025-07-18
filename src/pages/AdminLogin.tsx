import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to admin dashboard
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <img 
          src="/lovable-uploads/3a6c0701-3e05-4bae-a4a2-cfea7f370969.png" 
          alt="Capaciti Logo" 
          className="h-8 w-auto"
        />
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Log In</h1>
          <p className="text-gray-600">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium"
          >
            Continue
          </Button>
        </form>

        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 text-sm">
            Forgot password?
          </Link>
        </div>

        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <Link to="/signup" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;