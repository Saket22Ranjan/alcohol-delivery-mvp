import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, ShoppingBag, Shield, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api, type Product } from "@/lib/api";

// Mock cart data
const mockCartItems = [
  {
    id: "1",
    storeId: "1",
    storeName: "Premium Spirits & Wine",
    name: "Château Margaux 2015",
    price: 299.99,
    quantity: 1,
    volume: "750ml",
    image: "🍷",
  },
  {
    id: "2",
    storeId: "1",
    storeName: "Premium Spirits & Wine",
    name: "Macallan 18 Year",
    price: 349.99,
    quantity: 1,
    volume: "750ml",
    image: "🥃",
  },
  {
    id: "3",
    storeId: "2",
    storeName: "Craft Beer Haven",
    name: "Sierra Nevada Pale Ale",
    price: 14.99,
    quantity: 2,
    volume: "6-pack",
    image: "🍺",
  },
];

export default function Cart() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [isVerified, setIsVerified] = useState(false); // Mock verification status
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.storeId]) {
      acc[item.storeId] = {
        storeName: item.storeName,
        items: [],
      };
    }
    acc[item.storeId].items.push(item);
    return acc;
  }, {} as Record<string, { storeName: string; items: typeof cartItems }>);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = 5.99;
  const total = subtotal + tax + deliveryFee;

  const handleCheckout = () => {
    if (!deliveryAddress) {
      toast({
        variant: "destructive",
        title: "Address required",
        description: "Please enter a delivery address",
      });
      return;
    }
    toast({
      title: "Order placed!",
      description: "Your order has been confirmed",
    });
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Your <span className="bg-gradient-primary bg-clip-text text-transparent">Cart</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <Card className="p-12 bg-gradient-card border-border/50 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Browse stores and add items to get started
            </p>
            <Link to="/stores">
              <Button variant="hero" size="lg">
                Browse Stores
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Verification Gate */}
              {!isVerified && (
                <Card className="p-6 bg-destructive/10 border-destructive/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-foreground mb-2">
                        Verification Required
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        You must complete age and ID verification before you can checkout. This ensures compliance with alcohol delivery regulations.
                      </p>
                      <Link to="/verification">
                        <Button variant="destructive">
                          <Shield className="w-4 h-4 mr-2" />
                          Complete Verification
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              )}

              {/* Grouped by Store */}
              {Object.entries(groupedItems).map(([storeId, { storeName, items }]) => (
                <Card key={storeId} className="p-6 bg-gradient-card border-border/50">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <span>🏪</span>
                    {storeName}
                  </h3>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id}>
                        <div className="flex items-start gap-4">
                          {/* Product Image */}
                          <div className="w-16 h-16 bg-card rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                            {item.image}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground mb-1 line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.volume}
                            </p>
                            <div className="flex items-center gap-4">
                              <p className="text-lg font-bold text-primary">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ${item.price} each
                              </p>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex flex-col items-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <div className="flex items-center border border-border rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-10 text-center font-medium text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        {items.indexOf(item) < items.length - 1 && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-gradient-card border-border/50 sticky top-24">
                <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-medium text-foreground">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-primary text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>

                {isVerified ? (
                  <>
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="address">Delivery Address</Label>
                        <Input
                          id="address"
                          placeholder="123 Main St, City, State, ZIP"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Delivery Time</Label>
                        <Input id="time" type="time" />
                      </div>
                    </div>

                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full mb-4"
                      onClick={handleCheckout}
                    >
                      Place Order
                    </Button>

                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <p>
                          Orders are processed only for age-verified users in compliance with local regulations.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete verification to checkout
                    </p>
                    <Link to="/verification">
                      <Button variant="hero" className="w-full">
                        Go to Verification
                      </Button>
                    </Link>
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
