import { useEffect, useState } from "react";
import Image from "../components/Image";

export default function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // 서버에서 이미지 데이터 가져오기
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images");
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          console.error("이미지 데이터 가져오기 실패");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {images.map((image) => (
        <Image key={image.id} image={image} />
      ))}
    </div>
  );
}
