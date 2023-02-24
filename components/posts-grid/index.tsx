import { PostWithAuthor } from "@/prisma/models/posts";
import PostGridItem from "../post-grid-item";

function PostsGrid(props: { posts: PostWithAuthor[] }) {
  const { posts } = props;
  return (
    <div className="grid gap-4 gap-y-6 grid-cols-3 mt-10">
      {posts.map((post) => (
        <PostGridItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsGrid;
