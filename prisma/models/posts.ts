import { Post, Prisma } from "@prisma/client";
import { prisma } from "../client";

const postInclude = Prisma.validator<Prisma.PostInclude>()({
  author: true,
});

export type PostWithAuthor = Prisma.PostGetPayload<{
  include: typeof postInclude;
}>;

export async function createPost(data: Post) {
  return await prisma.post.create({
    data: data,
  });
}

export async function getFeaturedPosts(limit: number = 5) {
  return await prisma.post.findMany({
    where: {
      isFeatured: true,
    },
    take: limit,
    include: {
      author: true,
    },
  });
}
