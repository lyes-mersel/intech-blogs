import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author, Blog } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";

export type BlogCardType = Omit<Blog, "author"> & { author?: Author };

const BlogCard = ({ post }: { post: BlogCardType }) => {
  const {
    _id,
    title,
    category,
    _createdAt,
    description,
    views,
    author,
    image,
  } = post;

  const fallbackImage = "https://placehold.co/100.png";

  return (
    <li className="blog-card group">
      <div className="flex-between">
        <span className="blog-card_date">{formatDate(_createdAt)}</span>
        <div className="flex gap-1.5">
          <EyeIcon className="ttext-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <span className="text-16-medium line-clamp-1">{author?.name}</span>
          </Link>
          <Link href={`/blog/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || fallbackImage}
            alt={author?.name || "author image"}
            height={48}
            width={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/blog/${_id}`}>
        <p className="blog-card_desc">{description}</p>
        <Image
          src={image || fallbackImage}
          alt="placeholder"
          height={200}
          width={300}
          className="blog-card_img"
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <span className="text-16-medium">{category}</span>
        </Link>
        <Button className="blog-card_btn" asChild>
          <Link href={`/blog/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const BlogCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4, 5].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="blog-card_skeleton" />
      </li>
    ))}
  </>
);

export default BlogCard;
