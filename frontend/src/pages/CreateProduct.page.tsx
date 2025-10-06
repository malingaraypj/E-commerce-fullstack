import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addNewProduct } from "@/api/product";
import SubmitButton from "@/components/Global/SubmitButton";
import ErrorCard from "@/components/Global/ErrorCard";
import Logo from "@/components/Global/Logo";
import type { Product } from "@/models/product";

type FormStateType = {
  error: null | string;
};

const productCategories = [
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

function CreateProductPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const handleFormAction = async (
    prevState: FormStateType,
    formData: FormData
  ): Promise<FormStateType> => {
    const data: Partial<Product> = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      stock: parseInt(formData.get("stock") as string, 10),
      owner: user?._id, // Set the owner from the logged-in user
    };

    // Basic Validation
    if (!data.name || !data.price || !data.category) {
      return { error: "Please fill out all required fields." };
    }

    try {
      await addNewProduct(data);
      navigate("/");
      return { error: null };
    } catch {
      console.error("Error creating product");
      return { error: "Failed to create product. Please try again." };
    }
  };

  const [formState, formAction] = useActionState<FormStateType, FormData>(
    handleFormAction,
    { error: null }
  );

  return (
    <div className="w-full bg-amber-50 min-h-screen p-6">
      <Card className="w-[80%] max-w-4xl mx-auto">
        <ScrollArea className="h-[90vh]">
          <CardHeader>
            <div className="flex items-center justify-center">
              <Logo />
            </div>
            <CardTitle className="text-center text-2xl font-bold">
              Create a New Product
            </CardTitle>
            <CardDescription className="text-center">
              Fill in the details below to list a new item in your store.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form action={formAction} className="space-y-6">
              {/* Product Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Product Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Wireless Headphones"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="e.g., 89.99"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Product Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your product in detail..."
                  />
                </div>
              </div>

              {/* Categorization & Stock */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Inventory & Category
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {productCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      defaultValue="1"
                      placeholder="Available quantity"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload - Basic for now */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Product Images
                </h3>
                <div>
                  <Label htmlFor="images">Upload Images</Label>
                  <Input id="images" name="images" type="file" multiple />
                  <p className="text-xs text-muted-foreground mt-1">
                    You can upload multiple images.
                  </p>
                </div>
              </div>

              {formState?.error && <ErrorCard errorMsg={formState.error} />}

              <div className="flex justify-end pt-4">
                <SubmitButton>Create Product</SubmitButton>
              </div>
            </form>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}

export default CreateProductPage;
