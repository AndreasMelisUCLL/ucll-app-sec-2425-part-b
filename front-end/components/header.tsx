import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Language from "./Language";

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
    <header className="w-full min-h-[60px] bg-[#f8f9fa] px-5">
      <nav className="flex justify-between items-center">
        {/* Left */}
        <Link href="/" className="my-2.5 flex items-center gap-2.5">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <span className="text-3xl font-bold text-[#333]">BoardFlex</span>
        </Link>

        {/* Center */}
        <div className="self-end flex gap-4">
          <Link
            href="/"
            className={`min-w-[150px] px-4 py-2.5 rounded-t-lg text-center text-xl ${
              activeTab === "home" 
                ? "bg-[rgb(214,219,220)] text-[#333]" 
                : "bg-[#bbb] text-[#eee]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/profile"
            className={`min-w-[150px] px-4 py-2.5 rounded-t-lg text-center text-xl ${
              activeTab === "profile" 
                ? "bg-[rgb(214,219,220)] text-[#333]" 
                : "bg-[#bbb] text-[#eee]"
            }`}
          >
            Profile
          </Link>
          {/* <Link
            href="#"
            className={`min-w-[150px] px-4 py-2.5 rounded-t-lg text-center text-xl ${
              activeTab === "community" 
                ? "bg-[rgb(214,219,220)] text-[#333]" 
                : "bg-[#bbb] text-[#eee]"
            }`}
          >
            Community
          </Link> */}
        </div>

        <div className="flex items-center gap-4">
          {/* Right */}
          <button
            className="px-4 py-2 bg-[#c99b46] text-white border-none rounded cursor-pointer"
            onClick={isLoggedIn ? handleLogout : handleLogin}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>

          <Language/>
        </div>
      </nav>
    </header>
  );
};

export default Header;
