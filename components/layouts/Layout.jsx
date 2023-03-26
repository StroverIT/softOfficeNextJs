import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Loader from "./Loader";
export default function Layout({ children }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [router]);
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar setLoading={setLoading} />
      {children}
      <Footer />
      {isLoading && (
        <div className="fixed top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 z-50 w-screen h-screen">
          <div className="flex items-center justify-center h-screen w-screen">
            <Loader w="w-12" h="h-12" />
          </div>
          <div className={`blury-bg -z-10 lg:block w-screen h-screen`}></div>
        </div>
      )}
    </div>
  );
}
