import PostsFilter from "@/components/posts-filter";
import PostsSearchResults from "@/components/posts-search-results";
import { getAllPosts } from "@/prisma/models/posts";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AppInitialProps, AppProps } from "next/app";

async function PostSearchPage(props: { searchParams: { search?: string } }) {
  const recentPosts = await getAllPosts(props.searchParams.search);
  return (
    <div className="search-page">
      <PostsFilter />
      <PostsSearchResults posts={recentPosts} />
    </div>
  );
}

export default PostSearchPage;
