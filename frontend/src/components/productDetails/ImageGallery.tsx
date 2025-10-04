import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "../ui/scroll-area";

const ImageGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    images[0]
  );

  useEffect(() => {
    if (images?.length) {
      setSelectedImage(images[0]);
    }
  }, [images]);
  return (
    <div>
      <Card className="overflow-hidden">
        <img
          src={selectedImage}
          alt="selected image"
          className="w-full h-96 object-cover"
        />
        <ScrollArea className="w-full rounded-md border whitespace-nowrap">
          <div className="flex gap-2 p-4">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                  selectedImage === img
                    ? "ring ring-blue-400"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
};

export default ImageGallery;
