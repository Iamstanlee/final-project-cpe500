import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "./layout/header";
import { Sidebar } from "./layout/sidebar";

interface Props {
  children: React.ReactElement;
}

const Scaffold: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <div className="flex-col flex">
        <Header />
        <div className="bg-background grid lg:grid-cols-6">
          <Sidebar className="lg:block h-screen" />
          <div className="col-span-3 lg:col-span-6 mt-[70px] md:ml-[250px] scaffold">
            <section className="bg-whitesmoke-200 p-5 min-h-screen w-full">
              {children}
            </section>
          </div>
        </div>
      </div>
      <ToastContainer hideProgressBar />
    </>
  );
};

export default Scaffold;
