import { getProductBySlug } from '@/lib/actions/product.actions';
import ProductDetails from './product-details';
import ProductReviews from './product-reviews';
import ReviewForm from './review-form';
import { getAuthenticatedUser } from '@/lib/server-utils';
import {
  hasUserPurchasedProduct,
  getProductReviews,
  getProductReviewStats,
} from '@/lib/actions/review.actions';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  const { user } = await getAuthenticatedUser();
  const userHasPurchased = user
    ? await hasUserPurchasedProduct(user.id, product?.id || '')
    : false;

  const reviews = user ? await getProductReviews(product.id) : [];
  const { rating, numReviews } = await getProductReviewStats(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen  bg-gray-50">
      <ProductDetails product={product} />
      <ProductReviews />
      {user && userHasPurchased && <ReviewForm productId={product.id} />}
      {reviews.length === 0 && (
        <p className="text-center my-10">No reviews yet.</p>
      )}
      {reviews.length > 0 && (
        <div className="max-w-3xl mx-auto w-full py-10">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 py-6">
              {}
              <h3 className="text-lg font-semibold">{review.title}</h3>
              <p className="text-sm text-gray-500">{review.description}</p>
            </div>
          ))}
        </div>
      )}
      <h3>Average Rating: {rating.toFixed(1)} / 5</h3>
      <p>
        {numReviews} review{numReviews !== 1 ? 's' : ''}
      </p>
    </div>
  );
}
