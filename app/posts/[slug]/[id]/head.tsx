import { getPostById } from "@/prisma/models/posts";
import { redirect } from "next/navigation";

export default async function Head({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const { id } = params;
  const postData = await getPostById(id);
  if (!postData) {
    redirect("/posts");
  }
  const { title, summary } = postData;
  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={summary} />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
