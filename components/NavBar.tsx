import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BadgePlus, CircleUser, LogOut } from "lucide-react";

const NavBar = async () => {
  const session = await auth();

  return (
    <header className={"text-black px-5 py-2 shadow-sm font-work-sans"}>
      <nav className={"flex justify-between items-center"}>
        <Link href={"/"}>
          <Image
            src={"/intech-blogs-logo.png"}
            alt={"Logo"}
            width={200}
            height={33}
          ></Image>
        </Link>
        <div className={"flex items-center gap-5"}>
          {session && session?.user ? (
            <>
              <Link href={"/blog/create"}>
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || "user image"}
                  />
                  <AvatarFallback>
                    <CircleUser />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
