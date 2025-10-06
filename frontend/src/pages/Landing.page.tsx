import CategoryCards from "@/components/Landing/CategoryGrid";
function LandingPage() {
  return (
    <div className="relative bg-background min-h-screen">
      <div className="e-commerce-container py-8">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Welcome to Our Store
        </h1>
        <CategoryCards />
      </div>
    </div>
  );
}

export default LandingPage;
