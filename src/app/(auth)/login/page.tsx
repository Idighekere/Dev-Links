/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";
import {AuthHeader,LoginForm} from "../_components";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
type Props = {};

const Login = (props: Props) => {
  return (
    <main className="flex flex-col items-center justify-center">

      <AuthHeader />

      <div className="flex items-center justify-center">
        <Card className="bg-white sm:w-[470px] max-w-md w-full rounded-[12px] md:p-3 ">
          <CardHeader>          
            <CardTitle className="text-[2rem] font-[700]">Login</CardTitle>
            <CardDescription className="text-base ">
              Add your details below to get back into the app
                <div > 
                   <h3 className="font-bold text-xl">Testing Login Details</h3>
                   <p><strong>Email:</strong> testuser1@gmail.com </p>
                   <p><strong>Password:</strong> Testone$123 </p>
                </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {" "}
            <LoginForm />
          </CardContent>
          <CardFooter>
            <span>
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-purple
                    e"
              >

                Create an account
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Login;
