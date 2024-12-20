import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import PresetForm from "@/components/presetForm";
import { useEffect } from "react";
import router from "next/router";


const Home: React.FC = () => {
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      router.push("/login");
    }
  }, [router]);

  
  return (
    <div className="min-h-full">
      <Head>
        <title>Boardflex</title>
        <meta name="description" content="Boardflex app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        "hi"
      </main>
    </div>
  );
}

export default Home;