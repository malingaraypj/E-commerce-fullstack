import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dummyImg from "@/assets/image.png";

interface Item {
  image: string;
  title: string;
  description: string;
  price: string;
}

type ItemCardProps = {
  data?: Item;
};

const dummyData: Item = {
  image: "https://via.placeholder.com/300x200?text=Sample+Image",
  title: "Sample Item",
  description: "This is a sample item description to show card layout.",
  price: "$19.99",
};

const ItemCard: React.FC<ItemCardProps> = ({ data }) => {
  const item = data || dummyData;
  const [hovered, setHovered] = React.useState(false);

  return (
    <Card
      className="relative rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative bg-white p-3 m-5 rounded-lg shadow">
        <img
          src={dummyImg}
          alt={item.title}
          className="w-full h-48 object-contain rounded-lg bg-white"
        />
      </div>

      {/* Content */}
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {item.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {item.description}
        </CardDescription>
        <CardContent className="px-4 py-2">
          <p className="text-xl font-bold text-blue-600">{item.price}</p>
        </CardContent>
      </CardHeader>

      {/* Animated Add to Cart Button */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={hovered ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute bottom-0 left-0 right-0 px-4 pb-4"
        style={{ pointerEvents: hovered ? "auto" : "none" }}
      >
        <button className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 hover:scale-105 transition cursor-pointer">
          Add to Cart
        </button>
      </motion.div>
    </Card>
  );
};

export default ItemCard;
