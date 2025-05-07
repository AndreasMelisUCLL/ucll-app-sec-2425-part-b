import Head from "next/head";
import RegisterForm from "@/components/RegisterForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@/components/header";

const Register: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Head>
        <title>Register - BoardFlex</title>
      </Head>
      <div className="w-full">
        <Header/>
        <RegisterForm />
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

export default Register;
