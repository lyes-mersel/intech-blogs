import { client } from "@/sanity/lib/client";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home({
   searchParams,
}: {
   searchParams: Promise<{ query?: string }>;
}) {
   const query = (await searchParams).query;

   const posts = await client.fetch(STARTUP_QUERY);

   console.log(posts);

   /* const posts = [
      {
         _id: 1,
         title: "Post 1",
         category: "Category 1",
         _createdAt: new Date(),
         description: "This a description 1",
         views: 10,
         author: {
            _id: 1,
            name: "Author 1",
         },
         image: "https://images.unsplash.com/photo-1719937206642-ca0cd57198cc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
         _id: 2,
         title: "Post 2",
         category: "Category 2",
         _createdAt: new Date(),
         description: "This a description 2",
         views: 10,
         author: {
            _id: 2,
            name: "Author 2",
         },
         image: "https://images.unsplash.com/photo-1724497508900-a4de4b9857b1?q=80&w=2042&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
   ]; */

   return (
      <main className={"font-work-sans"}>
         <section className="pink_container">
            <h1 className={"heading"}>
               Pitch Your Startup, <br /> Connect with Entrepreneurs
            </h1>
            <p className="sub-heading !max-w-3xl">
               Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
            </p>
            <SearchForm query={query} />
         </section>
         <section className="section_container">
            <p className="text-30-semibold">
               {query ? `Search results for "${query}"` : "All Startups"}
            </p>
            <ul className="mt-7 card_grid">
               {posts.length > 0 ? (
                  posts.map((post: StartupCardType) => <StartupCard key={post._id} post={post} />)
               ) : (
                  <p>No startups found</p>
               )}
            </ul>
         </section>
      </main>
   );
}
