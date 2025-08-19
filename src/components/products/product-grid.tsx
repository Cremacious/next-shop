'use client';

import { useState } from 'react';
import ProductCard from './product-card';
import { ProductType } from '@/lib/types/product.type';

export default function ProductGrid({ products }: { products: ProductType[] }) {
  const categories = [
    'All',
    'Clothing',
    'Electronics',
    'Footwear',
    'Accessories',
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name
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
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
