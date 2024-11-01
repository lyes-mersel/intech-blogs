import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";

const NavBar = async () => {
   const session = await auth();

   return (
      <header className={"text-black px-5 py-2 bg-white shadow-sm font-work-sans"}>
         <nav className={"flex justify-between items-center"}>
            <Link href={"/"}>
               <Image src={"/logo.png"} alt={"Logo"} width={143} height={30}></Image>
            </Link>
            <div className={"flex items-center gap-5"}>
               {session && session?.user ? (
                  <>
                     <Link href={"/startup/create"}>
                        <span>Create</span>
                     </Link>
                     <form
                        action={async () => {
                           "use server";
                           await signOut({ redirectTo: "/" });
                        }}
                     >
                        <button type="submit">Logout</button>
                     </form>
                     <Link href={`user/${session?.id}`}>
                        <span>{session?.user?.name}</span>
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
