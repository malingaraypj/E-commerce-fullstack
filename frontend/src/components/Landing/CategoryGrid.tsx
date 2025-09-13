import React from "react";
import ItemCard from "./ItemCard";

interface Item {
  image: string;
  title: string;
  description: string;
  price: string;
}

type Category = {
  name: string;
  data: Item[];
};

type CategoryCardsProps = {
  category: Category;
};

const dummyData: Item[] = [
  {
    image: "https://via.placeholder.com/150",
    title: "Sample Item",
    description: "This is a sample item description.",
    price: "$19.99",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Sample Item",
    description: "This is a sample item description.",
    price: "$20",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Sample Item",
    description: "This is a sample item description.",
    price: "$19.99",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Sample Item",
    description: "This is a sample item description.",
    price: "$20",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Sample Item",
    description: "This is a sample item description.",
    price: "$19.99",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Sample Item",
    description: "This is a sample item description.",
    price: "$20",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Sample Item",
    description: "This is a sample item description.",
    price: "$19.99",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Sample Item",
    description: "This is a sample item description.",
    price: "$20",
  },
];

const CategoryCards: React.FC<CategoryCardsProps> = ({ category }) => {
  const items =
    category.data.length > 0
      ? category.data.filter((_, idx) => idx < 4)
      : dummyData;

  return (
    <div className="flex flex-col gap-6 bg-blue-400 items-center p-6 rounded-lg">
      {/* Title */}
      <div className="flex items-center justify-start w-full">
        <h2 className="text-3xl font-bold text-gray-800">{category.name}</h2>
      </div>

      {/* Cards */}
      <div className="w-full grid grid-cols-4 gap-6 px-5">
        {items.map((item, index) => (
          <ItemCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
