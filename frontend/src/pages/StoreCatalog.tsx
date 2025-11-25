import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Star, MapPin, Plus, Minus, ShoppingCart, ChevronLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api, type Product } from "@/lib/api";

export default function StoreCatalog() {
  const { storeId } = useParams();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      if (!storeId) return;

      try {
        setIsLoading(true);
        setError(null);
        const data = await api.getProducts(storeId);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [storeId]);

  // Helper to get additional product details for UI
  const getProductDetails = (product: Product) => {
    const name = product.name.toLowerCase();
    if (name.includes("wine")) {
      return {
        image: "🍷",
        description: product.name,
        stock: "In Stock",
        rating: 4.8
      };
    } else if (name.includes("beer")) {
      return {
        image: "🍺",
        description: product.name,
        stock: "In Stock",
        rating: 4.6
      };
    } else if (name.includes("gin") || name.includes("vodka") || name.includes("scotch") || name.includes("ipa")) {
      return {
        image: "🥃",
        description: product.name,
        stock: "In Stock",
        rating: 4.7
      };
    }
    return {
      image: "🍸",
      description: product.name,
      stock: "In Stock",
      rating: 4.5
    };
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || getProductDetails(product).description.toLowerCase().includes(selectedCategory.toLowerCase()))
  );

  const handleQuantityChange = (productId: string, delta: number) => {
    const current = quantities[productId] || 0;
    const newQuantity = Math.max(0, current + delta);
    setQuantities({ ...quantities, [productId]: newQuantity });
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name}`,
    });
    handleQuantityChange(product.id, -quantity); // Reset quantity
  };


  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <Link to="/stores" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Stores
        </Link>

        {/* Store Header */}
        <Card className="p-6 bg-gradient-card border-border/50 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-card rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
              🍷
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-1">
                    Premium Spirits & Wine
                  </h1>
                  <p className="text-muted-foreground">
                    Curated selection of premium wines and spirits
                  </p>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  Open Now
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium text-foreground">4.8</span>
                  <span>(234 reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>0.8 mi away</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Search & Filters */}
        <Card className="p-6 bg-gradient-card border-border/50 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {["All", "Wine", "Spirits", "Beer", "Mixers"].map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-12 bg-gradient-card border-border/50 text-center">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">Failed to load products</h3>
            <p className="text-muted-foreground mb-6">
              Please try again later
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </Card>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const details = getProductDetails(product);
              return (
                <Card
                  key={product.id}
                  className="p-6 bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 group"
                >
                  {/* Product Image */}
                  <div className="mb-4 text-center">
                    <div className="w-24 h-24 mx-auto bg-card rounded-lg flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                      {details.image}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-1 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                          {details.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          ${product.price}
                        </p>
                        <p className="text-xs text-muted-foreground">{product.unit}</p>
                      </div>
                      <Badge
                        className={
                          details.stock === "In Stock"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        }
                      >
                        {details.stock}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium text-foreground">{details.rating}</span>
                    </div>
                  </div>

                  {/* Quantity & Add to Cart */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => handleQuantityChange(product.id, -1)}
                        disabled={(quantities[product.id] || 0) === 0}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {quantities[product.id] || 0}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => handleQuantityChange(product.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="hero"
                      className="flex-1"
                      onClick={() => handleAddToCart(product)}
                      disabled={(quantities[product.id] || 0) === 0}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Card className="p-12 bg-gradient-card border-border/50 text-center">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or category filter
            </p>
            <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} variant="outline">
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
