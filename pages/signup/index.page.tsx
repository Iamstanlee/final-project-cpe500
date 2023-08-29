import Link from "next/link";
import SignupForm from "./form";

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto w-full">
      <h2 className="text-3xl font-bold text-center mb-8">Signup</h2>
      <SignupForm />
      <div>
        <p className="text-xs text-center mt-4">
          Already have an account?{" "}
          <Link className="text-primary" href="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
