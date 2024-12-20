import { useEffect, useState } from "react";
import styles from "../styles/LoginForm.module.css"; 
import UserService from "@/services/userService"
import router from "next/router";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    setUsername("jane_doe"), setPassword("jane123")
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both fields are required");
    } else {
      setError("");
      const user = {username, password}
      const response = await UserService.loginUser(user)
      if (response.status === 200){ 
        const user = await response.json();
        sessionStorage.setItem(
            'loggedInUser',
            JSON.stringify({
                token: user.token,
                username: user.username,
                role: user.role,
            })
        );
        setTimeout(() => {
            router.push("/");
          }, 500);
      }

    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}> 
      <h2>Login</h2>
      {error && <div className={styles.error}>{error}</div>}
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" className={styles.submitButton}>Login</button>
    </form>
  );
};

export default LoginForm;
