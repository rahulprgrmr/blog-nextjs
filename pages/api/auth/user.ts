// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/client";
import { getUserByEmailAndPassword } from "@/prisma/models/users";
import Hash from "@/utils/hash";
import { exclude } from "@/utils/helpers";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  user?: any;
  message?: string;
};

const hiddenFields = ["password"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body;
      const user = await getUserByEmailAndPassword(email, password);

      if (!user) {
        res.status(422).json({ message: "Invalid credentials" });
      }

      res.status(200).json({ user });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
