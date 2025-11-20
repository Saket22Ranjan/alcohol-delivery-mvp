import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, MapPin, Clock, CheckCircle2, Truck, Store } from "lucide-react";

// Mock order data
const mockOrders = [
  {
    id: "ORD-2024-001",
    storeId: "1",
    storeName: "Premium Spirits & Wine",
    items: [
      { name: "Château Margaux 2015", quantity: 1, price: 299.99, image: "🍷" },
      { name: "Macallan 18 Year", quantity: 1, price: 349.99, image: "🥃" },
    ],
    total: 699.98,
    status: "delivered",
    orderDate: "2024-01-15",
    deliveryAddress: "123 Main St, San Francisco, CA 94102",
  },
  {
    id: "ORD-2024-002",
    storeId: "2",
    storeName: "Craft Beer Haven",
    items: [
      { name: "Sierra Nevada Pale Ale", quantity: 2, price: 14.99, image: "🍺" },
    ],
    total: 34.98,
    status: "out_for_delivery",
    orderDate: "2024-01-20",
    deliveryAddress: "123 Main St, San Francisco, CA 94102",
  },
  {
    id: "ORD-2024-003",
    storeId: "1",
    storeName: "Premium Spirits & Wine",
    items: [
      { name: "Dom Pérignon Vintage", quantity: 1, price: 199.99, image: "🍾" },
    ],
    total: 214.98,
    status: "confirmed",
    orderDate: "2024-01-22",
    deliveryAddress: "123 Main St, San Francisco, CA 94102",
  },
];

const statusConfig = {
  placed: {
    label: "Order Placed",
    icon: Package,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    color: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  out_for_delivery: {
    label: "Out for Delivery",
    icon: Truck,
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    color: "bg-green-500/10 text-green-500 border-green-500/20",
  },
};

export default function Orders() {
  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Your <span className="bg-gradient-primary bg-clip-text text-transparent">Orders</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Track and manage your orders
          </p>
        </div>

        {mockOrders.length === 0 ? (
          // Empty State
          <Card className="p-12 bg-gradient-card border-border/50 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">
              Start shopping to see your orders here
            </p>
            <Link to="/stores">
              <Button variant="hero" size="lg">
                Browse Stores
              </Button>
            </Link>
          </Card>
        ) : (
          // Orders List
          <div className="space-y-6">
            {mockOrders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;

              return (
                <Card key={order.id} className="p-6 bg-gradient-card border-border/50">
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-foreground">{order.id}</h3>
                        <Badge className={status.color}>
                          <StatusIcon className="w-4 h-4 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Store className="w-4 h-4" />
                          <span>{order.storeName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} {order.items.length === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                          {item.image}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="mb-6" />

                  {/* Delivery Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Delivery Address</p>
                        <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                      </div>
                    </div>
                    {order.status === "out_for_delivery" && (
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                    )}
                  </div>

                  {/* Order Status Timeline */}
                  {order.status !== "delivered" && (
                    <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        {["placed", "confirmed", "out_for_delivery", "delivered"].map(
                          (step, index) => {
                            const isComplete =
                              ["placed", "confirmed", "out_for_delivery", "delivered"].indexOf(
                                order.status
                              ) >= index;
                            const isCurrent = order.status === step;

                            return (
                              <div key={step} className="flex-1 relative">
                                <div
                                  className={`h-2 rounded-full transition-colors ${
                                    isComplete ? "bg-primary" : "bg-muted"
                                  }`}
                                ></div>
                                {isCurrent && (
                                  <div className="absolute -top-1 left-0 w-full">
                                    <div className="w-4 h-4 bg-primary rounded-full animate-pulse mx-auto"></div>
                                  </div>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>Placed</span>
                        <span>Confirmed</span>
                        <span>Delivering</span>
                        <span>Delivered</span>
                      </div>
                    </div>
                  )}

                  {/* Live Tracking Placeholder */}
                  {order.status === "out_for_delivery" && (
                    <div className="mt-6 p-6 bg-muted/30 rounded-lg text-center">
                      <Truck className="w-12 h-12 text-primary mx-auto mb-3" />
                      <p className="text-sm font-medium text-foreground mb-1">
                        Your order is on the way!
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Live tracking map coming soon
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
