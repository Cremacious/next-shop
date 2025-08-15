'use client';
import ProductCard from '@/components/products/product-card';
import { useState } from 'react';

// Mock data
const products = [
  {
    id: 1,
    title: 'Classic T-Shirt',
    price: 19.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
  },
  {
    id: 2,
    title: 'Wireless Headphones',
    price: 89.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
  },
  {
    id: 3,
    title: 'Running Shoes',
    price: 59.99,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  },
  {
    id: 4,
    title: 'Smart Watch',
    price: 129.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
  },
  {
    id: 5,
    title: 'Leather Wallet',
    price: 29.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  },
  {
    id: 6,
    title: 'Sunglasses',
    price: 24.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  },
  // ...add more products as needed
];

const categories = [
  'All',
  'Clothing',
  'Electronics',
  'Footwear',
  'Accessories',
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Shop Products</h1>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="border rounded px-3 py-2 w-full md:w-48"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full md:w-64"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Min Price</label>
            <input
              type="number"
              className="border rounded px-3 py-2 w-24"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Price</label>
            <input
              type="number"
              className="border rounded px-3 py-2 w-24"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            No products found.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
      </div>
    </div>
  );
}
