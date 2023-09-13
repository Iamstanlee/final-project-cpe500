import Link from 'next/link';
import LoginForm from './form';
import { AppPage } from '@/pages/_app.page';

const LoginPage: AppPage = () => {
  return (
    <div className="p-5 min-h-screen flex items-center justify-center w-full">
      <div className="max-w-md mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <LoginForm />
        <div>
          <p className="text-xs text-center mt-4">
            Don't have an account?
            <Link className="pl-0.5 text-primary" href="/signup">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

LoginPage.removeDefaultScaffold = true;

export default LoginPage;
