import { db } from "../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === "POST") {
    const { title, name, content } = req.body;

    try {
      const review: {
        id: string;
        title: string;
        name: string;
        content: string;
        createdAt: Date;
    } = await db.review.create({
        data: {
          title,
          name,
          content,
        },
      });

      res.status(201).json({ message: "Review created successfully", review });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to create review" });
    }
  } else if (req.method === "GET") {
    try {
      const reviews: {
        id: string;
        title: string;
        name: string;
        content: string;
        createdAt: Date;
    }[] = await db.review.findMany();
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to fetch reviews" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

