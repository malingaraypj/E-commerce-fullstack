import ProductSlider from "./ProductSlider";

const categories = [
  "electronics",
  "clothing",
  "home",
  "sports",
  "books",
  "grocery",
  "mobile",
  "fashion",
  "toys",
];

const CategoryCards = () => {
  return (
    <div className="flex flex-col gap-12 w-[90%] m-auto py-10">
      {categories.map((category, idx) => {
        return <ProductSlider key={category} category={category} idx={idx} />;
      })}
    </div>
  );
};

export default CategoryCards;
