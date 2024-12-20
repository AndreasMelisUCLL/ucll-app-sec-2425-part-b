import Link from "next/link";

import styles from "../styles/Header.module.css";
import { useEffect, useState } from "react";

type HeaderProps = {
  activeTab?: string;
};
const Header: React.FC<HeaderProps> = ({ activeTab }: HeaderProps) => { 
  const [loggedInUser, setLoggedInUser] = useState<String | null>(null);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
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
        <button className={styles.profileButton}>Profile</button>
      </nav>
    </header>
  );
};
  
export default Header;