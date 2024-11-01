import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const StartupCard = ({ post }: { post: StartupCardType }) => {
   const {
      _id,
      title,
      category,
      _createdAt,
      description,
      views,
      author: { _id: authorId, name: authorName },
      image,
   } = post;
   return (
      <li className="startup-card group">
         <div className="flex-between">
            <span className="startup-card_date">{formatDate(_createdAt)}</span>
            <div className="flex gap-1.5">
               <EyeIcon className="ttext-6 text-primary" />
               <span className="text-16-medium">{views}</span>
            </div>
         </div>

         <div className="flex-between mt-5 gap-5">
            <div className="flex-1">
               <Link href={`/users/${authorId}`}>
                  <span className="text-16-medium line-clamp-1">{authorName}</span>
               </Link>
               <Link href={`/startup/${_id}`}>
                  <h3 className="text-26-semibold line-clamp-1">{title}</h3>
               </Link>
            </div>
            <Link href={`/user/${authorId}`}>
               <Image
                  src="https://placehold.co/100.png"
                  alt="placeholder"
                  height={48}
                  width={48}
                  className="rounded-full"
               />
            </Link>
         </div>

         <Link href={`/startup/${_id}`}>
            <p className="startup-card_desc">{description}</p>
            <Image
               src={image}
               alt="placeholder"
               height={200}
               width={300}
               className="startup-card_img"
            />
         </Link>

         <div className="flex-between gap-3 mt-5">
            <Link href={`/?query=${category.toLowerCase()}`}>
               <span className="text-16-medium">{category}</span>
            </Link>
            <Button className="startup-card_btn" asChild>
               <Link href={`/startup/${_id}`}>Details</Link>
            </Button>
         </div>
      </li>
   );
};

export default StartupCard;
