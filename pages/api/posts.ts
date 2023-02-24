// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { saveFile } from "@/utils/file";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { createPost } from "@/prisma/models/posts";
import { Post } from "@prisma/client";

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
      }
      const userId = session?.user.id;
      const form = new formidable.IncomingForm();
      form.parse(req, async function (err, fields, files) {
        if (err) {
          return res.status(500).json({ message: "Something went wrong!" });
        }
        // const { title, body } = fields;
        const title = fields.title.toString();
        const slug = title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");
        const content = fields.content.toString();
        const summary = fields.summary.toString();
        const isFeatured =
          fields.isFeatured.toString() != "false" ? true : false;
        const imageUrl = await saveFile(files.image);
        try {
          const result = await createPost({
            authorId: userId,
            title,
            slug,
            content,
            summary,
            isFeatured,
            image: imageUrl,
          } as Post);
          res.status(201).json({ message: "Post saved successfully!!!" });
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
      });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
