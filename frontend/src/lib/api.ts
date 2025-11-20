const API_BASE_URL = 'http://localhost:4000/api';

export interface Store {
  id: string;
  name: string;
  address: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  price: number;
  unit: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  customer: {
    name: string;
  };
  total: number;
  status: string;
}

export const api = {
  async getStores(): Promise<Store[]> {
    const response = await fetch(`${API_BASE_URL}/stores`);
    if (!response.ok) {
      throw new Error('Failed to fetch stores');
    }
    return response.json();
  },

  async getProducts(storeId?: string): Promise<Product[]> {
    const url = storeId
      ? `${API_BASE_URL}/products?storeId=${storeId}`
      : `${API_BASE_URL}/products`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  async createOrder(orderData: {
    items: Array<{
      name: string;
      price: number;
      quantity: number;
    }>;
    customer: {
      name: string;
    };
  }): Promise<{ orderId: string; total: number }> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    return response.json();
  },
};
