import Head from "next/head";
import LoginForm from "@/components/LoginForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Header from "@/components/header";

const Login: React.FC = () => {
  const {t} = useTranslation();
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Head>
        <title>Login - BoardFlex</title>
      </Head>
      <div className="w-full">
        <Header/>
        <LoginForm />
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const {locale} = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "nl", ["common"])),
    },
  };
};

export default Login;



