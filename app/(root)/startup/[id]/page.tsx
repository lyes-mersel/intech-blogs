import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, BLOG_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import BlogCard, { BlogCardType } from "@/components/BlogCard";

const md = markdownit();

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: topViewedBlogs }] = await Promise.all([
    client.fetch(BLOG_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "top-viewed-blogs",
    }),
  ]);
  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <span className="tag">{formatDate(post?._createdAt)}</span>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <Image
          src={post?.image}
          alt="Thumbnail"
          className="w-full h-auto rounded-xl"
          width={1000}
          height={600}
          layout="responsive"
        />

        <div className="space-y-5 mt-10 max-w-5xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`user/${post.author?.id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author?.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>

          <div>
            <h3 className="text-30-bold">Explore the Topic</h3>
            {parsedContent ? (
              <article
                className="prose max-w-4xl font-work-sans break-all"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="no-result">No content provided</p>
            )}
          </div>
        </div>

        <hr className="divider" />

        {topViewedBlogs?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Top Viewed Blogs</p>
            <ul className="mt-7 card_grid-sm">
              {topViewedBlogs.map((post: BlogCardType, i: number) => (
                <BlogCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
