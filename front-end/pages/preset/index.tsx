import Head from "next/head";
import Header from "@/components/header";
import PresetForm from "@/components/presetForm";
import { useEffect, useState } from "react";


const Preset: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    setIsLoggedIn(!!loggedInUser);
}, []);

if (!isLoggedIn) {
    return (
        <>
            <Header activeTab="preset" />
            <h1>Please Login to view this page</h1>
        </>
    );
}
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
        <h1>New Preset</h1>
        <PresetForm />
        </main>
    </div>
    );
}

export default Preset;