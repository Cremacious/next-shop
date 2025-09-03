'use client';
import Image from 'next/image';
import { ProductType } from '@/lib/types/product.type';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AddToCartButton from '@/components/cart/add-to-cart-button';
import { CartType } from '@/lib/types/cart.type';

export default function ProductDetails({
  product,
  cartItems,
}: {
  product: ProductType;
  cartItems: CartType[];
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen bg-white">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          <div className="h-[460px] rounded-lg  dark:bg-gray-700 mb-4">
            <Image
              className="w-full h-full object-cover rounded-4xl"
              src={product.images[0]}
              alt="Product Image"
              width={960}
              height={720}
            />
          </div>
          <div className="flex -mx-2 mb-4">
            <div className="w-1/2 px-2">
              <AddToCartButton
                product={product}
                size={selectedSize}
                color={selectedColor}
                cartItems={cartItems}
              />
            </div>
            <div className="w-1/2 px-2">
              <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
        <div className="md:flex-1 px-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
            ante justo. Integer euismod libero id mauris malesuada tincidunt.
          </p>
          <div className="flex mb-4">
            <div className="mr-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Price:
              </span>
              <span className="text-gray-600 dark:text-gray-300">$29.99</span>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Availability:
              </span>
              <span className="text-gray-600 dark:text-gray-300">In Stock</span>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-gray-700 dark:text-gray-300">
              Select Color:
            </span>
            <div className="flex items-center mt-2">
              {product.colors.map((color) => (
                <Button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={
                    selectedColor === color
                      ? 'bg-red-800'
                      : 'bg-white text-slate-800'
                  }
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-gray-700 dark:text-gray-300">
              Select Size:
            </span>
            <div className="flex items-center mt-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={
                    selectedSize === size ? 'bg-red-400' : 'bg-gray-400'
                  }
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <span className="font-bold text-gray-700 dark:text-gray-300">
              Product Description:
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
              ante justo. Integer euismod libero id mauris malesuada tincidunt.
              Vivamus commodo nulla ut lorem rhoncus aliquet. Duis dapibus augue
              vel ipsum pretium, et venenatis sem blandit. Quisque ut erat vitae
              nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum
              lacinia, non sagittis mauris blandit. Morbi fermentum libero vel
              nisl suscipit, nec tincidunt mi consectetur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
