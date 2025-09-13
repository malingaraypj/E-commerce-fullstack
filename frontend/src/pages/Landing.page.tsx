import CategoryCards from "@/components/Landing/CategoryGrid";
import FilterBar from "@/components/Landing/FilterBar";

function LandingPage() {
  const groceryCategory = {
    name: "Groceries",
    data: [],
  };
  return (
    <div>
      <FilterBar />
      <div className="p-6">
        <CategoryCards category={groceryCategory} />
      </div>
    </div>
  );
}

export default LandingPage;
