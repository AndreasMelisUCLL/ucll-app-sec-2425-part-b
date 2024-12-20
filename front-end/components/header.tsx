import Link from "next/link";
import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";
import React from "react";
import { User } from "@/types";

type TabName = "home" | "profile" | "community";
type HeaderProps = {
  activeTab?: TabName;
};
const Header: React.FC<HeaderProps> = ({ activeTab }: HeaderProps) => {
  const router = useRouter();
  const [loggedInUser , setLoggedInUser] = React.useState<User | undefined>(undefined);

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    router.push("/");
  };

  return (
    <header 
      className={styles.header}
    >
      <nav 
        className={styles.nav}
      >
        {/* Left */}
        <Link
          href="/preset"
          className={styles.logoContainer}
        >
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
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};
  
export default Header;