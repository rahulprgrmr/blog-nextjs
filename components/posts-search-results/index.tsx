import { PostWithAuthor } from "@/prisma/models/posts";
import PostsList from "../posts-list";

function PostsSearchResults({ posts }: { posts: PostWithAuthor[] }) {
  return (
    <div className="search-results bg-white">
      <div className="container mx-auto pb-5">
        <p className="text-3xl font-bold md:mx-10 m-2 p-3 pt-6 md:pt-10">
          Recent Posts
        </p>
        <PostsList posts={posts} />
      </div>
    </div>
  );
}

export default PostsSearchResults;
