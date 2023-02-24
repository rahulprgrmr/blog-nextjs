import LoginForm from "@/components/login-form";
import SiteLogo from "@/components/logo";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="register-container flex justify-center">
      <div className="card w-1/2 bg-white rounded-lg py-10 px-6 drop-shadow-md mt-10">
        <SiteLogo className="text-center text-black mb-6" />
        <p className="text-2xl font-bold text-center">
          Sign in to your account
        </p>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
