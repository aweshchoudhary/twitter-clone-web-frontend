import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Leftbar } from "../components";

const Layout = () => {
  return (
    <>
      <main className="flex flex-wrap md:flex-row flex-col-reverse items-start justify-start">
        <Sidebar />
        <article className="lg:w-[50vw] md:w-[90vw] h-[78vh] md:flex-1 md:h-screen overflow-y-auto">
          <Suspense fallback="loading...">
            <Outlet />
          </Suspense>
        </article>
        <Leftbar />
      </main>
    </>
  );
};

export default Layout;
