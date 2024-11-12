import NavBar from "@/components/NavBar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
   return (
      <main className={"font-work-sans bg-white-100"}>
         <NavBar />
         {children}
      </main>
   );
}
