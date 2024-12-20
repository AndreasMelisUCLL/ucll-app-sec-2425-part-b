import Head from "next/head";
import RegisterForm from "@/components/RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Register - BoardFlex</title>
      </Head>
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
