import Link from 'next/link';
import SignupForm from './form';
import { AppPage } from '@/pages/_app.page';

const SignupPage: AppPage = () => {
  return (
    <div className="p-5 min-h-screen flex items-center justify-center w-full">
      <div className="max-w-md mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-4">Signup</h2>
        <p className="text-sm mb-4 text-gray-700">Signup for an account to start collecting payment seamlessly</p>
        <SignupForm />
        <div>
          <p className="text-xs text-center mt-4">
            Already have an account?
            <Link className="pl-0.5 text-primary" href="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

SignupPage.removeDefaultScaffold = true;
export default SignupPage;
