import { PostWithAuthor } from "@/prisma/models/posts";
import PostsListItem from "../posts-list-item";

function PostsList({ posts }: { posts: PostWithAuthor[] }) {
  return (
    <div className="posts-list m-2 md:mx-10">
      {posts.map((post) => (
        <PostsListItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsList;
