"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {};

const Header = (props: Props) => {
  const pathname = usePathname();

  // const isLinkActive = pathname("/links")
  return (
    <header className="">
      <nav className="flex justify-between py-4 px-4  bg-white rounded-lg m-4 items-center">
        <div>
          <Image
            src="/logo.svg"
            alt={"dev links logo"}
            width={180}
            height={40}
            className="hidden md:flex"
          />
          <Image
            src="/logo icon.svg"
            alt={"dev links logo"}
            width={40}
            height={40}
            className="md:hidden flex"
          />
        </div>
        <div className={`flex gap-9`}>
          <Link href="/links">
            <Button
              variant="ghost"
              className={`${pathname == "/links" ? "bg-light-purple text-purple " : ""
                } flex items-center gap-2`}
            >
              <Icon icon="ph:link-bold" width="21" height="21" />
              <p className="hidden md:block">Links</p>
            </Button>
          </Link>
          <Link href="/profile">
            {" "}
            <Button
              variant="ghost"
              className={`${pathname == "/profile" ? "bg-light-purple text-purple " : ""
                } flex items-center gap-2`}
            >
              <Icon icon="codicon:account" width="21" height="21" />
              <p className="hidden md:block">Profile Details</p>
            </Button>
          </Link>
        </div>
        <div>
          <Button variant="secondary">

            <Link href="/preview" className="flex items-center">
              <span className="md:hidden inline-block" > <Icon icon="iconamoon:eye-light" width="21" height="21" /></span>
              <p className="hidden md:block">Profile Details</p>

            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
