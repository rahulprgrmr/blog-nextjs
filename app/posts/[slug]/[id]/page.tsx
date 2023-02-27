import { getPostById } from "@/prisma/models/posts";
import { CalendarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import classes from "./post-detail.module.css";

async function PostDetailPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const { id } = params;
  const postData = await getPostById(id);
  if (!postData) {
    redirect("/posts");
  }

  const { title, summary, image, author, createdAt, content } = postData;
  return (
    <div className="post-detail-page text-white md:container mx-auto mb-10">
      <div className="post-detail-container m-4">
        <div className="breadcrumb my-6 md:text-lg">
          <span>
            <Link href="/posts">Posts</Link>
          </span>
          <span className="mx-2">/</span>
          <span>{title}</span>
        </div>
        <h1 className="font-bold text-2xl md:text-4xl mt-4 text-justify">
          {title}
        </h1>
        <p className="italic text-justify my-2 md:my-4 md:text-lg">{summary}</p>
        <div className="post-image-container relative overflow-hidden w-full h-48 md:h-128 rounded mt-4 md:mt-6">
          <Image
            src={image ?? ""}
            fill={true}
            alt={title}
            className="object-cover"
          />
        </div>
        <div className="post-meta-container flex my-2 md:my-4 md:mb-6 justify-between md:justify-start md:text-lg">
          <span className="flex items-center mr-5">
            <UserCircleIcon className="h-5 w-5 mr-1" />
            <span>{author.name}</span>
          </span>
          <span className="flex items-center">
            <CalendarIcon className="h-4 md:h-5 w-4 md:w-5 mr-1" />
            <span>{createdAt.toLocaleString()}</span>
          </span>
        </div>
        <div
          className={`${classes.postContent} md:text-xl`}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </div>
  );
}

export default PostDetailPage;
