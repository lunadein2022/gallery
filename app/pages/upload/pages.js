'use client'
import { useState } from "react";
import cloudinary from "cloudinary";

export default function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleSubmit = async () => {
    try {
      // Cloudinary에 이미지 업로드
      const result = await cloudinary.v2.uploader.upload(selectedImage.path, {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      // 이미지 URL과 제목을 서버로 전송하여 데이터베이스에 저장
      const imageUrl = result.secure_url;
      const response = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ imageUrl, title }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 서버 응답 처리
      if (response.ok) {
        // 홈 화면으로 이동
        window.location.href = "/page/home";
      } else {
        // 에러 처리
        console.error("이미지 업로드 실패");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <input type="text" value={title} onChange={handleTitleChange} />
      <button onClick={handleSubmit}>제출</button>
    </div>
  );
}
