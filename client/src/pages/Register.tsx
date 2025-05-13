import { authURL } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import i18n from "@/i18n";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Register = () => {
  axios.defaults.withCredentials = true;
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingButton(true);
    setError("");
    if (!email || !password || !name) {
      setIsLoadingButton(false);
      setError(t("register.fillAllFields"));
      return;
    }
    setTimeout(() => {
      setIsLoadingButton(false);
    }, 1500);
    try {
      const response = await axios.post(`${authURL}/register`, {
        email,
        password,
        name,
      });
      if (response.data.status === "success") {
        setIsLoadingButton(false);
        toast.success(t("register.successMessage"));
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
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
    <div className="register bg-gray-50 min-h-[calc(100vh-147px)] flex items-center justify-center">
      <form action="" className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">{t("register.createAccount")}</h1>
        <p className="text-secondary mb-6 text-center">{t("register.signUpPrompt")}</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="grid w-full max-w-lg items-center gap-1.5 mb-5">
          <label htmlFor="name">{t("register.name")}</label>
          <Input type="email" id="name" placeholder= {
            i18n.language === "ar" ? "اسمك" : "Your Name"
          }


          className="py-[20px]" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid w-full max-w-lg items-center gap-1.5 mb-5">
          <label htmlFor="email">{t("register.email")}</label>
          <Input type="email" id="email" placeholder="areeb@example.com" className="py-[20px]" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="grid w-full max-w-lg items-center gap-1.5 mb-5">
          <label htmlFor="password">{t("register.password")}</label>
          <Input type="password" id="password" placeholder="*********" className="py-[20px]" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full mb-5" onClick={handleSubmit}>
          {isLoadingButton ? <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : t("register.registerButton")}
        </Button>
        <p className="text-center">
          {t("register.haveAccount")}{" "}
          <Link to="/login" className="text-primary hover:underline">
            {t("register.signIn")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
