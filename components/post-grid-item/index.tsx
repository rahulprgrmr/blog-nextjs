import Image from "next/image";
import { CalendarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Post } from "@prisma/client";
import { PostWithAuthor } from "@/prisma/models/posts";

function PostGridItem(props: { post: PostWithAuthor }) {
  const { post } = props;
  return (
    <div className="post-item">
      <div className="image-container rounded overflow-hidden relative w-full h-64">
        <Image
          src={post.image ?? ""}
          alt={post.title}
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="post-detail pt-5 p-2">
        <p
          className="title font-bold text-2xl text-violet-500 line-clamp-2"
          title={post.title}
        >
          {post.title}
        </p>
        <p className="summary line-clamp-3 mt-2">{post.summary}</p>
        <div className="post-footer mt-2 flex justify-between text-gray-500">
          <span className="author flex items-center">
            <UserCircleIcon className="h-5 w-5 mr-1" />
            <span>{post.author.name}</span>
          </span>
          <span className="created-at flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{post.createdAt.toLocaleDateString()}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostGridItem;
