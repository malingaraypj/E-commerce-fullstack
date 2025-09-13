"use client";

import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils"; // shadcn utility for conditional classes
import React from "react";

const categories = [
  {
    name: "Groceries",
    subtypes: ["Fruits & Vegetables", "Dairy & Eggs", "Snacks & Beverages"],
  },
  {
    name: "Premium Fruits",
    subtypes: ["Imported Fruits", "Seasonal Fruits", "Exotic Items"],
  },
  {
    name: "Home & Kitchen",
    subtypes: ["Furniture", "Cookware", "Home Decor"],
  },
  {
    name: "Fashion",
    subtypes: ["Men's Clothing", "Women's Clothing", "Accessories"],
  },
  {
    name: "Electronics",
    subtypes: ["Mobiles & Tablets", "Laptops", "Cameras"],
  },
  {
    name: "Beauty",
    subtypes: ["Skincare", "Haircare", "Makeup"],
  },
  {
    name: "Home Improvement",
    subtypes: ["Tools", "Lighting", "Hardware"],
  },
  {
    name: "Sports, Toys & Luggage",
    subtypes: ["Cricket", "Fitness Equipment", "Outdoor Games"],
  },
];

function FilterBar() {
  const [activeCategory, setActiveCategory] = React.useState("Groceries");

  return (
    <Menubar className="w-full my-5 flex justify-center gap-2 border-none shadow-none bg-transparent">
      {categories.map((category) => (
        <MenubarMenu key={category.name}>
          <MenubarTrigger
            onClick={() => setActiveCategory(category.name)}
            className={cn(
              "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium border transition-colors",
              activeCategory === category.name
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            )}
          >
            {category.name}
            <ChevronDown className="h-4 w-4" />
          </MenubarTrigger>

          <MenubarContent className="mt-2 w-56 rounded-md">
            {category.subtypes.map((subtype) => (
              <MenubarItem key={subtype} asChild>
                <Link
                  to="/"
                  className="flex flex-col px-2 py-1.5 rounded-md hover:bg-muted focus:bg-muted transition-colors"
                >
                  <span className="text-sm font-medium">{subtype}</span>
                </Link>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
}

export default FilterBar;
