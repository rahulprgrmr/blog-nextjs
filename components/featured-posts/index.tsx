import PostsGrid from "@/components/posts-grid";
import { getFeaturedPosts } from "@/prisma/models/posts";
import { ReactElement } from "react";

async function FeaturedPosts() {
  const featuredPosts = await getFeaturedPosts();
  return (
    <div className="bg-white p-5">
      <h2 className="text-4xl font-bold text-center m-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
        Featured Posts
      </h2>
      <PostsGrid posts={featuredPosts} />
    </div>
  );
}

export default FeaturedPosts;
