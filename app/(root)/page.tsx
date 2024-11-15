import SearchForm from "../../components/SearchForm";
import BlogCard, { BlogCardType } from "@/components/BlogCard";
import { BLOGS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: BLOGS_QUERY, params });

  return (
    <>
      <section className="pink_container">
        <span className="tag">Tech News, Insights, and Innovation</span>
        <h1 className={"heading"}>
          Stay Ahead in
          <br /> The Tech World
        </h1>
        <p className="sub-heading !max-w-3xl">
          From AI breakthroughs to cybersecurity and hands-on developer guides,
          discover the trends that matter and fuel your growth in the tech
          world.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Blogs"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post: BlogCardType) => (
              <BlogCard key={post._id} post={post} />
            ))
          ) : (
            <p>No blogs found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
