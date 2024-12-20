import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import UsersTable from "@/components/UsersTable"
import { User } from "@/types";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const userJSON = sessionStorage.getItem("loggedInUser");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setLoggedInUser({
        username: user.username,
        role: user.role,
      });
    }
  }, []);
  console.log(loggedInUser)
  return (
    <div className="min-h-full">
      <Head>
        <title>Boardflex</title>
        <meta name="description" content="Boardflex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header activeTab="home" />
      <main>
        <h1>{`Welcome ${loggedInUser? `${loggedInUser.role} ${loggedInUser.username}` : "Guest" }`}</h1>	
        <UsersTable/>
      </main>
    </div>
  );
}

export default Home;
