import { useEffect, useState } from "react";
import styles from "../styles/LoginForm.module.css"; 
import UserService from "@/services/userService"
import router from "next/router";

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
      setError("Both fields are required");
    } else {
      setError("");
      const user = {username, password}
      const response = await UserService.loginUser(user)
      if (response.status === 200){ 
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
      }
      else {
        setError("Wrong credentials");
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Log in</h2>
        <img src="/logo.png" alt="logo" className={styles.logo}/>
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
      <span>Don't have an account yet?</span>
      <button className={styles.registerButton} onClick={handleRegisterClick}>Register</button>
    </div>
  );  
};

export default LoginForm;
