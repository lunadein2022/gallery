import { PrismaClient } from "@prisma/client";
import cloudinary from "cloudinary";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { imageUrl, title } = req.body;

    // 데이터베이스에 이미지 정보 저장
    const image = await prisma.image.create({
      data: {
        title,
        imageUrl,
      },
    });

    return res.status(201).json(image);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
