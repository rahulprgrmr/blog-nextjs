import { PostWithAuthor } from "@/prisma/models/posts";
import PostGridItem from "../post-grid-item";

function PostsGrid(props: { posts: PostWithAuthor[] }) {
  const { posts } = props;
  return (
    <div className="grid grid-cols-1 md:gap-4 md:gap-y-6 md:grid-cols-3 md:mt-10">
      {posts.map((post) => (
        <PostGridItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsGrid;
