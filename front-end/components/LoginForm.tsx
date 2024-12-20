import { useEffect, useState } from "react";
import styles from "../styles/LoginForm.module.css"; 
import UserService from "@/services/userService"
import router from "next/router";
import { useTranslation } from "react-i18next";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUsername("jane_doe"), setPassword("jane123")
  }, []);

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError(t("Both fields are required"));
    } else {
      setError("");
      const user = { username, password };
      const response = await UserService.loginUser(user);
      if (response.status === 200) { 
        const user = await response.json();
        console.log("User from API response:", user);
        sessionStorage.setItem(
            'loggedInUser',
            JSON.stringify({
                token: user.token,
                username: user.username,
                role: user.role,
                userId: user.userId,
            })
        );
        setTimeout(() => {
          router.push("/");
        }, 500);
      } else {
        setError(t("Wrong credentials"));
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
        <h2>{t("logIn")}</h2>
        <img src="/logo.png" alt="logo" className={styles.logo} />
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
        <button type="submit" className={styles.submitButton}>{t("login")}</button>
      </form>
      <span>{t("dontHaveAccount")}</span>
      <button className={styles.registerButton} onClick={handleRegisterClick}>{t("register")}</button>
    </div>
  );  
};

export default LoginForm;
