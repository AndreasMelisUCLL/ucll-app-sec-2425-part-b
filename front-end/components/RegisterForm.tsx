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
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>{t("register")}</h2>
        <img src="/logo.png" alt="logo" className={styles.logo}/>
        {error && <div className={styles.error}>{error}</div>}
        <div>
          <label htmlFor="username">{t("username")}</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("usernamePlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="password">{t("password")}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("passwordPlaceholder")}
          />
        </div>
        <button type="submit" className={styles.submitButton}>{t("register")}</button>
      </form>
      <span>{t("accountspan")}</span>
      <button className={styles.registerButton} onClick={handleLoginClick}>{t("logIn")}</button>
    </div>
  );  
};

export default RegisterForm;
