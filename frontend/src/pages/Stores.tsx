import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Clock, Wine, Loader2 } from "lucide-react";
import { api, type Store } from "@/lib/api";

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await api.getStores();
        setStores(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stores');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  const getStoreDetails = (store: Store) => {
    // Mock additional details for now - in a real app, this would come from the API
    interface StoreDetails {
      logo: string;
      rating: number;
      reviews: number;
      distance: string;
      minOrder: number;
      category: string[];
      status: string;
      tagline: string;
    }
    const storeDetails: Record<string, StoreDetails> = {
      store1: {
        logo: "🍷",
        rating: 4.8,
        reviews: 234,
        distance: "0.8 mi",
        minOrder: 25,
        category: ["Wine", "Spirits", "Beer"],
        status: "open",
        tagline: "Curated selection of premium wines and spirits",
      },
      store2: {
        logo: "🍺",
        rating: 4.9,
        reviews: 456,
        distance: "1.2 mi",
        minOrder: 20,
        category: ["Beer", "Cider"],
        status: "open",
        tagline: "Local craft beers and rare imports",
      },
    };
    return storeDetails[store.id] || {
      logo: "🏪",
      rating: 4.5,
      reviews: 100,
      distance: "1.0 mi",
      minOrder: 25,
      category: ["Wine", "Spirits"],
      status: "open",
      tagline: "Quality alcohol selection",
    };
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Browse <span className="bg-gradient-primary bg-clip-text text-transparent">Stores</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover local liquor stores near you
          </p>
        </div>

        {/* Search & Filters */}
        <Card className="p-6 bg-gradient-card border-border/50 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search stores by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Near Me
              </Button>
              <Button variant="outline">
                Filters
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["All", "Wine", "Spirits", "Beer", "Open Now"].map((filter) => (
              <Badge
                key={filter}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-colors"
              >
                {filter}
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
            <Wine className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">Failed to load stores</h3>
            <p className="text-muted-foreground mb-6">
              Please try again later
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </Card>
        )}

        {/* Store Grid */}
        {!isLoading && !error && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredStores.map((store) => {
                const details = getStoreDetails(store);
                return (
                  <Link key={store.id} to={`/stores/${store.id}`}>
                    <Card className="p-6 bg-gradient-card border-border/50 hover:border-primary/50 hover:shadow-glow-amber transition-all duration-300 cursor-pointer group">
                      <div className="flex items-start gap-4">
                        {/* Store Logo */}
                        <div className="w-16 h-16 bg-card rounded-lg flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                          {details.logo}
                        </div>

                        {/* Store Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                {store.name}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {details.tagline}
                              </p>
                            </div>
                            <Badge
                              className={
                                details.status === "open"
                                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                                  : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                              }
                            >
                              {details.status === "open" ? "Open" : "Closed"}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium text-foreground">{details.rating}</span>
                              <span>({details.reviews})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{details.distance}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>Min ${details.minOrder}</span>
                            </div>
                          </div>

                          {/* Categories */}
                          <div className="flex flex-wrap gap-2">
                            {details.category.map((cat) => (
                              <Badge key={cat} variant="outline" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredStores.length === 0 && (
              <Card className="p-12 bg-gradient-card border-border/50 text-center">
                <Wine className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-foreground mb-2">No stores found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters
                </p>
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Clear Search
                </Button>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
