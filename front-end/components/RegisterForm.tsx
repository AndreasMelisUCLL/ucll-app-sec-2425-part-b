import { useEffect, useState } from "react";
import styles from "../styles/LoginForm.module.css"; 
import UserService from "@/services/userService"
import router from "next/router";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUsername("jane_doe"), setPassword("jane123")
  }, []);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both fields are required");
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
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Register</h2>
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
        <button type="submit" className={styles.submitButton}>Register</button>
      </form>
      <span>Already have an account?</span>
      <button className={styles.registerButton} onClick={handleLoginClick}>Log In</button>
    </div>
  );  
};

export default RegisterForm;
