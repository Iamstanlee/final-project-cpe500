import Link from "next/link";
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto w-full">
      <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
      <LoginForm />
      <div>
        <p className="text-xs text-center mt-4">
          Don't have an account?{" "}
          <Link className="text-primary" href="/signup">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
