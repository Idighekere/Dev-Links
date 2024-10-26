/* eslint-disable react/no-unescaped-entities */
"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {NavBar, Footer} from "@/components/"

const NotFound: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/"); // Navigate to home page
  };

  return (
    <main className="">
        <NavBar/>

        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-5xl font-bold text-gray-900">404</h1>
            <p className="text-lg text-gray-600 mt-4">
            Oops! The page you're looking for doesn't exist.
            </p>
            <Button onClick={handleGoHome} className="mt-6">
                Go back to Home
            </Button>
        </div>

        <Footer/>
    </main>
  );
};

export default NotFound;
