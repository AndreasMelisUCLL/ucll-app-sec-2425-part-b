import Head from "next/head";
import LoginForm from "@/components/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Login - BoardFlex</title>
      </Head>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

