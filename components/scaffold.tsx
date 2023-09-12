import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './layout/header';
import { Sidebar } from './layout/sidebar';
import { useRouter } from 'next/router';
import withLoadingAndAuthGuard from './with-loading-and-authguard';

interface Props {
  children: React.ReactElement;
}

const Scaffold: React.FC<Props> = ({ children }: Props) => {
  const route = useRouter();

  return (
    <>
      {/*  TODO fix this */}
      {['/login', '/signup', '/pay'].includes(route.pathname) ? (
        <section className="p-5 min-h-screen flex items-center justify-center w-full">{children}</section>
      ) : (
        <div className="flex-col flex">
          <Header />
          <div className="bg-background grid lg:grid-cols-6">
            <Sidebar className="lg:block h-screen" />
            <div className="col-span-3 lg:col-span-6 mt-[70px] md:ml-[250px] scaffold">
              <section className="bg-whitesmoke-200 p-5 min-h-screen w-full">{children}</section>
            </div>
          </div>
        </div>
      )}
      <ToastContainer hideProgressBar />
    </>
  );
};

export default withLoadingAndAuthGuard(Scaffold);
