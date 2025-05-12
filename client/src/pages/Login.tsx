import { authURL } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingButton(true);
    setError("");
    if (!email || !password) {
      setIsLoadingButton(false);
      setError("Please fill in all fields");
      return;
    }
    setTimeout(() => {
      setIsLoadingButton(false);
    }, 1500);
    try {
      const response = await axios.post(`${authURL}/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        setIsLoadingButton(false);
        login(response.data.data);
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setIsLoadingButton(false);
        setError(error.response?.data.message);
      }
    }
  };
  return (
    <div className="login bg-gray-50 min-h-[calc(100vh-147px)] flex items-center justify-center">
      <form action="" className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome back!</h1>
        <p className="text-secondary mb-5 text-center">Sign in to your account</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="grid w-full max-w-lg items-center gap-1.5 mb-5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="areeb@example.com" className="py-[20px]" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="grid w-full max-w-lg items-center gap-1.5 mb-5">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="*********" className="py-[20px]" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full mb-5" onClick={handleSubmit}>
          {isLoadingButton ? <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : "Login"}
        </Button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
