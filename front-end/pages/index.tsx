import Head from "next/head";
import { useEffect } from "react";
import Header from "@/components/Header";
import { User } from "@/types";
import { useState } from "react";


const Home: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const userJSON = sessionStorage.getItem("loggedInUser");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setLoggedInUser({
        username: user.username,
        role: user.role ?? "user",
      });
    }
  }, [Header]);
  
  return (
    <div className="min-h-full">
      <Head>
        <title>Boardflex</title>
        <meta name="description" content="Boardflex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header activeTab="home"/>
      <main>
        <h1>{`Welcome ${loggedInUser? `${loggedInUser.role} ${loggedInUser.username}` : "Guest" }`}</h1>	
      </main>
    </div>
  );
}

export default Home;