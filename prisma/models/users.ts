import Hash from "@/utils/hash";
import { exclude } from "@/utils/helpers";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../client";

const hiddenFields = ["password"];

export async function getUserByEmailAndPassword(
  email: string,
  password: string
) {
  let user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return null;
  }

  const isValidPassword = await Hash.compare(password, user.password);
  if (!isValidPassword) {
    return null;
  }
  user = exclude(user, hiddenFields);

  return user;
}
