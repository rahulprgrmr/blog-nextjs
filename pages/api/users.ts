import { prisma } from "@/prisma/client";
import { validate } from "@/utils/form-validation";
import Hash from "@/utils/hash";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  errors?: Object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      const { name, email, password, password_confirmation } = req.body;
      const errors = validate(req.body, {
        name: "reequired",
        email: "required",
        password: "required|confirmed",
        password_confirmation: "required",
      });
      if (Object.keys(errors).length > 0) {
        res.status(422).json({ message: "Validation failed", errors });
        return;
      }

      try {
        const hashedPassword = await Hash.make(password);
        const result = await prisma.user.create({
          data: {
            email,
            name,
            password: hashedPassword,
          },
        });
        res.status(201).json({ message: "Registered successfully!!!" });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
