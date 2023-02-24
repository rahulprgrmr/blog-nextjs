import styles from "./page.module.css";
import Hero from "@/components/hero";
import FeaturedPosts from "../components/featured-posts";

export default async function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      {/* @ts-expect-error Server Component */}
      <FeaturedPosts />
    </main>
  );
}
