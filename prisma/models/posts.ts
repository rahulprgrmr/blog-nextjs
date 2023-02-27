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

export async function getAllPosts(
  searchText: string,
  limit: number = 5,
  offset: number = 0
) {
  let queryBody: Object = {
    take: limit,
    skip: offset,
    include: {
      author: true,
    },
  };
  if (searchText && searchText.length) {
    queryBody = {
      ...queryBody,
      where: {
        OR: {
          title: {
            search: searchText,
          },
          summary: {
            search: searchText,
          },
          content: {
            search: searchText,
          },
        },
      },
    };
  }
  return await prisma.post.findMany(queryBody);
}

export async function getPostById(id: string) {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
}
