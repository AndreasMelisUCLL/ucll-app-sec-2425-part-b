import { useEffect, useState } from "react";
import styles from "../styles/LoginForm.module.css"; 
import UserService from "@/services/userService"
import router from "next/router";
import { useTranslation } from "react-i18next";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError(t("Both fields are required"));
    } else {
      setError("");
      const role = "user"
      const user = {username, password, role}
      const response = await UserService.registerUser(user)
      if (response.status === 200){ 
        setTimeout(() => {
            router.push('/login');
          }, 500);
      }
      else {
        setError(t("Something went wrong"));
      }
    }
  };

  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure that translation happens on the client side
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server side
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <form onSubmit={handleSubmit} className="bg-[#bebebe] px-8 py-16 rounded-2xl shadow-md w-full max-w-md mx-auto text-center">
        <img src="/logo.png" alt="logo" className="h-24 w-24 mb-2 mx-auto" />
        <h1>{t("register")}</h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <div className="mb-6">
          <label htmlFor="username" className="text-left text-sm text-[#070606] block mb-2">{t("username")}</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("usernamePlaceholder")}
            className="bg-[#f4f4f4] w-full py-3 px-3 border border-white rounded-md text-sm text-black"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="text-left text-sm text-[#070606] block mb-2">{t("password")}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("passwordPlaceholder")}
            className="bg-[#f4f4f4] w-full py-3 px-3 border border-white rounded-md text-sm text-black"
          />
        </div>
        <button type="submit" className="bg-[#04114d] text-white w-full py-4 border-none rounded-md cursor-pointer text-base transition-colors hover:bg-[#005bb5]">{t("register")}</button>
      </form>
      <span>{t("accountspan")}</span>
      <button className="bg-[#2c81c6] p-4 rounded-lg shadow-md w-full max-w-[200px] mx-auto text-center text-white" onClick={handleLoginClick}>{t("logIn")}</button>
    </div>
  );  
};

export default RegisterForm;
