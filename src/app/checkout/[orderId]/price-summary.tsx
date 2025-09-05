'use client';

// import { CartType } from '@/lib/types/cart.type';

export default function PriceSummary() {
  return (
    <div className="bg-gray-100 p-6 rounded-md">
      <ul className="text-slate-500 font-medium space-y-4">
        <li className="flex flex-wrap gap-4 text-sm">
          Subtotal
          <span className="ml-auto font-semibold text-slate-900">
            {/* ${cart.itemsPrice} */}
          </span>
        </li>
        <li className="flex flex-wrap gap-4 text-sm">
          Shipping
          <span className="ml-auto font-semibold text-slate-900">$10.00</span>
        </li>
        <li className="flex flex-wrap gap-4 text-sm">
          Discount
          <span className="ml-auto font-semibold text-slate-900">$0.00</span>
        </li>
        <li className="flex flex-wrap gap-4 text-sm">
          Tax
          <span className="ml-auto font-semibold text-slate-900">$5.00</span>
        </li>
        <hr className="border-slate-300" />
        <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">
          Total <span className="ml-auto">$113.00</span>
        </li>
      </ul>
    </div>
  );
}
