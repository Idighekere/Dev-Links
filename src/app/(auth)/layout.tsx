import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dev Links - Sign In / Up",
    description: "Welcome back to dev links, start by creating your links ",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className={inter.className}>

                {children}
            </div>
        </main>
    );
}
