import Link from "next/link";
import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

type TabName = "home" | "profile" | "community" | "preset";
type HeaderProps = {
  activeTab?: TabName;
};

const Header: React.FC<HeaderProps> = ({ activeTab }: HeaderProps) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    setIsLoggedIn(!!loggedInUser);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    window.location.reload()
    router.push("/")
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Left */}
        <Link href="/preset" className={styles.logoContainer}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <span className={styles.siteName}>BoardFlex</span>
        </Link>

        {/* Center */}
        <div className={styles.tabContainer}>
          <Link
            href="/"
            className={`${styles.tab} ${activeTab === "home" ? styles.activeTab : ""}`}
          >
            Home
          </Link>
          <Link
            href="/profile"
            className={`${styles.tab} ${activeTab === "profile" ? styles.activeTab : ""}`}
          >
            Profile
          </Link>
          <Link
            href="/login"
            className={`${styles.tab} ${activeTab === "community" ? styles.activeTab : ""}`}
          >
            Community
          </Link>
        </div>

        {/* Right */}
        <button
          className={styles.logoutButton}
          onClick={isLoggedIn ? handleLogout : handleLogin}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </nav>
    </header>
  );
};

export default Header;
