import Head from "next/head";

import { User } from "@/types";
import styles from "@/styles/Profile.module.css";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import ProfileOverview from "@/components/profile/ProfileOverview";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";


const Profile: React.FC = () => {
      const {t} = useTranslation();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const userJSON = sessionStorage.getItem("loggedInUser");
        userJSON && setLoggedInUser(JSON.parse(userJSON));
    }, []);
    

    return (
        <div>
            <Head>
                <title>Boardflex | Profile</title>
            </Head>

            <Header activeTab="profile"/>
            
            <main>
                <h1>Profile</h1>
                {loggedInUser && !(loggedInUser.role === "guest")
                    ? <ProfileOverview />
                    : <h2>Please login to view this page</h2>
                }
            </main>
        </div>
  );
}

export const getServerSideProps = async (context: { locale: any; }) => {
    const {locale} = context;
  
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "nl", ["common"])),
      },
    };
  };

export default Profile;