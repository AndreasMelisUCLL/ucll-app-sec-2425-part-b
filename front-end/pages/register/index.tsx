import Head from "next/head";
import RegisterForm from "@/components/RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Register - BoardFlex</title>
      </Head>
      <RegisterForm />
    </div>
  );
};

export default Register;
