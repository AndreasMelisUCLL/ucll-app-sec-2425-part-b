import Head from "next/head";

import { User } from "@/types";
import styles from "@/styles/Profile.module.css";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import ProfileOverview from "@/components/profile/ProfileOverview";


const Profile: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const userJSON = sessionStorage.getItem("loggedInUser");
        userJSON && setLoggedInUser(JSON.parse(userJSON));
    }, []);
    

    return (
        <div className="min-h-full">
            <Head>
                <title>Boardflex | Profile</title>
            </Head>

            <Header activeTab="profile"/>
            
            <main className={styles.main}>
                <h1>Profile</h1>
                {loggedInUser
                    ? <ProfileOverview />
                    : <h2>Please login to view this page</h2>
                }
            </main>
        </div>
  );
}

export default Profile;