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
        <div className="fixed z-50 -translate-x-1/2 -translate-y-1/2 bottom-10 right-10">
          <div className="p-3 rounded-full bg-primary-500">
            <Loader w="w-8" h="h-8" />
          </div>
        </div>
      )}
    </div>
  );
}
