import { PostWithAuthor } from "@/prisma/models/posts";
import { CalendarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

function PostsListItem({ post }: { post: PostWithAuthor }) {
  const { image, title, id, summary, slug, author, createdAt } = post;
  return (
    <div className="post-item flex flex-col md:flex-row p-3 md:my-5">
      <div className="image-container overflow-hidden rounded relative h-64 md:h-40 md:w-80 md:min-w-80">
        <Image
          src={image ?? ""}
          alt={title}
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="post-detail my-2 md:my-0 md:ml-4 lg:ml-10">
        <Link href={`/posts/${slug}/${id}`}>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
        </Link>
        <p className="line-clamp-3 md:line-clamp-5 block my-2">{summary}</p>
        <div className="post-footer flex mt-3">
          <span className="flex text-gray-500 items-center mr-5">
            <UserCircleIcon className="h-5 w-5 mr-1" />
            <span>{author.name}</span>
          </span>
          <span className="flex text-gray-500 items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{createdAt.toLocaleString()}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostsListItem;
