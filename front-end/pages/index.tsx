import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import UsersTable from "@/components/UsersTable"
import { User } from "@/types";
import { useRouter } from "next/router";
import { useTranslation, UseTranslation } from "next-i18next";
import { serverSideTranslations} from "next-i18next/serverSideTranslations";



const Home: React.FC = () => {

  const {t} = useTranslation();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);


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
        <h1>{loggedInUser ? t('welcome', { role: loggedInUser.role, username: loggedInUser.username }) : t('welcome_guest')}</h1>	
        <UsersTable/>
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

export default Home;


